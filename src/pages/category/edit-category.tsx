import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { Col, Form, FormInstance, Input, message, Modal } from "antd";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
interface EditCategoryProps {
  open: boolean;
  onCancel: () => void;
  form: FormInstance;
}

interface FormValues {
  name: string;
  id: string;
}

export const EditCategory: React.FC<EditCategoryProps> = (props) => {
  const { open, onCancel, form } = props;

  const { t } = useTranslation([], { keyPrefix: "category.editCategory" });

  const onFinish = (values: FormValues) => {
    form.resetFields();
    const bookDoc = doc(db, COLLECTIONS.CATEGORIES, values.id);
    updateDoc(bookDoc, {
      name: values.name,
      updatedAt: Timestamp.now(),
    });
    onCancel();
    message.success(t("updatedSuccessfully"));
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
            name="name"
            label={t("labelName")}
            rules={[{ required: true, message: t("msgName") }]}
          >
            <Input placeholder={t("hintName")} />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};
