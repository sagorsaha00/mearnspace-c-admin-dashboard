import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  Upload,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { GetAllCatagories, getAlltanentsdata } from "../../http/api";
import { ResturantType } from "../../types";
import { PlusOutlined } from "@ant-design/icons";
import Price from "./price";
import Attrebuties from "./attrebuties";

export default function CreateProduct() {
  const selectCategory = Form.useWatch("CategoryId");

  const { data: catagories } = useQuery({
    queryKey: ["catagories"],
    queryFn: async () => {
      return GetAllCatagories();
    },
  });
  const { data: tenants } = useQuery({
    queryKey: ["resturants"],
    queryFn: async () => {
      return getAlltanentsdata("");
    },
  });
  const handleBeforeUpload = (file) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`;

    const newFile = new File([file], uniqueFileName, { type: file.type });

    return newFile;
  };
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
                          value={JSON.stringify(item)}
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
                  rules={[
                    {
                      required: true,
                      message: "Please input your image",
                    },
                  ]}
                >
                  <div>
                    <Upload
                      beforeUpload={(file) => {
                        const newFile = handleBeforeUpload(file);
                        console.log("New File Name: ", newFile.name); // Debugging
                        return false; // Prevent automatic upload
                      }}
                      name="image"
                      listType="picture-card"
                    >
                      <PlusOutlined />
                    </Upload>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {selectCategory && <Price selectCategory={selectCategory} />}
          {selectCategory && <Attrebuties selectCategory={selectCategory} />}

          <Card title="Select Tenant" dir="horizontal" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Resturant"
                  name="tenantId"
                  rules={[
                    { required: true, message: "Please input your Resturant!" },
                  ]}
                >
                  <Select
                    style={{ width: "80%" }}
                    allowClear={true}
                    placeholder="Status"
                  >
                    {tenants?.data?.data?.map((item: ResturantType) => (
                      <Select.Option key={item._id} value={item._id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
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
