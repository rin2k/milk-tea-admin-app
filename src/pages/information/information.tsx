import { Button, Col, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { KeyOutlined } from "@ant-design/icons";

interface InformationProps {}
export const InformationPage: React.FC<InformationProps> = (props) => {
  const { t } = useTranslation([], { keyPrefix: "informationPage" });
  return (
    <>
      <Button
        type="primary"
        onClick={() => {}}
        icon={<KeyOutlined />}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {t("changePassword")}
      </Button>
      <Form layout="vertical" style={{ marginTop: 10 }} autoComplete={"off"}>
        <Form.Item
          name={"phone"}
          label={t("labelPhone")}
          rules={[{ required: true, message: t("msgPhone") }]}
        >
          <Input placeholder={t("hintPhone")} />
        </Form.Item>
        <Form.Item
          name={"email"}
          label={t("labelEmail")}
          rules={[{ required: true, message: t("msgEmail") }]}
        >
          <Input placeholder={t("hintEmail")} />
        </Form.Item>
        <Form.Item
          name={"email"}
          label={t("labelAddress")}
          rules={[{ required: true, message: t("msgAddress") }]}
        >
          <Input placeholder={t("hintAddress")} />
        </Form.Item>
      </Form>
      <Button type={"primary"}> Save </Button>
    </>
  );
};
