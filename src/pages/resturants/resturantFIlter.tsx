import React from "react";
import { Card, Col, Input, Row, Form } from "antd";
 


type resturantfiler = {
  children?: React.ReactNode;
   
   
};

export default function ResturantFIlter({ children }: resturantfiler) {
  return (
    <>
      <Card>
        <Row align="middle" style={{ justifyContent: "space-between" }}>
          <Col span={15} style={{ margin: "10px" }}>
            <Row>
              <Col span={10} style={{ marginRight: "20px" }}>
                <Form.Item name="r">
                  <Input.Search placeholder="username" allowClear />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={3}>{children}</Col>
        </Row>
      </Card>
    </>
  );
}
