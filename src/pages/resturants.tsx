import { useQuery } from "@tanstack/react-query";
import { getAlltanentsdata } from "../http/api";
import { Table } from "antd";

function Resturants() {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  const { data: tanents = [], isLoading, error } = useQuery({
    queryKey: ["alltanents"],
    queryFn: async () => {
      const res = await getAlltanentsdata();
      console.log("API Response:", res.data?.data);
      return Array.isArray(res.data?.data) ? res.data?.data : [];
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return <Table columns={columns} dataSource={tanents} />;
}

export default Resturants;
