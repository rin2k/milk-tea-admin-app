import { PlusOutlined } from "@ant-design/icons";
import { CreateUserService } from "@services";
import { COLORS } from "@styles";
import { Button, Form, Input, message, Modal } from "antd";
import { Timestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

interface CreateUserProps {
  open: boolean;
  onCancel: () => void;
}

interface FormValues {
  fullname: string;
  email: string;
  password: string;
  addresses: [
    {
      name: string;
      address: string;
      phone: string;
    }
  ];
}

export const CreateUser: React.FC<CreateUserProps> = (props) => {
  const { open, onCancel } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation([], { keyPrefix: "userPage.createUser" });

  const initialValues: FormValues = {
    fullname: "",
    email: "",
    password: "",
    addresses: [
      {
        name: "",
        address: "",
        phone: "",
      },
    ],
  };

  const onFinish = async (values: FormValues) => {
    CreateUserService(
      values.email,
      values.password,
      {
        fullname: values.fullname,
        email: values.email,
        addresses: values.addresses,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      () => {
        form.resetFields();
        onCancel();
        message.success("addedSuccessfully");
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
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.Item
          name="fullname"
          label={t("labelFullname")}
          rules={[{ required: true, message: t("msgFullname") }]}
        >
          <Input placeholder={t("hintFullname")} />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("labelEmail")}
          rules={[
            {
              type: "email",
              message: t("validEmail"),
            },
            { required: true, message: t("msgEmail") },
          ]}
        >
          <Input placeholder={t("hintEmail")} />
        </Form.Item>
        <Form.Item
          name="password"
          label={t("labelPassword")}
          rules={[{ required: true, message: t("msgPassword") }]}
        >
          <Input placeholder={t("hintPassword")} />
        </Form.Item>
        <Form.List name="addresses">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  style={{
                    backgroundColor: `${COLORS.green}30`,
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                >
                  <Form.Item
                    {...restField}
                    label={t("addresses.labelName")}
                    name={[name, "name"]}
                    rules={[
                      { required: true, message: t("addresses.msgName") },
                    ]}
                  >
                    <Input placeholder={t("addresses.hintName")} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label={t("addresses.labelAddress")}
                    name={[name, "address"]}
                    rules={[
                      { required: true, message: t("addresses.msgAddress") },
                    ]}
                  >
                    <Input placeholder={t("addresses.hintAddress")} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label={t("addresses.labelPhone")}
                    name={[name, "phone"]}
                    rules={[
                      { required: true, message: t("addresses.msgPhone") },
                    ]}
                  >
                    <Input placeholder={t("addresses.hintPhone")} />
                  </Form.Item>
                  {form.getFieldValue("addresses").length !== 1 && (
                    <Button
                      type={"link"}
                      onClick={() => {
                        remove(name);
                      }}
                      block
                    >
                      {t("deleteField")}
                    </Button>
                  )}
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t("addFiled")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
