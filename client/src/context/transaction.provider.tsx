import { useEffect, useState, FC, ChangeEvent } from "react";
import { ethers } from "ethers";
import { transactionAbi, transactionAddress } from "../utils/transaction";

import {
  TransactionContextProps,
  TransactionContext,
} from "./transaction.context";
import type { PropsWithChildren } from "../models";

interface TransactionProviderProps extends PropsWithChildren {}

export interface FormValue {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    transactionAddress,
    transactionAbi,
    signer
  );

  return transactionContract;
};

const TransactionProvider: FC<TransactionProviderProps> = (props) => {
  const { children } = props;
  const [currentAccount, setCurrentAccount] = useState<null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState<number>(
    +(localStorage.getItem("transactionCount") || 0)
  );

  const [form, setForm] = useState<FormValue>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please  install metamask");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const transactions = await getAllTransactions();

        setTransactions(transactions);
      } else {
        console.log("No accounts found");
      }
      console.log(accounts);
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please  install metamask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const transActionContract = getEthereumContract();
      const availableTransactions =
        await transActionContract.getAllTransactions();

      const correctTransactions = availableTransactions.map(
        (transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,

          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      return correctTransactions;
    } catch (error) {
      console.log(error);
    }
  };
  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Please  install metamask");
      }

      const { addressTo, amount, keyword, message } = form;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      console.log(addressTo, currentAccount);

      setLoading(true);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      console.log("Loading - " + transactionHash.hash);
      await transactionHash.wait();

      setLoading(false);
      console.log("Transaction loaded");

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(Number(transactionCount));
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfTransactionExists = async () => {
    try {
      const transactionContract = getEthereumContract();
      const numberOfTransactions =
        await transactionContract.getTransactionsCount();

      window.localStorage.setItem("numberOfTransactions", numberOfTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionExists();
  }, []);

  const contextValue: TransactionContextProps = {
    ethereum,
    getEthereumContract,
    checkIfWalletConnected,
    sendTransaction,
    isLoading,
    transactions,
    connectWallet,
    currentAccount,
    handleChange,
    form: form as any,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
