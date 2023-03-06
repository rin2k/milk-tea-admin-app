import "@config";
import { RootState } from "@redux";
import { ConfigProvider } from "antd";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DefaultLayout } from "./layouts/components/default-layout";
import { routes } from "./routes/routes";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authAdmin.isAuthenticated
  );

  // const router2 = createBrowserRouter([
  //   {
  //     path: pages.dashboard,
  //     element: <DefaultLayout children={undefined} />,
  //     children: [
  //       { index: true, element: <Home /> },
  //       {
  //         path: pages.order,
  //         element: <OrderPage />,

  //         // children: [
  //         //   {
  //         //     path: "/id",
  //         //     element: <h1>nou2s</h1>,
  //         //   },
  //         // ],
  //       },
  //       {
  //         path: "user",
  //         element: <UserPage />,
  //       },
  //     ],
  //   },
  //   {
  //     path: pages.login,
  //     element: <Login />,
  //   },
  //   {
  //     path: pages.not_found,
  //     element: <NotFoundPage />,
  //   },
  // ]);

  return (
    <>
      {/* <RouterProvider router={router2} /> */}
      <ConfigProvider>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.component || Fragment;
            let Layout = route.layout === null ? Fragment : DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
