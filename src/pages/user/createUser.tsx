import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import { getAlltanentsdata } from "../../http/api";
import { Tanent } from "../../types";

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
                <Form.Item label="First Name" name="firstname">
                  <Input placeholder="firstname" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lasatname">
                  <Input placeholder="lastname" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="Email">
                  <Input placeholder="email" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Sequrity info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Passwrod" name="passwrod">
                  <Input type="password" placeholder="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Role info" dir="horizontal" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="Role">
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
                <Form.Item label="Resturant" name="resturant">
                  <Select
                    style={{ width: "80%" }}
                    allowClear={true}
                    placeholder="Status"
                  >
                    {
                        tanents.map((tanent:Tanent) => {
                            return <Select.Option value={tanent.id}>{tanent.name}</Select.Option>
                        })
                    }
                   
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
