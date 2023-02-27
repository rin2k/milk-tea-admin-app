import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const auth = getAuth();

export interface IInputCreateProductService {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export const CreateProductService = async (
  input: IInputCreateProductService,
  onSuccess: () => void
) => {
  const collectionRef = collection(db, COLLECTIONS.PRODUCTS);
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
