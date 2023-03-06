import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IUser } from "@types";
import { doc, getDoc } from "firebase/firestore";

export const GetUserService = async (
  docId: string,
  onSuccess: (data: IUser) => void
) => {
  const docRef = doc(db, COLLECTIONS.USERS, docId);
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
