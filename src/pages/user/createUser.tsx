import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";

import { getAlltanentsdata } from "../../http/api";
import { Tanent } from "../../types";

export default function CreateUser({
  Editmood = false,
}: {
  Editmood?: boolean;
}) {
  const selectRole = Form.useWatch("role");

  const { data: tanents = [] } = useQuery({
    queryKey: ["alltanents"],
    queryFn: async () => {
      const res = await getAlltanentsdata("");

      return Array.isArray(res.data?.data) ? res.data?.data : [];
    },
  });
  return (
    <>
      <Col span={24}>
        <Space direction="vertical">
          <Card title="basic info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstname"
                  rules={[
                    { required: true, message: "Please input your Firstname!" },
                  ]}
                >
                  <Input placeholder="firstname" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastname"
                  rules={[
                    { required: true, message: "Please input your Lastname!" },
                  ]}
                >
                  <Input placeholder="lastname" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                    { type: "email", message: "please input a valid a email" },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {!Editmood && (
            <Card title="Sequrity info" bordered={false}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}
          <Card title="Role info" dir="horizontal" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    { required: true, message: "Please input your Role!" },
                  ]}
                >
                  <Select
                    style={{ width: "80%" }}
                    allowClear={true}
                    placeholder="Status"
                  >
                    <Select.Option value="Admin">Admin </Select.Option>
                    <Select.Option value="Manager">Manager </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              {selectRole === "Manager" && (
                <Col span={12}>
                  <Form.Item
                    label="Resturant"
                    name="tanentId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Resturant!",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "80%" }}
                      allowClear={true}
                      placeholder="Status"
                    >
                      {tanents.map((tanent: Tanent) => {
                        return (
                          <Select.Option value={tanent.id}>
                            {tanent.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>
        </Space>
      </Col>
    </>
  );
}
