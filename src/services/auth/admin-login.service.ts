import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IAdmin } from "@types";
import { message } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import i18next from "i18next";

const auth = getAuth();

export const AdminLoginService = (
  email: string,
  password: string,
  onSuccess: (data: IAdmin) => void
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userId = userCredential.user.uid;
      const docRef = doc(db, COLLECTIONS.ADMIN, userId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const newData: any = {
            id: userCredential.user.uid,
            ...docSnap.data(),
          };
          onSuccess(newData);
        } else {
          // Document does not exist
        }
      } catch (error) {}
    })
    .catch((error) => {
      message.error(i18next.t(error.code));
    });
};
