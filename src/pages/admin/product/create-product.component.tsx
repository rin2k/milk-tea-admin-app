import { PlusOutlined } from "@ant-design/icons";
import { RootState } from "@redux";
import { CreateProductService } from "@services";
import { getBase64 } from "@utils";
import { Form, Input, message, Modal, Select, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface CreateProductProps {
  open: boolean;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const { Option } = Select;
export const CreateProduct: React.FC<CreateProductProps> = (props) => {
  const { open, onCancel } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation([], { keyPrefix: "product.createProduct" });
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

  const onFinish = async (values: FormValues) => {
    CreateProductService(
      {
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        image: values.image,
      },
      () => {
        form.resetFields();
        onCancel();
        message.success(t("addedSuccessfully"));
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
        <Form.Item
          name="name"
          label={t("labelName")}
          rules={[{ required: true, message: t("msgName") }]}
        >
          <Input placeholder={t("hintName")} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t("labelDescription")}
          rules={[{ required: true, message: t("msgDescription") }]}
        >
          <Input placeholder={t("hintDescription")} />
        </Form.Item>
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
        <Form.Item
          name="price"
          label={t("labelPrice")}
          rules={[{ required: true, message: t("msgPrice") }]}
        >
          <Input placeholder={t("hintPrice")} type={"number"} min={0} />
        </Form.Item>
        {/* <Form.Item
          name="quantity"
          label={t("labelQuantity")}
          rules={[{ required: true, message: t("msgQuantity") }]}
        >
          <Input placeholder={t("hintQuantity")} type={"number"} min={0} />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
