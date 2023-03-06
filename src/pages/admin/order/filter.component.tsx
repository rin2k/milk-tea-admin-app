import { Button, Col, DatePicker, Form, FormInstance, Row } from "antd";
import Search from "antd/es/input/Search";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;

interface FilterProps {
  form: FormInstance;
  onChange: (values: FormValues) => void;
}

interface FormValues {
  id?: string;
  uid?: string;
  date?: any;
}

const colProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const twoColProps = {
  ...colProps,
  xl: 96,
};

export const Filter: React.FC<FilterProps> = (props) => {
  const { form, onChange } = props;
  const { t } = useTranslation([], { keyPrefix: "orderPage.filter" });
  const initialValues: FormValues = {
    id: undefined,
    uid: undefined,
    date: undefined,
  };

  const onReset = () => {
    form.resetFields();
    form.submit();
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      onFinish={(values) => {
        onChange(values);
      }}
    >
      <Row gutter={24}>
        <Col {...colProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item name="id">
            <Search placeholder={t("orderId")} />
          </Form.Item>
        </Col>
        <Col {...colProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item name="uid">
            <Search placeholder={t("uid")} />
          </Form.Item>
        </Col>

        <Col {...colProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <Form.Item name="date">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col
          {...twoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="margin-right"
                style={{ marginRight: 10 }}
              >
                {t("search")}
              </Button>
              <Button onClick={onReset}> {t("reset")}</Button>
            </div>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
