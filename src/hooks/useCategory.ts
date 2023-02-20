import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { addCategories } from "@redux";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const q = query(
      collection(db, COLLECTIONS.CATEGORIES),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(addCategories(newData));
    });
    return () => unsubscribe();
  }, []);
};
