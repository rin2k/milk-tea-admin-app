import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IProduct, ProductStatus } from "@types";
import {
  collection,
  documentId,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const GetProductsService = (
  filters: {
    status?: keyof typeof ProductStatus;
    id?: string;
  },
  onSuccess: (data: Array<IProduct>) => void
) => {
  const docRef = collection(db, COLLECTIONS.PRODUCTS);

  const queryArgs = [];
  const whereStatus = where("status", "==", filters.status);
  const whereDocumentId = where(documentId(), "==", filters.id);

  if (filters?.status) {
    queryArgs.push(whereStatus);
  }
  if (filters?.id) {
    queryArgs.push(whereDocumentId);
  }

  const q = query(docRef, ...queryArgs, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
