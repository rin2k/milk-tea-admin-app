import { message } from "antd";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import i18next from "i18next";

const auth = getAuth();

export const ResetPasswordService = (email: string, onSuccess: () => void) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      message.error(i18next.t(error.code));
    });
};
