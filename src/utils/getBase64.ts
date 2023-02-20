import { RcFile } from "antd/es/upload";
import { message } from "antd";
import i18next from "i18next";

export const getBase64 = (file: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    let maxByteUpload = 1048576;
    if (new Blob([reader.result as string]).size > maxByteUpload) {
      message.error(i18next.t("imageMustSmaller"));
    } else {
      callback(reader.result as string);
    }
  });
  reader.readAsDataURL(file);
};
