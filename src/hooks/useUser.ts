import { addUsers } from "@redux";
import { GetUsersService } from "@services";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = GetUsersService(
      {
        status: undefined,
      },
      (data) => {
        dispatch(addUsers(data));
      }
    );
    return () => unsubscribe();
  }, []);
};
