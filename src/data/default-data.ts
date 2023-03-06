import { OrderStatus, ProductStatus, UserStatus } from "@types";
import i18next from "i18next";

const orderStatusData = [
  {
    key: OrderStatus.PENDING,
    name: i18next.t("orderStatus.pending"),
  },
  {
    key: OrderStatus.SHIPPING,
    name: i18next.t("orderStatus.shipping"),
  },
  {
    key: OrderStatus.COMPLETED,
    name: i18next.t("orderStatus.completed"),
  },
  {
    key: OrderStatus.CANCELED,
    name: i18next.t("orderStatus.canceled"),
  },
];

const userStatusData = [
  {
    key: UserStatus.ACTIVE,
    name: i18next.t("userStatus.active"),
  },
  {
    key: UserStatus.BLOCKED,
    name: i18next.t("userStatus.blocked"),
  },
];

const productStatusData = [
  {
    key: ProductStatus.ENABLED,
    name: i18next.t("productStatus.enabled"),
  },
  {
    key: ProductStatus.DISABLED,
    name: i18next.t("productStatus.disabled"),
  },
];

export const DefaultData = {
  orderStatusData,
  userStatusData,
  productStatusData,
};
