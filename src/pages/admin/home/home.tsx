import {
  DollarCircleOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { pages } from "@constants";
import { useUser } from "@hooks";
import { RootState } from "@redux";
import { IOrder, OrderStatus } from "@types";
import { Col, Row, Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardStatistic, CardStatisticProps } from "./components/card-statistic";
import { useEffect } from "react";
import { GetOrdersService } from "@services";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Timestamp } from "firebase/firestore";
import { formatDate } from "@utils";

export const Home: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "dashboardPage" });
  const navigate = useNavigate();
  useUser();
  const users = useSelector((state: RootState) => state.user);
  const [numberOrders, setNumberOrders] = useState<number>();

  const [dataOrders, setDataOrders] = useState<Array<IOrder>>([]);

  useEffect(() => {
    GetOrdersService({ status: OrderStatus.PENDING }, (data) => {
      setNumberOrders(data.length);
      setDataOrders(data);
    });
  }, []);

  const styleIcon = {
    borderRadius: 20,
    fontSize: 24,
    padding: 8,
  };
  const dataCard: Array<CardStatisticProps> = [
    {
      title: "Users",
      value: users.length,
      icon: (
        <UserOutlined
          style={{
            color: "green",
            backgroundColor: "rgba(0,255,255,0.25)",
            ...styleIcon,
          }}
        />
      ),
      onClick: () => {
        navigate(pages.user);
      },
    },
    {
      title: "Orders",
      value: numberOrders ? numberOrders : "",
      icon: (
        <ShoppingOutlined
          style={{
            color: "green",
            backgroundColor: "rgba(0,255,0,0.25)",
            ...styleIcon,
          }}
        />
      ),
      onClick: () => {
        navigate(pages.order, { state: { statusKey: OrderStatus.PENDING } });
      },
    },

    // {
    //   title: "Income",
    //   value: "600k",
    //   icon: (
    //     <DollarCircleOutlined
    //       style={{
    //         color: "blue",
    //         backgroundColor: "rgba(0,0,255,0.25)",
    //         ...styleIcon,
    //       }}
    //     />
    //   ),
    //   onClick: () => {
    //     navigate(pages.order);
    //   },
    // },
  ];

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("shipTo"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("totalCost"),
      dataIndex: "totalCost",
      key: "totalCost",
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      key: "date",
      render: (date: Timestamp) => formatDate(date),
    },
  ];

  return (
    <>
      <Row style={{ gap: 0 }}>
        {dataCard.map((item) => {
          return (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ textAlign: "center" }}
            >
              <CardStatistic
                title={item.title}
                value={item.value}
                icon={item.icon}
                onClick={item.onClick}
              />
            </Col>
          );
        })}
      </Row>
      <Typography style={{ marginTop: 20 }}>{t("ordersRecent")}</Typography>
      <Table dataSource={dataOrders} columns={columns} />
    </>
  );
};
