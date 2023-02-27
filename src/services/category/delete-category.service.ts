import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteCategoryService = (id: string, onSuccess: () => void) => {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
  deleteDoc(docRef)
    .then(() => {
      onSuccess();
    })
    .catch(() => {});
};
