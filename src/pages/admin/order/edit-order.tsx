import { DefaultData } from "@data";
import { EditOrderService, GetOrderService, GetUserService } from "@services";
import { IOrder, IOrderProducts, IUser } from "@types";
import { formatDate } from "@utils";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  FormInstance,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./edit-order.css";
interface EditOrderProps {
  open: boolean;
  onCancel: () => void;
  form: FormInstance;
}

interface FormValues {
  id: string;
}

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const { Option } = Select;
export const EditOrder: React.FC<EditOrderProps> = (props) => {
  const { open, onCancel, form } = props;
  const { t } = useTranslation([], { keyPrefix: "orderPage.editOrder" });

  const dataStatus = DefaultData.orderStatusData;
  const [dataUser, setDataUser] = useState<IUser>();
  const [dataOrder, setDataOrder] = useState<IOrder>();
  const [dataTable, setDataTable] = useState<Array<IOrderProducts>>([]);

  useEffect(() => {
    if (open) {
      GetOrderService(form.getFieldValue("id"), (data) => {
        form.setFieldsValue({
          status: data.status,
        });
        setDataOrder(data);
        setDataTable(data.orderProduct);
        GetUserService(data.uid, (data) => {
          setDataUser(data);
        });
      });
    }
  }, [open]);

  const columns = [
    {
      title: t("productId"),
      dataIndex: "productId",
      key: "id",
    },
    {
      title: t("productName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("productPrice"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("productQuantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const onFinish = () => {
    dataOrder?.id &&
      EditOrderService(dataOrder?.id, form.getFieldValue("status"), () => {
        onCancel();
      });
  };

  return (
    <Drawer
      width={"50%"}
      open={open}
      onClose={onCancel}
      extra={
        <Space>
          <Button onClick={onCancel}>{t("cancel")}</Button>
          <Button type="primary" onClick={onFinish}>
            {t("ok")}
          </Button>
        </Space>
      }
    >
      <p className="site-description-item-profile-p">{t("personal")}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title={t("fullname")} content={dataUser?.fullname} />
        </Col>
        <Col span={12}>
          <DescriptionItem title={t("uid")} content={dataUser?.id} />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">{t("information")}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title={t("phone")} content={dataOrder?.phone} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("date")}
            content={
              dataOrder?.createdAt
                ? formatDate(dataOrder?.createdAt)
                : undefined
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("totalCost")}
            content={dataOrder?.totalCost}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title={t("address")} content={dataOrder?.address} />
        </Col>
      </Row>
      <Row></Row>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={"status"} label={"Status"}>
          <Select>
            {dataStatus.map((item) => {
              return <Option value={item?.key}>{item?.name}</Option>;
            })}
          </Select>
        </Form.Item>
      </Form>
      <Divider />
      <p className="site-description-item-profile-p">{t("orders")}</p>
      <Table dataSource={dataTable} columns={columns} />
    </Drawer>
  );
};
