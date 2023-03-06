import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { ProductStatus } from "@types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const CreateProductService = async (
  input: {
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
  },
  onSuccess: () => void
) => {
  const collectionRef = collection(db, COLLECTIONS.PRODUCTS);
  await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: ProductStatus.ENABLED,
  })
    .then(() => {
      onSuccess();
    })
    .catch(() => {});
};
