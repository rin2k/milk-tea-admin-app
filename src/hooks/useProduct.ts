import { addProduct } from "@redux";
import { GetProductsService } from "@services";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = GetProductsService({}, (data) => {
      dispatch(addProduct(data));
    });
    return () => unsubscribe();
  }, []);
};
