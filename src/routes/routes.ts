import { pages } from "@constants";
import {
  CategoryPage,
  ChangeEmailPage,
  ChangePasswordPage,
  Home,
  InformationPage,
  NotFoundPage,
  OrderPage,
  ProductPage,
  ResetPasswordPage,
  UserPage,
} from "@pages";

import { Login } from "../pages/admin/login/login";

export const routes = [
  { path: pages.dashboard, component: Home },
  { path: pages.user, component: UserPage },
  { path: pages.product, component: ProductPage },
  { path: pages.category, component: CategoryPage },
  { path: pages.order, component: OrderPage },
  { path: pages.information, component: InformationPage },
  { path: pages.change_email, component: ChangeEmailPage },
  { path: pages.change_password, component: ChangePasswordPage },
  //
  { path: pages.login, component: Login, layout: null },
  { path: pages.reset_password, component: ResetPasswordPage, layout: null },
  { path: pages.not_found, component: NotFoundPage, layout: null },
];
