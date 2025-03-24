import React from "react";
import { Card, Layout, List, Space, Tag, Typography } from "antd";
import { useAuthStore } from "../store";
import Ordericon from "../components/icons/ordersicon";
import Saleicon from "../components/icons/saleicon";
const { Title, Text } = Typography;
import ".././index.css";

const orders = [
  {
    id: 1,
    name: "Rakesh Kohali",
    location: "main street, bandra",
    price: 1250,
    status: "Preparing",
    statusColor: "#f8d7da",
    textColor: "#d9534f",
  },
  {
    id: 2,
    name: "John Doe",
    location: "side street, bandra",
    price: 900,
    status: "On the way",
    statusColor: "#d1ecf1",
    textColor: "#17a2b8",
  },
  {
    id: 3,
    name: "Naman Kar",
    location: "down street, bandra",
    price: 1900,
    status: "Delivered",
    statusColor: "#d4edda",
    textColor: "#28a745",
  },
  {
    id: 4,
    name: "Naman Kar",
    location: "down street, bandra",
    price: 1900,
    status: "Delivered",
    statusColor: "#d4edda",
    textColor: "#28a745",
  },
  {
    id: 5,
    name: "Naman Kar",
    location: "down street, bandra",
    price: 1900,
    status: "Delivered",
    statusColor: "#d4edda",
    textColor: "#28a745",
  },
];

const Homepage = () => {
  const { user } = useAuthStore();
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning 🌞";
    } else if (hour < 18) {
      return "Good Afternoon ☀️";
    } else {
      return "Good Night 🌙";
    }
  };

  return (
    <Layout style={{ padding: 20 }}>
      <Title level={3}>
        {getGreeting()}
        {user?.firstname}
      </Title>

      <Space>
        <Space>
          <Space direction="horizontal" style={{ marginBottom: "360px" }}>
            <Card style={{ width: 280, height: 120 }}>
              <Space>
                <Ordericon />
                <Title
                  level={4}
                  style={{ marginLeft: "10px", marginTop: "4px" }}
                >
                  Total Orders
                </Title>
              </Space>
              <Title style={{ marginLeft: "25px" }}>80</Title>
            </Card>

            {/* Total Sales Card */}
            <Card style={{ width: 280, height: 120 }}>
              <Space>
                <Saleicon />
                <Title
                  level={4}
                  style={{ marginLeft: "10px", marginTop: "4px" }}
                >
                  Total Sales
                </Title>
              </Space>
              <Title style={{ marginLeft: "25px" }}>₹80,000</Title>
            </Card>
          </Space>
        </Space>
        <Space style={{ marginTop: "20px" }}>
          <Card
            title={
              <span>
                <Ordericon />
                Recent Orders
              </span>
            }
            bordered
            style={{ width: "100%" }}
          >
            <List
              style={{ width: 550 }}
              itemLayout="horizontal"
              dataSource={orders}
              renderItem={(order) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{order.name}</Text>}
                    description={order.location}
                  />
                  <Text style={{ marginRight: 8 }} strong>
                    ₹ {order.price}
                  </Text>
                  <Tag
                    style={{
                      background: order.statusColor,
                      color: order.textColor,
                    }}
                  >
                    {order.status}
                  </Tag>
                </List.Item>
              )}
            />
            <Text
              strong
              style={{
                color: "#d9534f",
                cursor: "pointer",
                marginTop: 10,
                display: "block",
              }}
            >
              See all orders
            </Text>
          </Card>
        </Space>
      </Space>
    </Layout>
  );
};

export default Homepage;
