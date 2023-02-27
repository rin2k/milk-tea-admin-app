import { PlusOutlined } from "@ant-design/icons";
import { useProduct, useUser } from "@hooks";
import { RootState } from "@redux";
import { COLORS } from "@styles";
import { formatMoney } from "@utils";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
interface CreateOrderProps {
  open: boolean;
  onCancel: () => void;
}

interface FormValues {
  category: string;
  address: string;
  phone: string;
  name: string;
  orderProducts: [
    {
      name: string;
      price: number | undefined;
      productId: string;
      quantity: number | undefined;
    }
  ];
}

const { Option } = Select;

export const CreateOrder: React.FC<CreateOrderProps> = (props) => {
  const { open, onCancel } = props;
  const { t } = useTranslation([], { keyPrefix: "orderPage.createOrder" });
  const [form] = Form.useForm();
  const users = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.product);
  useUser();
  useProduct();
  const onFinish = async (values: FormValues) => {
    alert(JSON.stringify(values.category));
  };

  const initialValues: FormValues = {
    category: "",
    address: "",
    phone: "",
    name: "",
    orderProducts: [
      {
        name: "",
        price: undefined,
        productId: "",
        quantity: undefined,
      },
    ],
  };

  const calculateCostProduct = (name: number) => {
    const priceProduct = form.getFieldValue(["orderProducts", name, "price"]);
    const quantity = form.getFieldValue(["orderProducts", name, "quantity"]);
    return formatMoney(Number(priceProduct * quantity));
  };

  const maxQuantity = (name: number) => {
    let input = form.getFieldValue(["orderProducts", name, "name"]);
    let findProduct = products.find((item) => item.id == input);
    return findProduct?.quantity;
  };

  const calculateTotalCost = () => {
    let total = 0;
    const data = form.getFieldValue("orderProducts");
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element == null) return;
      total += element?.price * element?.quantity;
    }
    return total;
  };

  const [valuesForm, setValuesForm] = useState({});
  const [cout, setCout] = useState(1);

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
        onValuesChange={(v) => setValuesForm(v)}
      >
        <Form.Item
          name="category"
          label={t("lableUser")}
          rules={[{ required: true, message: t("msgUser") }]}
        >
          <Select placeholder={t("hintUser")}>
            {users.map((user) => {
              return <Option value={user?.id}>{user?.fullname}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label={t("labelName")}
          rules={[{ required: true, message: t("msgName") }]}
        >
          <Input placeholder={t("hintName")} />
        </Form.Item>
        <Form.Item
          name="address"
          label={t("labelAddress")}
          rules={[{ required: true, message: t("msgAddress") }]}
        >
          <Input placeholder={t("hintAddress")} />
        </Form.Item>
        <Form.Item
          name="address"
          label={t("labelPhone")}
          rules={[{ required: true, message: t("msgPhone") }]}
        >
          <Input placeholder={t("hintPhone")} />
        </Form.Item>

        <Form.List name="orderProducts">
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
                    label={t("orderProducts.labelName")}
                    name={[name, "name"]}
                    rules={[
                      { required: true, message: t("orderProducts.msgName") },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value) {
                            const values: string[] =
                              getFieldValue("orderProducts");
                            const valuesTmp = [...values];
                            const idx = valuesTmp.findIndex((e) => e === value);
                            valuesTmp.splice(idx, 1);
                            return valuesTmp.find(
                              (item: any) => item.name === value
                            )
                              ? Promise.reject("It's duplicated")
                              : Promise.resolve();
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Select
                      placeholder={t("orderProducts.hintName")}
                      onChange={(value) => {
                        let findProduct = products.find(
                          (item) => item.id == value
                        );
                        form.setFieldValue(
                          ["orderProducts", name, "price"],
                          findProduct?.price
                        );
                      }}
                    >
                      {products.map((item) => {
                        return (
                          <Option value={item?.id}>
                            {item?.name + "  (" + item.price + ")"}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    hidden
                    {...restField}
                    label={"price"}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label={
                      t("orderProducts.labelQuantity") +
                      " (" +
                      maxQuantity(name) +
                      " " +
                      t("available") +
                      ")"
                    }
                    name={[name, "quantity"]}
                    rules={[
                      {
                        validator(rule, value) {
                          return new Promise((resolve, reject) => {
                            let maxValue: number = maxQuantity(name) || 1;
                            if (value > maxValue) {
                              reject("qua lon");
                            } else {
                              resolve("");
                            }
                          });
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      type={"number"}
                      placeholder={t("orderProducts.hintQuantity")}
                    />
                  </Form.Item>

                  <span>Tạm tính : {calculateCostProduct(name)}</span>

                  {form.getFieldValue("orderProducts").length !== 1 && (
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
              <span>Tổng tính: {formatMoney(calculateTotalCost())}</span>
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

              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  Create Series
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
