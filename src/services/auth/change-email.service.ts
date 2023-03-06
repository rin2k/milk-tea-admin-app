import { message } from "antd";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import i18next from "i18next";

const auth = getAuth();

export const ChangeEmailService = (
  email: string,
  password: string,
  newEmail: string,
  onSuccess: () => void
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      let user = userCredential.user;
      updateEmail(user, newEmail)
        .then(() => {
          onSuccess();
        })
        .catch(() => {});
    })
    .catch((error) => {
      message.error(i18next.t(error.code));
    });
};
