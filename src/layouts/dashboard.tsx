/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space } from "antd";
import Logo from "../components/icons/logo";
import Home from "../components/icons/home";
import Rasturants from "../components/icons/resturantan";
import Products from "../components/icons/products";
import Promos from "../components/icons/promos";
import { theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import Icon, { BellFilled, UsergroupAddOutlined } from "@ant-design/icons";
import { logout } from "../http/api";
import { useMutation } from "@tanstack/react-query";

const items = [
  {
    key: "/",
    icon: <Icon component={Home} />,
    label: <NavLink to={"/"}>Home</NavLink>,
  },
  {
    key: "/users",
    icon: <UsergroupAddOutlined />,
    label: <NavLink to={"/users"}>Users</NavLink>,
  },
  {
    key: "/rasturants",
    icon: <Icon component={Rasturants}></Icon>,
    label: <NavLink to={"/resturants"}>Rasturants</NavLink>,
  },
  {
    key: "/products",
    icon: <Icon component={Products}></Icon>,
    label: <NavLink to={"/products"}>Products</NavLink>,
  },
  {
    key: "/promos",
    icon: <Icon component={Promos}></Icon>,
    label: <NavLink to={"/promos"}>Promos</NavLink>,
  },
];

export default function Dashboard() {
  const { logout: logoutfromStore } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: Logoutmutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutfromStore();
      navigate("/auth/login");
      return;
    },
  });
  const { Header, Sider, Content } = Layout;
  const { user } = useAuthStore();

  if (user === null) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="dasboarad-logo">
            <Link to="/">
              {" "}
              <Logo />
            </Link>
          </div>
          <div className="demo-logo-vertical" />
          <Menu
            style={{ marginLeft: "17px" }}
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <Flex style={{ justifyContent: "space-between" }}>
              <Badge
                text={
                  user.role === "admin" ? "you are an admin" : user?.tanent.name
                }
                status="success"
              ></Badge>
              <Space size={18}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => Logoutmutation(),
                      },
                    ],
                  }}
                >
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      <div>
        this is home page
        <Outlet></Outlet>
      </div>
    </>
  );
}
