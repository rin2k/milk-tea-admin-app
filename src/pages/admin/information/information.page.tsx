import { RootState } from "@redux";
import { GetInformationService } from "@services";
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { EditInformationService } from "@services";

interface FormValues {
  phone: string;
  address: string;
}
export const InformationPage: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation([], { keyPrefix: "informationPage" });
  const uid = useSelector((state: RootState) => state.authAdmin.id);

  const onFinish = (values: FormValues) => {
    EditInformationService(
      uid,
      {
        phone: values.phone,
        address: values.address,
      },
      () => {
        message.success(t("updatedSuccessfully"));
      }
    );
  };

  useEffect(() => {}, [
    GetInformationService(uid, (data) => {
      form.setFieldValue("phone", data.phone);
      form.setFieldValue("address", data.address);
    }),
  ]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete={"off"}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          label={t("labelPhone")}
          rules={[{ required: true, message: t("msgPhone") }]}
        >
          <Input inputMode={"none"} placeholder={t("hintPhone")} />
        </Form.Item>
        <Form.Item
          name="address"
          label={t("labelAddress")}
          rules={[{ required: true, message: t("msgAddress") }]}
        >
          <Input.TextArea inputMode={"none"} placeholder={t("hintAddress")} />
        </Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          {t("save")}
        </Button>
      </Form>
    </>
  );
};
