import { EditOutlined } from "@ant-design/icons";
import { CreateButton } from "@components";
import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { useUser } from "@hooks";
import { COLORS } from "@styles";
import { IOrder, OrderStatus } from "@types";
import { formatDate } from "@utils";
import { Button, Form, Space, Table } from "antd";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import i18next from "i18next";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Home: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "orderPage" });
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [formEdit] = Form.useForm();
  const [data, setData] = useState<Array<IOrder>>([]);

  useUser();

  useEffect(() => {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData: any = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(newData);
      setData(newData);
    });
    return () => unsubscribe();
  }, []);

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
      dataIndex: "date",
      key: "date",
      render: (date: Timestamp) => formatDate(date),
    },
  ];

  return (
    <>
      <span style={{ marginTop: 10 }}>Latest transactions</span>
      <Table dataSource={data} columns={columns} />
    </>
  );
};
