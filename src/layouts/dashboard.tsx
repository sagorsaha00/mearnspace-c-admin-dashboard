/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Layout, Menu } from "antd";
import Logo from "../components/icons/logo";
import Home from "../components/icons/home";
import Rasturants from "../components/icons/resturantan";
import Products from "../components/icons/products";
import Promos from "../components/icons/promos";
import {   theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import Icon, { UsergroupAddOutlined } from "@ant-design/icons";

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
          <Link to="/">  <Logo/></Link>
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
          <Header style={{ padding: 0, background: colorBgContainer }} />
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
