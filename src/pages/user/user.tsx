import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { CreateUser, getUserdata } from "../../http/api";
import { Users, CreatUserData, FormDataValue } from "../../types";
import UserFilter from "./userFilter";
import CreateUserForm from "./createUser";

import { AxiosError } from "axios";
import { PER_PAGE } from "../../constant";
import { useForm } from "antd/es/form/Form";
import Item from "antd/es/list/Item";
import { debounce } from "lodash";

export default function User() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quryParams, setQuryParams] = React.useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });
  const [formInstance] = Form.useForm();
  const [form] = useForm();

  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [open]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "FirstName",
      dataIndex: "lastname",
      key: "lastname",
      render: (_text: string, record: Users) => (
        <div>
          {record.firstname} {record.lastname}
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const queryClient = useQueryClient();

  const { mutate: userMutate } = useMutation({
    mutationFn: async (data: CreatUserData) => {
      const response = await CreateUser(data);
      return response.data;
    },
    onSuccess: () => {
      // This will refresh your data
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const CencelButton = () => {
    formInstance.resetFields();
    setOpen(false);
  };

  const HandleSubmitForm = async () => {
    try {
      await formInstance.validateFields();
      const formData = formInstance.getFieldsValue(true); // Ensure all fields are captured

      if (!formData.password) {
        console.error("Password is missing!");
        alert("Password is required.");
        return;
      }

      userMutate(formData);
      formInstance.resetFields();
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  const debounceQparams = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQuryParams((prev) => ({ ...prev, q: value }));
    },1000);
  },[]);
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

    console.log(filterChnageValue);
  };

  const {
    data: users,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["users", quryParams],

    queryFn: () => {
      const filterParams = Object.entries(quryParams).filter(
        (item) => !!item[1]
      );
      const quryString = new URLSearchParams(
        filterParams as unknown as Record<string, string>
      ).toString();

      return getUserdata(quryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        {" "}
        <Flex style={{ justifyContent: "space-between" }}>
          <Breadcrumb
            separator={<RightOutlined style={{ fontSize: "16px" }} />}
            items={[{ title: "Dashboard" }, { title: "User" }]}
          ></Breadcrumb>
          {isFetching && (
            <div>
              <Spin indicator={<LoadingOutlined />} size="large" />
            </div>
          )}

          {isError && (
            <Typography.Text type="danger">
              Something went wrong
            </Typography.Text>
          )}
        </Flex>
        <div>
          <Form form={form} onFieldsChange={onFilterChange}>
            <UserFilter>
              {" "}
              <Button
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
                type="primary"
                style={{ justifyContent: "flex-end" }}
              >
                Add user
              </Button>
            </UserFilter>
          </Form>
          <Table
            columns={columns}
            dataSource={users?.data}
            rowKey={"id"}
            pagination={{
              total: users?.total,
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
            }}
          ></Table>

          <Drawer
            closable
            destroyOnClose
            title={<p> Create User</p>}
            placement="right"
            open={open}
            loading={loading}
            onClose={() => CencelButton()}
            width={500}
            extra={
              <Space>
                <Button onClick={CencelButton}>Cencel</Button>
                <Button type="primary" onClick={HandleSubmitForm}>
                  Save
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" form={formInstance}>
              <CreateUserForm />
            </Form>
          </Drawer>
        </div>
      </Space>
    </>
  );
}
