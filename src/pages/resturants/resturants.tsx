import { useQuery } from "@tanstack/react-query";
import { getAlltanentsdata } from "../../http/api";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import ResturantFIlter from "./resturantFIlter";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

function Resturants() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [open]);
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  const {
    data: tanents = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["alltanents"],
    queryFn: async () => {
      const res = await getAlltanentsdata();
      console.log("API Response:", res.data?.data);
      return Array.isArray(res.data?.data) ? res.data?.data : [];
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <>
      <Breadcrumb
        style={{ margin: "2px" }}
        separator={<RightOutlined style={{ fontSize: "16px" }} />}
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Tenants" }]}
      ></Breadcrumb>
      <Space direction="vertical" style={{ width: "100%", margin: "5px" }}>
        <ResturantFIlter>
          {" "}
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            icon={<PlusOutlined />}
          >
            Add Resturant
          </Button>
        </ResturantFIlter>
        <Table columns={columns} dataSource={tanents} />
        <Drawer
          closable
          destroyOnClose
          title={<p> Ceeate Resturant</p>}
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
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Space>
    </>
  );
}

export default Resturants;
