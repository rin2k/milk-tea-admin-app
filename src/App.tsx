import "@config";
import { RootState } from "@redux";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DefaultLayout } from "./layouts/components/default-layout";
import { routes } from "./routes/routes";
function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <>
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
    </>
  );
}

export default App;
