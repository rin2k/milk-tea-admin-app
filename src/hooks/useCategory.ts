import { addCategories } from "@redux";
import { GetCategoriesService } from "@services";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = GetCategoriesService((data) => {
      dispatch(addCategories(data));
    });
    return () => unsubscribe();
  }, []);
};
