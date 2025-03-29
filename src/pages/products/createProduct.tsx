import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  Upload,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { GetAllCatagories, getAlltanentsdata } from "../../http/api";
import { ResturantType, Tanent } from "../../types";
import { PlusOutlined } from "@ant-design/icons";
import Price from "./price";
import Attrebuties from "./attrebuties";
import { useEffect } from "react";

import { useAuthStore } from "../../store";

export default function CreateProduct() {
  const selectCategory = Form.useWatch("CategoryId");

  const [messageApi, contextHolder] = message.useMessage();
  const user = useAuthStore();
  const { data: catagories } = useQuery({
    queryKey: ["catagories"],
    queryFn: async () => {
      return GetAllCatagories();
    },
  });

  const [formInstance] = Form.useForm();
  const { data: tenants } = useQuery({
    queryKey: ["resturants"],
    queryFn: async () => {
      console.log("tenantdata", getAlltanentsdata(""));
      return getAlltanentsdata("");
    },
  });
  const handleSelectChange = (value: string) => {
     
    formInstance.setFieldsValue({ tenantId: value });
    formInstance.validateFields(["tenantId"]);
  };
  useEffect(() => {
   
  }, [tenants]);

  return (
    <>
      <Col span={24}>
        <Space direction="vertical">
          <Card title="basic info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Productname!",
                    },
                  ]}
                >
                  <Input placeholder="Productname" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="CategoryId"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Category!",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "80%" }}
                    allowClear={true}
                    placeholder="Category"
                  >
                    {catagories?.data?.categories?.map(
                      (item: ResturantType) => (
                        <Select.Option
                          key={item._id}
                          value={item._id}
                        >
                          {item.name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Description!",
                    },
                  ]}
                >
                  <Input placeholder="Description" maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Product Image" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Image"
                  name="image"
                  valuePropName="file"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.file;
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please upload an image",
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={(file) => {
                      const uuidFileName = `${uuidv4()}_${file.name}`;
                      const renamedFile = new File([file], uuidFileName, {
                        type: file.type,
                      });
                      formInstance.setFieldsValue({ image: renamedFile });
                      const imageValidation =
                        file.type === "image/jpeg" || file.type === "image/png";

                      if (!imageValidation) {
                        messageApi.open({
                          type: "error",
                          content: "Please upload a jpg or png image.",
                        });
                      }
                      return false;
                    }}
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    accept="image/jpeg || image/png"
                  >
                    <PlusOutlined />
                  </Upload>
                </Form.Item>
                {contextHolder}
              </Col>
            </Row>
          </Card>

          {selectCategory && <Price selectCategory={selectCategory} />}
          {selectCategory && <Attrebuties selectCategory={selectCategory} />}

          {user.role !== "manager" && (
            <Card title="Select_Tenant" dir="horizontal" bordered={false}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Restaurant"
                    name="tenantId"
                    rules={[
                      {
                        required: true,
                        message: "Please select a restaurant!",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "80%" }}
                      allowClear
                      placeholder="Select a Restaurant"
                      onChange={handleSelectChange}
                    >
                      {tenants?.data?.data?.map((item: Tanent) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}

          <Card title="Role info" dir="horizontal" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="IsPublish"
                  name="isPublish"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Ispbublish Item",
                    },
                  ]}
                >
                  <Switch
                    defaultValue={false}
                    defaultChecked
                    onChange={() => {}}
                    checkedChildren={"on"}
                    unCheckedChildren={"off"}
                  />

                  <Typography.Text>show publish</Typography.Text>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </>
  );
}
