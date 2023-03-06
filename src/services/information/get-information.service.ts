import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IInformation } from "@types";
import { doc, getDoc } from "firebase/firestore";

export const GetInformationService = async (
  uid: string,
  onSuccess: (data: IInformation) => void
) => {
  const docRef = doc(db, COLLECTIONS.ADMIN, uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newData: any = { ...docSnap.data() };
      onSuccess(newData);
    } else {
      // Document does not exist
    }
  } catch (error) {}
};
