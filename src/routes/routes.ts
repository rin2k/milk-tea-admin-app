import { pages } from "@constants";
import {
  CategoryPage,
  Home,
  InformationPage,
  OrderPage,
  ProductPage,
  UserPage,
} from "@pages";

import { Login } from "../pages/login/login";
import { TestPage } from "../pages/Test";

export const routes = [
  { path: pages.dashboard, component: Home },
  { path: pages.user, component: UserPage },
  { path: pages.banner, component: TestPage },
  { path: pages.product, component: ProductPage },
  { path: pages.category, component: CategoryPage },
  { path: pages.order, component: OrderPage },
  { path: pages.information, component: InformationPage },
  // Authen
  { path: pages.login, component: Login, layout: null },
];
