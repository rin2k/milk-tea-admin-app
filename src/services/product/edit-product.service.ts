import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { ProductStatus } from "@types";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const EditProductService = (
  id: string,
  input: {
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    status: keyof typeof ProductStatus;
  },
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
