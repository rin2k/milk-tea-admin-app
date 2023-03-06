import { EditOutlined } from "@ant-design/icons";
import { useUser } from "@hooks";
import { GetOrdersService } from "@services";
import { COLORS } from "@styles";
import { IOrder, OrderStatus } from "@types";
import { formatDate } from "@utils";
import { Button, Form, Space, Table, Tabs, TabsProps } from "antd";
import { Timestamp } from "firebase/firestore";
import i18next from "i18next";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { EditOrder } from "./edit-order";
import { Filter } from "./filter.component";

const items: TabsProps["items"] = [
  {
    key: "All",
    label: `All orders`,
  },
  {
    key: OrderStatus.PENDING,
    label: `Pending`,
  },
  {
    key: OrderStatus.SHIPPING,
    label: `Shipping`,
  },
  {
    key: OrderStatus.COMPLETED,
    label: `Completed`,
  },
  {
    key: OrderStatus.CANCELED,
    label: `Canceled`,
  },
];

export const OrderPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "orderPage" });
  const location = useLocation();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [formEdit] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [data, setData] = useState<Array<IOrder>>([]);

  const [filters, setFilters] = useState<{
    status?: keyof typeof OrderStatus;
    id?: string;
    uid?: string;
    createdAt?: {
      start?: Date;
      end?: Date;
    };
  }>({
    status: location?.state?.statusKey,
    id: undefined,
    uid: undefined,
    createdAt: {
      start: undefined,
      end: undefined,
    },
  });

  useUser();

  useEffect(() => {
    const unsubscribe = GetOrdersService(
      {
        status: filters.status,
        id: filters.id,
        uid: filters.uid,
        createdAt: filters.createdAt,
      },
      (data) => {
        setData(data);
      }
    );
    return () => unsubscribe();
  }, [filters]);

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
            onClick={() => {
              formEdit.setFieldValue("id", product.id);
              setOpenModalEdit(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const onChange = (key: any) => {
    if (key == "All") {
      return setFilters({ ...filters, status: undefined });
    }
    setFilters({ ...filters, status: key });
  };

  return (
    <>
      <Tabs
        defaultActiveKey={filters.status}
        items={items}
        onChange={onChange}
      />
      <Filter
        form={formFilter}
        onChange={(values) => {
          setFilters({
            ...filters,
            id: values.id,
            uid: values.uid,
            createdAt: {
              start: values.date?.[0],
              end: values.date?.[1],
            },
          });
        }}
      />
      <Table dataSource={data} columns={columns} />
      {openModalEdit && (
        <EditOrder
          open={openModalEdit}
          onCancel={() => {
            setOpenModalEdit(false);
          }}
          form={formEdit}
        />
      )}
    </>
  );
};
