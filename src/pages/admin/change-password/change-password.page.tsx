import { ChangePasswordService } from "@services";
import { Button, Form, Input, message } from "antd";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { pages } from "@constants";

interface FormValues {
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ChangePasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation([], { keyPrefix: "changePasswordPage" });
  const navigate = useNavigate();

  const onFinish = (values: FormValues) => {
    ChangePasswordService(
      values.email,
      values.password,
      values.newPassword,
      () => {
        message.success(t("passwordChanged"));
      }
    );
  };

  const onForgotPassword = () => {
    navigate(pages.reset_password);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label={t("labelEmail")}
          rules={[
            {
              type: "email",
              message: t("validEmail"),
            },
            {
              required: true,
              message: t("msgEmail"),
            },
          ]}
        >
          <Input placeholder={t("hintEmail")} />
        </Form.Item>
        <Form.Item
          name="password"
          label={t("labelPassword")}
          rules={[
            {
              required: true,
              message: t("msgPassword"),
            },
          ]}
        >
          <Input.Password placeholder={t("hintPassword")} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={t("labelNewPassword")}
          rules={[
            {
              required: true,
              message: t("msgNewPassword"),
            },
          ]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder={t("hintNewPassword")}
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label={t("labelConfirmNewPassword")}
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: t("msgConfirmNewPassword"),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t("passwordNotMatch"));
              },
            }),
          ]}
        >
          <Input.Password placeholder={t("hintConfirmNewPassword")} />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          {t("save")}
        </Button>
      </Form>

      <Button style={{ padding: 0 }} type="link" onClick={onForgotPassword}>
        {i18next.t("forgotPassword")}
      </Button>
    </>
  );
};
