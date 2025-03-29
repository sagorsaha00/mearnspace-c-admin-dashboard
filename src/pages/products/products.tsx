import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Space,
  Table,
  Image,
  Drawer,
} from "antd";
import React, { useEffect } from "react";
import ProductFilter from "./productFilter";
import { useForm } from "antd/es/form/Form";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PER_PAGE } from "../../constant";
import { GetAllProducts, PostProductData } from "../../http/api";
import { FormDataValue, priceConfiguration, Product } from "../../types";
import { debounce } from "lodash";
import { useAuthStore } from "../../store";
import CreateProduct from "./createProduct";
import { formDataToJson } from "./helper";

export default function Products() {
  const [formInstance] = Form.useForm();

  const columns = [
    {
      title: "ProductName",
      dataIndex: "name",
      key: "name",
      render: (_text, record: Product) => {
        return (
          <div>
            <Space>
              {record.image ? <Image width={60} src={record.image} /> : null}
              <span>{record.name}</span>
            </Space>
          </div>
        );
      },
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isPublish",
      key: "isPublish",

      render: (_: boolean, record: Product) => {
        const status =
          record.isPublish !== undefined ? record.isPublish : false;

        return (
          <div
            style={{
              color: status ? "green" : "orange",
            }}
          >
            {status ? "publish" : "draft"}
          </div>
        );
      },
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const [open, setOpen] = React.useState<boolean>(false);
  const [EditFromData, setEditFromData] = React.useState<Product | null>();
  const { user } = useAuthStore();
  const [quryParams, setQuryParams] = React.useState({
    perPage: PER_PAGE,
    currentPage: 1,
    hi: "hello",
    tenantId: user?.role === "manager" ? user?.tanent?.id ?? null : undefined,
  });
  const [form] = useForm();

  const { data: products } = useQuery({
    queryKey: ["products", quryParams],

    queryFn: () => {
      const filterParams = Object.entries(quryParams).filter(
        (item) => !!item[1]
      );
      const quryString = new URLSearchParams(
        filterParams as unknown as Record<string, string>
      ).toString();

      return GetAllProducts(quryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });
  const debounceQparams = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQuryParams((prev) => ({ ...prev, q: value }));
    }, 1000);
  }, []);
  const CencelButton = () => {
    formInstance.resetFields();
    setOpen(false);
  };

  const onFilterChange = (filterValue: FormDataValue[]) => {
    const filterChnageValue = filterValue
      .map((item) => {
        return {
          [item.name[0]]: item.value,
        };
      })
      .reduce((acc, item) => {
        return {
          ...acc,
          ...item,
        };
      });
    if ("q" in filterChnageValue) {
      debounceQparams(filterChnageValue.q);
    } else {
      setQuryParams((prev) => {
        return {
          ...prev,
          ...filterChnageValue,
        };
      });
    }
  };
  const queryClient = useQueryClient();

  const { mutate: productMutate, isPending: isProductLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: FormData) => {
      const response = await PostProductData(data);
      return response.data;
    },
    onSuccess: () => {
      formInstance.resetFields();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const HandleSubmitForm = async () => {
    formInstance.validateFields();
    const priceConfiguration = await formInstance.getFieldValue(
      "priceConfiguration"
    );
    console.log(await formInstance.getFieldValue(
      "priceConfiguration"
    ));
    console.log(await formInstance.getFieldsValue());
    console.log("price", priceConfiguration);
    if (!priceConfiguration) {
      console.warn("priceConfiguration is undefined.");
      return; // or handle the case where priceConfiguration is undefined
    }

    const pricing = Object.entries(priceConfiguration).reduce(
      (acc: { [key: string]: unknown }, [key, value]) => {
        let parsedKey;

        try {
          if (key.startsWith("{")) {
            parsedKey = JSON.parse(key);
          } else {
            parsedKey = { configurationKey: key };
          }
        } catch (error) {
          console.error("JSON Parse Error:", error);
          return acc;
        }

        if (!parsedKey.configurationKey) {
          console.error("Missing configurationKey:", parsedKey);
          return acc;
        }

        if (value && typeof value === "object") {
          const availableOptions = Object.entries(value).map(
            ([option, price]) => ({
              option,
              price,
            })
          );

          acc[parsedKey.configurationKey] = {
            priceType:
              parsedKey.configurationKey === "Size" ? "base" : "aditional",
            availableOptions,
          };
        } else {
          console.error(
            `Missing priceType or availableOptions for ${parsedKey.configurationKey}:`,
            value
          );
        }
        return acc;
      },
      {}
    );

    console.log("pricing", pricing);

    const categoryIdValue = formInstance.getFieldValue("CategoryId").toString();

    // Check if categoryIdValue is a valid JSON string or plain text
    let CategoryId;
    try {
      CategoryId = categoryIdValue ? JSON.parse(categoryIdValue)._id : null;
      console.log(CategoryId);
    } catch (error: unknown) {
      console.error(
        "Invalid JSON format for categoryIdValue:",
        categoryIdValue
      );
      // If it's not JSON, use it directly as the ID
      CategoryId = categoryIdValue || null;
    }

    const attrebuties = Object.entries(
      formInstance.getFieldValue("attributes")
    ).map(([key, value]) => {
      return {
        name: key,
        value: value,
      };
    });

    const postData = {
      ...formInstance.getFieldsValue(),
      tenantId:
        user?.role === "manager"
          ? user?.tanent?.id
          : formInstance.getFieldValue("tenantId"),
      isPublish: formInstance.getFieldValue("isPublish") ? true : false,
      image: formInstance.getFieldValue("image"),
      CategoryId,
      attributes: attrebuties,
      priceConfiguration: {
        priceConfiguration: {
          configurationKey: pricing,
        },
      },
    };

    const fromData = formDataToJson(postData);

    await productMutate(fromData);
  };

  useEffect(() => {
    setOpen(true);
    let priceConfigurationjson = {};

    if (EditFromData) {
      priceConfigurationjson = Object.entries(
        EditFromData?.priceConfiguration
      ).reduce((acc: { [key: string]: unknown }, [key, value]) => {
        const jsonStringFromValue = JSON.stringify({
          configurationKey: key,
          priceType: value,
        });
        return {
          ...acc,
          [jsonStringFromValue]: value.availableOptions,
        };
      }, {});
    }

    const attrebuties = EditFromData?.attributes?.reduce(
      (acc, item) => ({
        ...acc,
        [item.name]: item.value,
      }),
      {}
    );

    formInstance.setFieldsValue({
      ...EditFromData,
      CategoryId: EditFromData?.category?._id,
      priceConfiguration: priceConfigurationjson,
      attrebuties,
    });
  }, [EditFromData]);
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        {" "}
        <Flex style={{ justifyContent: "space-between" }}>
          <Breadcrumb
            separator={<RightOutlined style={{ fontSize: "16px" }} />}
            items={[{ title: "Dashboard" }, { title: "User" }]}
          ></Breadcrumb>
        </Flex>
        <Form form={form} onFieldsChange={onFilterChange}>
          <ProductFilter>
            {" "}
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setOpen(true)}
              style={{ justifyContent: "flex-end" }}
            >
              Add user
            </Button>
          </ProductFilter>
        </Form>
        <Table
          columns={[
            ...columns,
            {
              title: "Actions",

              render: (_, record: Product) => (
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      setEditFromData(record);
                      console.log("record", record);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ),
            },
          ]}
          dataSource={products?.totalDocs}
          rowKey={"id"}
          pagination={{
            total: products?.total,
            pageSize: quryParams.perPage,
            current: quryParams.currentPage,
            onChange: (page) => {
              setQuryParams((prev) => {
                return {
                  ...prev,
                  currentPage: page,
                };
              });
            },
            showTotal: (total: number, range: [number, number]) => {
              return (
                <span>
                  {range[0]}-{range[1]} of {total} items
                </span>
              );
            },
          }}
        ></Table>
        <Drawer
          closable
          destroyOnClose
          title={"Add Product"}
          placement="right"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          width={500}
          extra={
            <Space>
              <Button onClick={CencelButton}>Cencel</Button>
              <Button
                type="primary"
                loading={isProductLoading}
                onClick={HandleSubmitForm}
              >
                submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={formInstance}>
            <CreateProduct />
          </Form>
        </Drawer>
      </Space>
    </>
  );
}
