import { pages } from "../constants/pages";
import { CategoryPage, Home, ProductPage } from "../pages";
import Login from "../pages/login/login";

export const routes = [
  { path: pages.dashboard, component: Home },
  { path: pages.banner, component: null },
  { path: pages.user, component: null },
  { path: pages.product, component: ProductPage },
  { path: pages.category, component: CategoryPage },
  { path: pages.order, component: null },
  { path: pages.information, component: null },
  // Authen
  { path: pages.login, component: Login, layout: null },
];
