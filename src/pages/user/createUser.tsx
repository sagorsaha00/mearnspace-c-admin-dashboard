import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import { getAlltanentsdata } from "../../http/api";
import { Tanent } from "../../types";
import Password from "antd/es/input/Password";

export default function CreateUser() {
  const { data: tanents = [] } = useQuery({
    queryKey: ["alltanents"],
    queryFn: async () => {
      const res = await getAlltanentsdata();
      console.log("API Response:", res.data?.data);
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
                  name="lasatname"
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
                  name="Email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                    {type:'email', message:"please input a valid a email"}
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Sequrity info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Passwrod" name="passwrod" rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}>
                  <Input type="password" placeholder="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Role info" dir="horizontal" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="Role" rules={[
                    { required: true, message: "Please input your Role!" },
                  ]}>
                  <Select
                    style={{ width: "80%" }}
                    allowClear={true}
                    placeholder="Status"
                  >
                    <Select.Option value="Ban">Customer </Select.Option>
                    <Select.Option value="Active">Manager </Select.Option>
                    <Select.Option value="Active">Admin </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Resturant" name="resturant" rules={[
                    { required: true, message: "Please input your Resturant!" },
                  ]}>
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
            </Row>
          </Card>
        </Space>
      </Col>
    </>
  );
}
