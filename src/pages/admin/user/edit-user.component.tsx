import { PlusOutlined } from "@ant-design/icons";
import { DefaultData } from "@data";
import { EditUserService } from "@services";
import { COLORS } from "@styles";
import { UserStatus } from "@types";
import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

interface EditUserProps {
  open: boolean;
  onCancel: () => void;
  form: FormInstance;
}

interface FormValues {
  id: string;
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
  status?: keyof typeof UserStatus;
}

export const EditUser: React.FC<EditUserProps> = (props) => {
  const { open, onCancel, form } = props;
  const { t } = useTranslation([], { keyPrefix: "userPage.editUser" });

  const userStatusData = DefaultData.userStatusData;

  const initialValues: FormValues = {
    id: "",
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
    EditUserService(
      values.id,
      {
        fullname: values.fullname,
        addresses: values.addresses,
        status: values.status,
      },
      () => {
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
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.Item name="id" label={t("labelId")}>
          <Input readOnly />
        </Form.Item>
        <Form.Item name="status" label={t("labelStatus")}>
          <Select>
            {userStatusData.map((item) => (
              <Option value={item?.key}>{item?.name} </Option>
            ))}
          </Select>
        </Form.Item>
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
          <Input readOnly placeholder={t("hintEmail")} />
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
