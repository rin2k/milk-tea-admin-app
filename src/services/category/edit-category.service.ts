import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export interface IInputEditCategoryService {
  name: string;
}

export const EditCategoryService = (
  id: string,
  input: IInputEditCategoryService,
  onSuccess: () => void
) => {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
  updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {});
};
