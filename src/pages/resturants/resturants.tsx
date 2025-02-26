import { useQuery } from "@tanstack/react-query";
import { getAlltanentsdata } from "../../http/api";
import {
  Breadcrumb,
  Form as AntdForm,
  Button,
  Drawer,
  Space,
  Table,
} from "antd";
import ResturantFIlter from "./resturantFIlter";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { ResturantFormDataValue } from "../../types";

import { useForm } from "antd/es/form/Form";

function Resturants() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quryParams, setQuryParams] = React.useState({
    perPage: 7,
    currentPage: 1,
  });
  const [form] = useForm();

  const onFilterChange = (changedValues: ResturantFormDataValue[]) => {
    const filterChangeRestaurantValue = changedValues.reduce((acc, item) => {
      return {
        ...acc,
        [item.name[0]]: item.value,
      };
    }, {});

    setQuryParams((prev) => {
      const newState = {
        ...prev,
        ...filterChangeRestaurantValue,
      };
    
      return newState;
    });
  };


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
    data: tanents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["alltanents", JSON.stringify(quryParams)],
    queryFn: async () => {
      const resturantstring = new URLSearchParams(
        quryParams as unknown as Record<string, string>
      ).toString();
      const res = await getAlltanentsdata(resturantstring);
      return res.data?.data;
    },
    refetchOnWindowFocus: false,
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
        <div>
          <AntdForm form={form} onFieldsChange={onFilterChange}>
            <ResturantFIlter>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
                type="primary"
                style={{ justifyContent: "flex-end" }}
              >
                Add user
              </Button>
            </ResturantFIlter>
          </AntdForm>
        </div>
        <Table
          columns={columns}
          dataSource={tanents || []}
          rowKey={"id"}
          pagination={{
            total: tanents?.total || 0, // Ensure `total` exists
            pageSize: quryParams.perPage,
            current: quryParams.currentPage,
            onChange: (page, pageSize) => {
              setQuryParams((prev) => ({
                ...prev,
                currentPage: page,
                perPage: pageSize,
              }));
            },
            showTotal: (total: number, range: [number, number]) => {
              return (
                <span>
                  {range[0]}-{range[1]} of {total} items
                </span>
              );
            },
          }}
        />
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
