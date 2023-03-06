import { EditOutlined } from "@ant-design/icons";
import { CreateButton } from "@components";
import { useCategory } from "@hooks";
import { GetProductsService } from "@services";
import { COLORS } from "@styles";
import { IProduct, ProductStatus } from "@types";
import { Button, Form, Space, Table, Tabs, TabsProps } from "antd";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateProduct } from "./create-product.component";
import { EditProduct } from "./edit-product.component";

const tabs: TabsProps["items"] = [
  {
    key: "ALL",
    label: i18next.t("productStatus.all"),
  },
  {
    key: ProductStatus.ENABLED,
    label: i18next.t("productStatus.enabled"),
  },
  {
    key: ProductStatus.DISABLED,
    label: i18next.t("productStatus.disabled"),
  },
];

export const ProductPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "product" });
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [formEdit] = Form.useForm();

  const [filters, setFilters] = useState<{
    status?: keyof typeof ProductStatus;
  }>();

  const onChangeTab = (key: string) => {
    if (key === "ALL") {
      return setFilters({ ...filters, status: undefined });
    }
    setFilters({ ...filters, status: key as ProductStatus });
  };

  useCategory();

  const [dataProduct, setDataProduct] = useState<Array<IProduct>>([]);

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

  const columns = [
    {
      title: t("productId"),
      dataIndex: "id",
      key: "id",
    },
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
      title: t("productStatus"),
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof ProductStatus) => {
        return (
          <Button
            disabled
            style={{
              backgroundColor:
                status == ProductStatus.DISABLED
                  ? COLORS.status.canceled
                  : COLORS.status.completed,
              color: COLORS.white,
            }}
          >
            {i18next.t("productStatus." + status.toLocaleLowerCase())}
          </Button>
        );
      },
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
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const unsubscribe = GetProductsService(
      {
        status: filters?.status,
      },
      (data) => {
        setDataProduct(data);
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
      <Tabs items={tabs} onChange={onChangeTab} />
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
