import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IOrder } from "@types";
import { doc, getDoc } from "firebase/firestore";

export const GetOrderService = async (
  docId: string,
  onSuccess: (data: IOrder) => void
) => {
  const docRef = doc(db, COLLECTIONS.ORDERS, docId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newData: any = {
        id: docId,
        ...docSnap.data(),
      };
      onSuccess(newData);
    } else {
      // Document does not exist
    }
  } catch (error) {}
};
