import {
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { removeAdmin, RootState } from "@redux";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../../constants/pages";

const { Header, Content, Footer, Sider } = Layout;

export interface DefaultLayoutProps {
  children: React.ReactNode;
}
export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { t } = useTranslation([], { keyPrefix: "adminDefaultLayout" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.authAdmin.isAuthenticated
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "dashboard",
      icon: <PieChartOutlined />,
      label: t("dashboard"),
      onClick: () => {
        navigate("/");
      },
    },

    {
      key: "user",
      icon: <PieChartOutlined />,
      label: t("user"),
      onClick: () => {
        navigate("/user");
      },
    },
    {
      key: "product",
      icon: <TeamOutlined />,
      label: t("product"),
      onClick: () => {
        navigate("/product");
      },
    },
    {
      key: "category",
      icon: <PieChartOutlined />,
      label: t("category"),
      onClick: () => {
        navigate("/category");
      },
    },
    {
      key: "order",
      icon: <TeamOutlined />,
      label: t("orders"),
      onClick: () => {
        navigate("/order");
      },
    },
    {
      key: "admin",
      icon: <TeamOutlined />,
      label: t("admin"),
      children: [
        {
          key: "information",
          label: t("information"),
          onClick: () => {
            navigate(pages.information);
          },
        },
        {
          key: "change-email",
          label: t("changeEmail"),
          onClick: () => {
            navigate(pages.change_email);
          },
        },
        {
          key: "change-password",
          label: t("changePassword"),
          onClick: () => {
            navigate(pages.change_password);
          },
        },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("logOut"),
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
      case pages.change_email:
        return ["change-email"];
      case pages.change_password:
        return ["change-password"];
    }
  };

  if (!isAuthenticated) return <Navigate to={pages.login} />;

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
        <Header style={{ padding: 10, background: colorBgContainer }} />
        <Content style={{ margin: "16px" }}>
          {/* <Outlet /> */}
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>Admin Milk Tea</Footer>
      </Layout>
    </Layout>
  );
};
