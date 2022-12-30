import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  RootState,
  updateCategory,
} from "../../redux";
import { Category } from "../../types/category";

export const CategoryPage: React.FC = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const dispatch = useDispatch();

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
  const onFinishModalAdd = (values: Category) => {
    const fakeObj: Category = {
      id: Math.random(),
      name: values.name,
    };
    dispatch(addCategory(fakeObj));
    formAdd.resetFields();
    setOpenModalAdd(false);
  };

  const showDrawerEdit = (product: Category) => {
    setOpenDrawerEdit(true);
    formEdit.setFieldValue("id", product.id);
    formEdit.setFieldValue("name", product.name);
  };

  const handleCloseDrawerEdit = () => {
    setOpenDrawerEdit(false);
    formEdit.resetFields();
  };

  const handleOkDrawerEdit = () => {
    formEdit.submit();
  };

  const onFinishDrawerEdit = (values: Category) => {
    const fakeObj: Category = {
      id: values.id,
      name: values.name,
    };
    dispatch(updateCategory(fakeObj));
    setOpenDrawerEdit(false);
  };

  const onConfirmDelete = (category: Category) => {
    dispatch(deleteCategory(category));
  };

  const columns = [
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (category: Category) => (
        <Space size="middle">
          <Button
            type={"text"}
            icon={<EditOutlined />}
            style={{ color: "blue" }}
            onClick={() => {
              showDrawerEdit(category);
            }}
          />

          <Popconfirm
            title="Xác nhận xoá"
            description="Bạn có chắc chắn muốn xoá danh mục này?"
            onConfirm={() => {
              onConfirmDelete(category);
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
              label="Tên danh mục"
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Vui lòng nhập" />
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
              label="Tên danh mục"
              rules={[{ required: true, message: "Vui lòng nhập" }]}
            >
              <Input placeholder="Vui lòng nhập" />
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
        Thêm danh mục
      </Button>
      {renderAdd()}
      <Table dataSource={dataCategory} columns={columns} />
      {renderDetail()}
    </>
  );
};
