import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface CreateButtonProps {
  onClick: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const { onClick } = props;
  const { t } = useTranslation();

  return (
    <Button
      type={"primary"}
      onClick={onClick}
      icon={<PlusOutlined />}
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      {t("create")}
    </Button>
  );
};
