import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { useCategory, useProduct } from "@hooks";
import { RootState } from "@redux";
import { COLORS } from "@styles";
import { IProduct } from "@types";
import { Button, Form, message, Select, Space, Table } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CreateProduct } from "./create-product";
import { EditProduct } from "./edit-product";

const { Option } = Select;

export const ProductPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "product" });
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [formEdit] = Form.useForm();

  useCategory();
  useProduct();
  const dataProduct = useSelector((state: RootState) => state.product);

  const showModalEdit = (product: IProduct) => {
    setOpenModalEdit(true);
    formEdit.setFieldValue("id", product.id);
    formEdit.setFieldValue("name", product.name);
    formEdit.setFieldValue("description", product.description);
    formEdit.setFieldValue("price", product.price);
    formEdit.setFieldValue("category", product.category);
    formEdit.setFieldValue("quantity", product.quantity);
    formEdit.setFieldValue("image", product.image);
  };

  const onConfirmDelete = (product: IProduct) => {
    const productDoc = doc(db, COLLECTIONS.PRODUCTS, product.id);
    deleteDoc(productDoc);
    message.success(t("deletedSuccessfully"));
  };

  const columns = [
    {
      title: t("productName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("productPrice"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("action"),
      key: "action",
      render: (product: IProduct) => (
        <Space size="middle">
          <Button
            type={"text"}
            icon={<EditOutlined />}
            style={{ color: COLORS.blue }}
            onClick={() => {
              showModalEdit(product);
            }}
          />
          {/* <Popconfirm
            title={t("delete")}
            description={t("wantToDelete")}
            onConfirm={() => {
              onConfirmDelete(product);
            }}
            okText={t("okText")}
            cancelText={t("cancelText")}
          >
            <Button
              type={"text"}
              icon={<DeleteOutlined />}
              style={{ color: COLORS.red }}
            />
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpenModalCreate(true);
        }}
        icon={<PlusOutlined />}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {t("create")}
      </Button>
      <Table dataSource={dataProduct} columns={columns} />
      {openModalCreate && (
        <CreateProduct
          open={openModalCreate}
          onCancel={() => {
            setOpenModalCreate(false);
          }}
        />
      )}
      {openModalEdit && (
        <EditProduct
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
