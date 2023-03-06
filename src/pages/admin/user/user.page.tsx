import { EditOutlined } from "@ant-design/icons";
import { CreateButton } from "@components";
import { GetUsersService } from "@services";
import { COLORS } from "@styles";
import { IUser, UserStatus } from "@types";
import { formatDate } from "@utils";
import { Button, Form, Space, Table, Tabs, TabsProps } from "antd";
import { Timestamp } from "firebase/firestore";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateUser } from "./create-user.component";
import { EditUser } from "./edit-user.component";

const tabs: TabsProps["items"] = [
  {
    key: "ALL",
    label: i18next.t("userStatus.all"),
  },
  {
    key: UserStatus.ACTIVE,
    label: i18next.t("userStatus.active"),
  },
  {
    key: UserStatus.BLOCKED,
    label: i18next.t("userStatus.blocked"),
  },
];

export const UserPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "userPage" });

  const [users, setUsers] = useState<Array<IUser>>([]);
  const [filters, setFilters] = useState<{
    status?: keyof typeof UserStatus;
  }>();

  const onChangeTab = (key: string) => {
    if (key === "ALL") {
      return setFilters({ ...filters, status: undefined });
    }
    setFilters({ ...filters, status: key as UserStatus });
  };

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [formEdit] = Form.useForm();

  const showModalEdit = (user: IUser) => {
    setOpenModalEdit(true);
    formEdit.setFieldsValue({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      addresses: user.addresses,
      status: user.status,
    });
  };

  const columns = [
    {
      title: t("uid"),
      dataIndex: "id",
      key: "uid",
    },
    {
      title: t("fullname"),
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: Timestamp) => formatDate(date),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof UserStatus) => {
        return (
          <Button
            disabled
            style={{
              backgroundColor:
                status == UserStatus.BLOCKED
                  ? COLORS.status.canceled
                  : COLORS.status.completed,
              color: COLORS.white,
            }}
          >
            {i18next.t("userStatus." + status.toLocaleLowerCase())}
          </Button>
        );
      },
    },
    {
      title: t("action"),
      key: "action",
      render: (user: IUser) => (
        <Space size="middle">
          <Button
            type={"text"}
            icon={<EditOutlined />}
            style={{ color: COLORS.blue }}
            onClick={() => {
              showModalEdit(user);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const unsubscribe = GetUsersService(
      {
        status: filters?.status,
      },
      (data) => {
        setUsers(data);
      }
    );
    return () => unsubscribe();
  }, [filters]);

  return (
    <>
      <CreateButton
        onClick={() => {
          setOpenModalCreate(true);
        }}
      />
      <Tabs
        defaultActiveKey={filters?.status}
        items={tabs}
        onChange={onChangeTab}
      />
      <Table dataSource={users} columns={columns} />
      {openModalCreate && (
        <CreateUser
          open={openModalCreate}
          onCancel={() => {
            setOpenModalCreate(false);
          }}
        />
      )}
      {openModalEdit && (
        <EditUser
          form={formEdit}
          open={openModalEdit}
          onCancel={() => {
            setOpenModalEdit(false);
          }}
        />
      )}
    </>
  );
};
