import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { UserStatus } from "@types";

export interface IInputEditUserService {
  fullname?: string;
  addresses?: Array<{
    name: string;
    address: string;
    phone: string;
  }>;
  status?: keyof typeof UserStatus;
}

export const EditUserService = (
  id: string,
  input: IInputEditUserService,
  onSuccess: () => void
) => {
  const docRef = doc(db, COLLECTIONS.USERS, id);
  updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {});
};
