import React from "react";
import { Card, Col, Input, Row } from "antd";

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
                <Input.Search placeholder="username" allowClear={true} />
              </Col>
            </Row>
          </Col>
          <Col span={3}>{children}</Col>
        </Row>
      </Card>
    </>
  );
}
