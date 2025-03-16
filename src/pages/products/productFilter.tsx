import React from "react";
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
} from "antd";
type productFileterfunction = {
  children?: React.ReactNode;
};
export default function productFilter({ children }: productFileterfunction) {
  return (
    <div>
      {" "}
      <Card>
        <Row align="middle" style={{ justifyContent: "space-between" }}>
          <Col span={15} style={{ margin: "10px" }}>
            <Row>
              <Col span={5} style={{ marginRight: "20px" }}>
                <Form.Item name="q">
                  <Input.Search placeholder="username" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={5}>
                {" "}
                <Form.Item name="role">
                  <Select
                    id="selectboxid"
                    style={{ width: "80%", marginLeft: "10px" }}
                    placeholder="Role"
                    allowClear={true}
                  >
                    <Select.Option value="admin">Pizza </Select.Option>
                    <Select.Option value="manager"> Drinks </Select.Option>
                  </Select>
                </Form.Item>{" "}
              </Col>
              <Col span={5} style={{ marginRight: "20px" }}>
                <Form.Item name="q">
                  <Input.Search placeholder="Categories Id" allowClear={true} />
                </Form.Item>
              </Col>
              <Col span={5} style={{ marginRight: "20px" }}>
                <Space>
                <Switch defaultChecked onChange={() => {}} />
                <Typography.Text>show only publish</Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>

          <Col span={3}>{children}</Col>
        </Row>
      </Card>
    </div>
  );
}
