import { useContext } from "react";
import {
  TransactionContextProps,
  TransactionContext,
} from "../context/transaction.context";

const useTransactionContext = () => {
  return useContext<TransactionContextProps>(TransactionContext);
};

export default useTransactionContext;
