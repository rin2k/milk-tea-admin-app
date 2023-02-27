import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IProduct } from "@types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const GetProductsService = (
  onSuccess: (data: Array<IProduct>) => void
) => {
  const docRef = collection(db, COLLECTIONS.PRODUCTS);
  const q = query(docRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
