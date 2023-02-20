import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { Col, Form, Input, message, Modal } from "antd";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";
interface CreateCategoryProps {
  open: boolean;
  onCancel: () => void;
}

interface FormValues {
  name: string;
}

export const CreateCategory: React.FC<CreateCategoryProps> = (props) => {
  const { open, onCancel } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation([], { keyPrefix: "category.createCategory" });

  const onFinish = async (values: FormValues) => {
    const categoryCollectionRef = collection(db, COLLECTIONS.CATEGORIES);
    await addDoc(categoryCollectionRef, {
      name: values.name,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    form.resetFields();
    onCancel();
    message.success(t("addedSuccessfully"));
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
            name="name"
            label={t("labelName")}
            rules={[{ required: true, message: t("msgName") }]}
          >
            <Input inputMode={"none"} placeholder={t("hintName")} />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};
