import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { UserStatus } from "@types";
import { message } from "antd";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import i18next from "i18next";

const auth = getAuth();

export const CreateUserService = (
  email: string,
  password: string,
  input: {
    fullname: string;
    email: string;
    addresses: Array<{
      name: string;
      address: string;
      phone: string;
    }>;
  },
  onSuccess: () => void
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const docRef = doc(db, COLLECTIONS.USERS, userCredential.user.uid);
      setDoc(docRef, {
        ...input,
        createdAt: Timestamp.now(),
        updatedAt: serverTimestamp(),
        status: UserStatus.ACTIVE,
      })
        .then(() => {
          onSuccess();
        })
        .catch((error) => {});
    })
    .catch((error) => {
      message.error(i18next.t(error.code));
    });
};
