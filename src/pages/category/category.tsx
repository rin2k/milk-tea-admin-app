import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { useCategory } from "@hooks";
import { RootState } from "@redux";
import { DeleteCategoryService } from "@services";
import { COLORS } from "@styles";
import { ICategory } from "@types";
import { Button, Form, message, Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CreateCategory } from "./create-category";
import { EditCategory } from "./edit-category";

export const CategoryPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "category" });
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [formEdit] = Form.useForm();

  const data = useSelector((state: RootState) => state.category);
  useCategory();

  const showModalEdit = (category: ICategory) => {
    setOpenEditModal(true);
    formEdit.setFieldValue("id", category.id);
    formEdit.setFieldValue("name", category.name);
  };

  const onConfirmDelete = (category: ICategory) => {
    DeleteCategoryService(category.id, () => {
      message.success(t("deletedSuccessfully"));
    });
  };

  const columns = [
    // {
    //   title: t("categoryId"),
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: t("categoryName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("action"),
      key: "action",
      render: (category: ICategory) => (
        <Space size="middle">
          <Button
            type={"text"}
            icon={<EditOutlined />}
            style={{ color: COLORS.blue }}
            onClick={() => {
              showModalEdit(category);
            }}
          />
          <Popconfirm
            title={t("delete")}
            description={t("wantToDelete")}
            onConfirm={() => {
              onConfirmDelete(category);
            }}
            okText={t("okText")}
            cancelText={t("cancelText")}
          >
            <Button
              type={"text"}
              icon={<DeleteOutlined />}
              style={{ color: COLORS.red }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpenCreateModal(true);
        }}
        icon={<PlusOutlined />}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {t("create")}
      </Button>
      <Table dataSource={data} columns={columns} />
      {openCreateModal && (
        <CreateCategory
          open={openCreateModal}
          onCancel={() => {
            setOpenCreateModal(false);
          }}
        />
      )}
      {openEditModal && (
        <EditCategory
          form={formEdit}
          open={openEditModal}
          onCancel={() => {
            setOpenEditModal(false);
          }}
        />
      )}
    </>
  );
};
