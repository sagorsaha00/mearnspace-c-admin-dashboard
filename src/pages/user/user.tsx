import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Row, Space, Table } from "antd";
import React, { useEffect } from "react";
import { getUserdata } from "../../http/api";
import { Users } from "../../types";
import UserFilter from "./userFilter";
import CreateUser from "./createUser";

export default function User() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [open]);

  const columns = [
    {
      title: "FirstName",
      dataIndex: "lastname",
      key: "lastname",
      render: (_text: string, record: Users) => (
        <div>
          {record.firstname} {record.lastname}
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
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
      <Space direction="vertical" style={{ width: "100%" }}>
        {" "}
        <Breadcrumb
          separator={<RightOutlined style={{ fontSize: "16px" }} />}
          items={[{ title: "Dashboard" }, { title: "User" }]}
        ></Breadcrumb>
        <div>
          <UserFilter
            onFilterChnage={(filterName: string, filterValue: string) => {
              console.log(filterName, filterValue);
            }}
          >
            {" "}
            <Button
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
              type="primary"
              style={{ justifyContent: "flex-end" }}
            >
              Add user
            </Button>
          </UserFilter>
          <Table columns={columns} dataSource={users} rowKey={"id"}></Table>

          <Drawer
           
            closable
            destroyOnClose
            title={<p> Create User</p>}
            placement="right"
            open={open}
            loading={loading}
            onClose={() => setOpen(false)}
            width={500}
            extra={
              <Space>
                <Button>Cencel</Button>
                <Button type="primary">Save</Button>
              </Space>
            }
          >
           <Form layout="vertical">
           <CreateUser/> 
           </Form>
          </Drawer>
        </div>
      </Space>
    </>
  );
}
