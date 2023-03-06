import { ResetPasswordService } from "@services";
import { Button, Card, Col, Form, Input, message, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
const { Title } = Typography;

interface FormValues {
  email: string;
}

export const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "resetPasswordPage" });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values: FormValues) => {
    // ResetPasswordService(values.email, () => {
    //   message.success(t("checkEmail"));
    // });
    navigate(-1);
  };

  return (
    <div style={containerStyle}>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ textAlign: "center" }}>
          <Typography style={{ alignSelf: "center" }}>
            <Title level={4}>{t("title")}</Title>
          </Typography>
          <Typography style={{ marginBottom: 10 }}>{t("subTitle")}</Typography>
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete={"off"}
            layout={"vertical"}
          >
            <Form.Item
              name="email"
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
              <Input placeholder={t("hintEmail")}></Input>
            </Form.Item>
            <Button htmlType={"submit"} type={"primary"}>
              {t("submit")}
            </Button>
          </Form>
        </Card>
      </Col>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "mediumslateblue",
};
