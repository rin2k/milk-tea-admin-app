import { useEffect, useState } from "react";

import { Button, Form, Input } from "antd";
import * as yup from "yup";
export const TestPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const [maxVl, setMaxVl] = useState(4);
  const [form] = Form.useForm();
  useEffect(() => {
    const interval = setInterval(() => {
      setMaxVl(maxVl + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [maxVl]);

  let schema = yup.object().shape({
    age: yup.number().is(),
  });

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  return (
    <Form form={form} name="form1">
      <Form.Item name="age" label="Name" rules={[yupSync]}>
        <Input placeholder="Please input your name" />
      </Form.Item>
      <span>{maxVl}</span>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
