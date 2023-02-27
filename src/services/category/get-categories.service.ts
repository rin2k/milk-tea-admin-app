import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { ICategory } from "@types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const GetCategoriesService = (
  onSuccess: (data: Array<ICategory>) => void
) => {
  const docRef = collection(db, COLLECTIONS.CATEGORIES);
  const q = query(docRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
