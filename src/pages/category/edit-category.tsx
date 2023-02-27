import { EditCategoryService } from "@services";
import { Col, Form, FormInstance, Input, message, Modal } from "antd";
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
    EditCategoryService(
      values.id,
      {
        name: values.name,
      },
      () => {
        form.resetFields();
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
      <Form
        form={form}
        layout="vertical"
        autoComplete={"off"}
        onFinish={onFinish}
      >
        <Form.Item
          name="id"
          label={t("labelId")}
          rules={[{ required: true, message: t("msgName") }]}
        >
          <Input disabled placeholder={t("hintName")} />
        </Form.Item>
        <Form.Item
          name="name"
          label={t("labelName")}
          rules={[{ required: true, message: t("msgName") }]}
        >
          <Input placeholder={t("hintName")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
