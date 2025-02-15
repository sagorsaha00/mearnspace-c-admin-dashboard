import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";

export default function user() {
  return (
    <>
      <Breadcrumb separator={<RightOutlined  style={{ fontSize: "16px", }}/>} items={[{ title: "Dashboard" }, {title:"User"}

      ]}></Breadcrumb>
    </>
  );
}
