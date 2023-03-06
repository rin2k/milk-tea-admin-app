import { ChangeEmailService } from "@services";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { pages } from "@constants";
import i18next from "i18next";

interface FormValues {
  email: string;
  newEmail: string;
  confirmNewEmail: string;
  password: string;
}

export const ChangeEmailPage: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation([], { keyPrefix: "changeEmailPage" });
  const navigate = useNavigate();
  const onFinish = async (values: FormValues) => {
    ChangeEmailService(values.email, values.password, values.newEmail, () => {
      message.info(t("emailChanged"));
    });
  };

  const onForgotPassword = () => {
    navigate(pages.reset_password);
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete={"off"}
        onFinish={onFinish}
      >
        <Form.Item
          name={"email"}
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
          name={"newEmail"}
          label={t("labelNewEmail")}
          rules={[
            {
              type: "email",
              message: t("validEmail"),
            },
            {
              required: true,
              message: t("msgNewEmail"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"confirmNewEmail"}
          label={t("labelConfirmNewEmail")}
          dependencies={["newEmail"]}
          rules={[
            {
              type: "email",
              message: t("validEmail"),
            },
            {
              required: true,
              message: t("msgConfirmNewEmail"),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newEmail") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t("emailNotMatch"));
              },
            }),
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          name={"password"}
          label={t("labelPass")}
          rules={[{ required: true, message: t("msgPass") }]}
        >
          <Input.Password
            placeholder={t("hintPass")}
            autoComplete="new-password"
          />
        </Form.Item>
        <Button
          type={"primary"}
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
