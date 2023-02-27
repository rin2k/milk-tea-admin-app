import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export interface IInputEditProductService {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export const EditProductService = (
  id: string,
  input: IInputEditProductService,
  onSuccess: () => void
) => {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
  updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {});
};
