import {
  PieChartOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { removeAdmin, RootState } from "@redux";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../../constants/pages";

const { Header, Content, Footer, Sider } = Layout;

export interface DefaultLayoutProps {
  children: React.ReactNode;
}
export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authAdmin.isAuthenticated
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    {
      key: "dashboard",
      icon: <PieChartOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/");
      },
    },

    {
      key: "user",
      icon: <PieChartOutlined />,
      label: "User",
      onClick: () => {
        navigate("/user");
      },
    },
    {
      key: "product",
      icon: <TeamOutlined />,
      label: "Product",
      onClick: () => {
        navigate("/product");
      },
    },
    {
      key: "category",
      icon: <PieChartOutlined />,
      label: "Category",
      onClick: () => {
        navigate("/category");
      },
    },
    {
      key: "order",
      icon: <TeamOutlined />,
      label: "Orders",
      onClick: () => {
        navigate("/order");
      },
    },
    // {
    //   key: "information",
    //   icon: <TeamOutlined />,
    //   label: "Information",
    //   onClick: () => {
    //     navigate("/information");
    //   },
    // },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        dispatch(removeAdmin());
      },
    },
  ];

  const selectedKey = useLocation().pathname;

  const highlight = () => {
    switch (selectedKey) {
      case pages.dashboard:
        return ["dashboard"];

      case pages.user:
        return ["user"];
      case pages.product:
        return ["product"];
      case pages.category:
        return ["category"];
      case pages.order:
        return ["order"];
      case pages.information:
        return ["information"];
    }
  };
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          selectedKeys={highlight()}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Admin Milk Tea</Footer>
      </Layout>
    </Layout>
  );
};
