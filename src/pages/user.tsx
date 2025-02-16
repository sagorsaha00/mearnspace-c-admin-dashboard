import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Space, Table } from "antd";
import React, { use } from "react";
import { getUserdata } from "../http/api";
import { Users } from "../types";
 

export default function User() {
  const columns = [

    {
      title: "FirstName",
      dataIndex: "lastname",
      key: "lastname",
      render: (_text: string, record: Users ) => <div>
      {record.firstname} {record.lastname}
      </div>,
    },
    
    {
      title: "Email",
      dataIndex:"email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUserdata().then((res) => res.data);
    },
  });
  return (
    <>
     <Space direction="vertical" style={{width:"100%"}}> <Breadcrumb
        separator={<RightOutlined style={{ fontSize: "16px" }} />}
        items={[{ title: "Dashboard" }, { title: "User" }]}
      ></Breadcrumb>
     
      <div>
         <Table columns={columns} dataSource={users}></Table>
      </div></Space>
    </>
  );
}
