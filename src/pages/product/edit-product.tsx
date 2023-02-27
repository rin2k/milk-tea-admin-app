import { PlusOutlined } from "@ant-design/icons";
import { RootState } from "@redux";
import { EditProductService } from "@services";
import { getBase64 } from "@utils";
import {
  Col,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface EditProductProps {
  open: boolean;
  onCancel: () => void;
  form: FormInstance;
}

interface FormValues {
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  id: string;
}

const { Option } = Select;
export const EditProduct: React.FC<EditProductProps> = (props) => {
  const { open, onCancel, form } = props;

  const { t } = useTranslation([], { keyPrefix: "product.editProduct" });
  const [imageUrl, setImageUrl] = useState<string>();
  const category = useSelector((state: RootState) => state.category);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file as RcFile, (url) => {
      setImageUrl(url);
      form.setFieldValue("image", url);
    });
  };

  const onFinish = (values: FormValues) => {
    EditProductService(
      values.id,
      {
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        quantity: values.quantity,
        image: values.image,
      },
      () => {
        onCancel();
        message.success(t("updatedSuccessfully"));
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      okText={t("okText")}
      cancelText={t("cancelText")}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Col>
          <Form.Item
            name="id"
            label={t("labelId")}
            rules={[{ required: true, message: t("msgName") }]}
          >
            <Input disabled placeholder={t("hintName")} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="image"
            label={t("labelImage")}
            rules={[{ required: true, message: t("msgImage") }]}
          >
            <Upload
              accept=".png , .jpeg, .jpg"
              name={"file"}
              onChange={handleChange}
              showUploadList={false}
              listType={"picture-card"}
              className="avatar-uploader"
              beforeUpload={() => false}
              multiple={false}
            >
              {form.getFieldValue("image") ? (
                <img
                  src={form.getFieldValue("image")}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <PlusOutlined />
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="name"
            label={t("labelName")}
            rules={[{ required: true, message: t("msgName") }]}
          >
            <Input placeholder={t("hintName")} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="description"
            label={t("labelDescription")}
            rules={[{ required: true, message: t("msgDescription") }]}
          >
            <Input placeholder={t("hintDescription")} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="category"
            label={t("labelCategory")}
            rules={[{ required: true, message: t("msgCategory") }]}
          >
            <Select placeholder={t("hintCategory")}>
              {category.map((item) => {
                return <Option value={item?.id}>{item?.name}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="price"
            label={t("labelPrice")}
            rules={[{ required: true, message: t("msgPrice") }]}
          >
            <Input placeholder={t("hintPrice")} type={"number"} min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="quantity"
            label={t("labelQuantity")}
            rules={[{ required: true, message: t("msgQuantity") }]}
          >
            <Input placeholder={t("hintQuantity")} type={"number"} min={0} />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};
