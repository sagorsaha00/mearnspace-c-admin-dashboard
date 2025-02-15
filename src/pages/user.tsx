import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import React, { use } from "react";
import { getUserdata } from "../http/api";
import { Users } from "../types";

export default function User() {
  const {data:users} = useQuery({
    queryKey:["users"],
    queryFn: () => {
      return getUserdata().then((res) => res.data);
    }
})
  return (
    <>
      <Breadcrumb separator={<RightOutlined  style={{ fontSize: "16px", }}/>} items={[{ title: "Dashboard" }, {title:"User"}
      ]}></Breadcrumb>

      <div>
        <ul>
          {users?.map((user: Users) => (
             <li>
               <p>{user.id}</p>
               <p>{user.firstname}</p>
               <p>{user.lastname}</p>
               <p>{user.email}</p>
               <p>{user.createdAt}</p>
             </li>
          ))}
        </ul>
      </div>
    </>
  );
}
