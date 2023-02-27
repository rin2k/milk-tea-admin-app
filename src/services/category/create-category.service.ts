import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export interface IInputCreateCategoryService {
  name: string;
}

export const CreateCategoryService = async (
  input: IInputCreateCategoryService,
  onSuccess: () => void
) => {
  const collectionRef = collection(db, COLLECTIONS.CATEGORIES);
  await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      onSuccess();
    })
    .catch(() => {});
};
