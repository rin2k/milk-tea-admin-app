import { message } from "antd";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import i18next from "i18next";

const auth = getAuth();

export const ChangePasswordService = (
  email: string,
  oldPassword: string,
  newPassword: string,
  onSuccess: () => void
) => {
  signInWithEmailAndPassword(auth, email, oldPassword)
    .then(async (userCredential) => {
      let user = userCredential.user;
      updatePassword(user, newPassword)
        .then(() => {
          onSuccess();
        })
        .catch(() => {});
    })
    .catch((error) => {
      message.error(i18next.t(error.code));
    });
};
