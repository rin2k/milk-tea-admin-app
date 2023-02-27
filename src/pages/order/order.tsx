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
import { CreateOrder } from "./create-order";
export const OrderPage: React.FC = () => {
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
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof OrderStatus) => {
        const renderBg = () => {
          return get(COLORS.status, status.toLowerCase());
        };
        const renderTitle = () => {
          return i18next.t("orderStatus" + "." + status.toLocaleLowerCase());
        };

        return (
          <Button
            disabled
            style={{
              backgroundColor: renderBg(),
              color: COLORS.white,
            }}
          >
            {renderTitle()}
          </Button>
        );
      },
    },
    {
      title: t("action"),
      key: "action",
      render: (product: any) => (
        <Space size="middle">
          <Button
            type={"text"}
            icon={<EditOutlined />}
            style={{ color: COLORS.blue }}
            onClick={() => {}}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <CreateButton
        onClick={() => {
          setOpenModalCreate(true);
        }}
      />
      <Table dataSource={data} columns={columns} />
      {openModalCreate && (
        <CreateOrder
          open={openModalCreate}
          onCancel={() => {
            setOpenModalCreate(false);
          }}
        />
      )}
    </>
  );
};
