import { CreateCategoryService } from "@services";
import { Form, Input, message, Modal } from "antd";
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
    CreateCategoryService({ name: values.name }, () => {
      form.resetFields();
      onCancel();
      message.success(t("addedSuccessfully"));
    });
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
          name="name"
          label={t("labelName")}
          rules={[{ required: true, message: t("msgName") }]}
        >
          <Input inputMode={"none"} placeholder={t("hintName")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
