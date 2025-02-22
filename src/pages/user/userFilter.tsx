import { Card, Col, Form, Input, Row, Select } from "antd";

type userFileterfunction = {
  children?: React.ReactNode;
  
};

export default function UserFilter({
  children,
}: userFileterfunction) {
  return (
    <Card>
      <Row align="middle" style={{ justifyContent: "space-between" }}>
        <Col span={15} style={{ margin: "10px" }}>
          <Row>
            <Col span={8} style={{ marginRight: "20px" }}>
              <Form.Item name='q'>

              <Input.Search
                placeholder="username"
                allowClear={true}
                 
              />
              </Form.Item>
            </Col>
            <Col span={7}>
              {" "}
              <Form.Item name='role'>
              <Select
                style={{ width: "80%", marginLeft: "10px" }}
                placeholder="Role"
                allowClear={true}
                
              >
                <Select.Option value="admin">Admin </Select.Option>
                <Select.Option value="manager">manager </Select.Option>
                <Select.Option value="customer">Admin </Select.Option>
              </Select>
                </Form.Item>{" "}
            </Col>
            {/* <Col span={7} style={{ marginRight: "30px" }}>
              <Select
                style={{ width: "80%" }}
                allowClear={true}
                placeholder="Status"
                onChange={(selectItem) =>
                  onFilterChnage("statusFilterValue", selectItem)
                }
              >
                <Select.Option value="Ban">Ban </Select.Option>
                <Select.Option value="Active">Active </Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col span={3}>{children}</Col>
      </Row>
    </Card>
  );
}
