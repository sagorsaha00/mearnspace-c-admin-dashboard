import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select } from "antd";
import React from "react";

export default function UserFilter() {
  return (
    <Card>
      <Row align="middle" style={{ justifyContent: "space-between" }}>
        <Col span={15} style={{ margin: "10px" }}>
          <Row>
            <Col span={8} style={{ marginRight: "20px" }}>
              <Input.Search placeholder="username" />{" "}
            </Col>
            <Col span={7}>
              {" "}
              <Select
                style={{ width: "80%", marginLeft: "10px" }}
                placeholder="Role"
              >
                <Select.Option value="admin">Admin </Select.Option>
                <Select.Option value="manager">manager </Select.Option>
                <Select.Option value="customer">Admin </Select.Option>
              </Select>{" "}
            </Col>
            <Col span={7} style={{ marginRight: "30px" }}>
              <Select style={{ width: "80%" }} placeholder="Status">
                <Select.Option value="Ban">Ban </Select.Option>
                <Select.Option value="Active">Active </Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={3} >
          {" "}
          <Button icon=<PlusOutlined /> type="primary" style={{ justifyContent: "flex-end" }}>Add user</Button>{" "}
        </Col>
      </Row>
    </Card>
  );
}
