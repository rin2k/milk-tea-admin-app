import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IOrderProducts, OrderStatus } from "@types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export interface IInputCreateOrderService {
  uid: string;
  phone: string;
  address: string;
  totalCost: number;
  status: keyof typeof OrderStatus;
  orderProduct: Array<IOrderProducts>;
}

export const CreateOrderService = async (
  input: IInputCreateOrderService,
  onSuccess: () => void
) => {
  const collectionRef = collection(db, COLLECTIONS.ORDERS);
  await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then((data) => {
      const docRef = doc(db, COLLECTIONS.ORDERS, data.id);
      try {
        updateDoc(docRef, {
          id: data.id,
        })
          .then(() => {
            onSuccess();
          })
          .catch((error) => {});
      } catch (error) {}
    })
    .catch(() => {});
};
