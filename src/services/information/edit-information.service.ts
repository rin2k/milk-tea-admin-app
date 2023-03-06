import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

interface IInputEditInformationService {
  phone: string;
  address: string;
}

export const EditInformationService = async (
  uid: string,
  input: IInputEditInformationService,
  onSuccess: () => void
) => {
  const docRef = doc(db, COLLECTIONS.ADMIN, uid);
  updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {});
};
