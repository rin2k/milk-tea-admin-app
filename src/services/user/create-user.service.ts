import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { message } from "antd";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import i18next from "i18next";

const auth = getAuth();

export interface IInputCreateUserService {
  fullname: string;
  email: string;
  addresses: Array<{
    name: string;
    address: string;
    phone: string;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const CreateUserService = (
  email: string,
  password: string,
  input: IInputCreateUserService,
  onSuccess: () => void
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const docRef = doc(db, COLLECTIONS.USERS, userCredential.user.uid);
      setDoc(docRef, input)
        .then(() => {
          onSuccess();
        })
        .catch((error) => {});
    })
    .catch((error) => {
      message.error(i18next.t(error.code));
    });
};
