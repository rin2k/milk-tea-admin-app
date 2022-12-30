import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  RootState,
  updateProduct,
} from "../../redux";
import { Product } from "../../types/product";

const { Option } = Select;

export const ProductPage: React.FC = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const dispatch = useDispatch();

  const dataProduct = useSelector((state: RootState) => state.product);
  const dataCategory = useSelector((state: RootState) => state.category);
  const showModalAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
    formAdd.resetFields();
  };

  const handleOkModalAdd = () => {
    formAdd.submit();
  };
  const onFinishModalAdd = (values: any) => {
    const filterCategory = dataCategory.find((e) => e.id === values.category);

    if (filterCategory !== undefined) {
      const fakeObj: Product = {
        id: Math.random(),
        name: values.name,
        price: values.price,
        category: filterCategory,
      };
      dispatch(addProduct(fakeObj));
      formAdd.resetFields();
      setOpenModalAdd(false);
    }
  };

  const showDrawerEdit = (product: Product) => {
    setOpenDrawerEdit(true);
    formEdit.setFieldValue("id", product.id);
    formEdit.setFieldValue("name", product.name);
    formEdit.setFieldValue("price", product.price);
    formEdit.setFieldValue("category", product.category.name);
  };

  const handleCloseDrawerEdit = () => {
    setOpenDrawerEdit(false);
    formEdit.resetFields();
  };

  const handleOkDrawerEdit = () => {
    formEdit.submit();
  };

  const onFinishDrawerEdit = (values: Product) => {
    const fakeObj: Product = {
      id: values.id,
      name: values.name,
      price: values.price,
      category: values.category,
    };
    dispatch(updateProduct(fakeObj));
    setOpenDrawerEdit(false);
  };

  const onConfirmDelete = (product: Product) => {
    dispatch(deleteProduct(product));
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (product: Product) => (
        <Space size="middle">
          <Button
            type={"text"}
            icon={<EditOutlined />}
            style={{ color: "blue" }}
            onClick={() => {
              showDrawerEdit(product);
            }}
          />

          <Popconfirm
            title="Xác nhận xoá"
            description="Bạn có chắc chắn muốn xoá sản phẩm này?"
            onConfirm={() => {
              onConfirmDelete(product);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type={"text"}
              icon={<DeleteOutlined />}
              style={{ color: "red" }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const renderAdd = () => {
    return (
      <Modal
        open={openModalAdd}
        onOk={handleOkModalAdd}
        onCancel={handleCloseModalAdd}
      >
        <Form layout="vertical" onFinish={onFinishModalAdd} form={formAdd}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Vui lòng nhập" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn" }]}
            >
              <Select placeholder="Vui lòng chọn">
                {dataCategory.map((e) => {
                  return <Option value={e.id}>{e.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="price"
              label="Giá sản phẩm"
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Vui lòng nhập" type={"number"} />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    );
  };

  const renderDetail = () => {
    return (
      <Drawer
        width={"50%"}
        onClose={handleCloseDrawerEdit}
        open={openDrawerEdit}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={handleCloseDrawerEdit}>Cancel</Button>
            <Button type="primary" onClick={handleOkDrawerEdit}>
              OK
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" onFinish={onFinishDrawerEdit} form={formEdit}>
          <Col span={24}>
            <Form.Item hidden name="id" label="id" />
          </Col>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Vui lòng nhập" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn" }]}
            >
              <Select placeholder="Vui lòng chọn">
                {dataCategory.map((e) => {
                  return <Option value={e.name}>{e.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="price"
              label="Giá sản phẩm"
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Vui lòng nhập" type={"number"} />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModalAdd}
        icon={<PlusOutlined />}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Thêm sản phẩm
      </Button>
      {renderAdd()}
      <Table dataSource={dataProduct} columns={columns} />
      {renderDetail()}
    </>
  );
};
