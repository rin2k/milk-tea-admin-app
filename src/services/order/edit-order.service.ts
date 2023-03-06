import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { OrderStatus } from "@types";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const EditOrderService = (
  id: string,
  status: keyof typeof OrderStatus,
  onSuccess: () => void
) => {
  const docRef = doc(db, COLLECTIONS.ORDERS, id);
  try {
    updateDoc(docRef, {
      status: status,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        onSuccess();
      })
      .catch((error) => {});
  } catch (error) {}
};
