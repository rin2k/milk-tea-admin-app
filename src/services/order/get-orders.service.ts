import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IOrder, OrderStatus } from "@types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import moment from "moment";

export const GetOrdersService = (
  filters: {
    status?: keyof typeof OrderStatus;
    id?: string;
    uid?: string;
    createdAt?: {
      start?: Date;
      end?: Date;
    };
  },
  onSuccess: (data: Array<IOrder>) => void
) => {
  const docRef = collection(db, COLLECTIONS.ORDERS);

  const queryArgs = [];
  const startDay = moment(new Date(filters.createdAt?.start as Date)).format(
    "YYYY-MM-DD 00:00:01"
  );
  const endDay = moment(new Date(filters.createdAt?.end as Date)).format(
    "YYYY-MM-DD 23:59:59"
  );

  const whereStatus = where("status", "==", filters.status);
  const whereDocumentId = where("id", "==", filters.id);
  const whereUid = where("uid", "==", filters.uid);
  const whereStartTime = where(
    "createdAt",
    ">",
    Timestamp.fromDate(new Date(startDay))
  );
  const whereEndTime = where(
    "createdAt",
    "<",
    Timestamp.fromDate(new Date(endDay))
  );

  //

  if (filters?.status) {
    queryArgs.push(whereStatus);
  }
  if (filters?.uid && filters?.uid.trim().length !== 0) {
    queryArgs.push(whereUid);
  }
  if (filters?.createdAt?.start) {
    queryArgs.push(whereStartTime);
  }
  if (filters?.createdAt?.end) {
    queryArgs.push(whereEndTime);
  }
  if (filters?.id && filters?.id.trim().length !== 0) {
    queryArgs.push(whereDocumentId);
  }

  // query
  const q = query(docRef, ...queryArgs, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const newData: any = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
