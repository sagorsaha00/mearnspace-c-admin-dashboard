import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table } from "antd";
import React, { useEffect } from "react";
import { CreateUser, getUserdata } from "../../http/api";
import { Users, CreatUserData } from "../../types";
import UserFilter from "./userFilter";
import CreateUserForm from "./createUser";

import { AxiosError } from "axios";

export default function User() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  // const form = Form.useForm()
  const [formInstance] = Form.useForm();

  const quryclint = useQueryClient();

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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
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

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreatUserData) => {
      return CreateUser(data).then((res) => res.data);
    },
    onSuccess: () => {
      return quryclint.invalidateQueries({ queryKey: ["user"] });
    
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: AxiosError | any) => {
      if (error?.response?.data?.errors) {
        alert(error.response.data.errors[0].message);
      }
    },
  });

  const HandleSubmitForm = async () => {
    try {
      await formInstance.validateFields();
      const formData = formInstance.getFieldsValue(true); // Ensure all fields are captured
      console.log("Collected Form Data:", formData);

      if (!formData.password) {
        console.error("Password is missing!");
        alert("Password is required.");
        return;
      }

      userMutate(formData);
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

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
                <Button type="primary" onClick={HandleSubmitForm}>
                  Save
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" form={formInstance}>
              <CreateUserForm />
            </Form>
          </Drawer>
        </div>
      </Space>
    </>
  );
}
