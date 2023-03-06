import { pages } from "@constants";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "notFoundPage" });
  const navigate = useNavigate();
  const onBackHome = () => {
    navigate(pages.dashboard);
  };
  return (
    <div style={containerStyle}>
      <Result
        status="404"
        title="404"
        subTitle={t("sorry")}
        extra={
          <Button type="primary" onClick={onBackHome}>
            {t("backHome")}
          </Button>
        }
      />
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
