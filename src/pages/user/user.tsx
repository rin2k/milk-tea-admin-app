import { EditOutlined } from "@ant-design/icons";
import { CreateButton } from "@components";
import { useProduct, useUser } from "@hooks";
import { RootState } from "@redux";
import { COLORS } from "@styles";
import { IUser } from "@types";
import { formatDate } from "@utils";
import { Button, Form, Space, Table } from "antd";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CreateUser } from "./create-user";
import { EditUser } from "./edit-user";

interface UserPageProps {}
export const UserPage: React.FC<UserPageProps> = () => {
  const { t } = useTranslation([], { keyPrefix: "userPage" });
  const users = useSelector((state: RootState) => state.user);
  // useUser();
  // useProduct();

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [formEdit] = Form.useForm();

  const showModalEdit = (user: IUser) => {
    setOpenModalEdit(true);
    formEdit.setFieldValue("id", user.id);
    formEdit.setFieldValue("fullname", user.fullname);
    formEdit.setFieldValue("email", user.email);
    formEdit.setFieldValue("addresses", user.addresses);
  };

  const columns = [
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

  return (
    <>
      <CreateButton
        onClick={() => {
          setOpenModalCreate(true);
        }}
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
