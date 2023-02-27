import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IUser } from "@types";

export const GetUsersService = (onSuccess: (data: Array<IUser>) => void) => {
  const docRef = collection(db, COLLECTIONS.USERS);
  const q = query(docRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
