import { ChangeEvent, createContext } from "react";

export interface TransactionContextProps {
  getEthereumContract: () => void;
  ethereum: any;
  currentAccount: any;
  connectWallet: () => void;
  checkIfWalletConnected: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  form: { [key: string]: string };
  sendTransaction: () => void;
  isLoading: boolean;
  transactions: any[];
}

export const TransactionContext = createContext<TransactionContextProps>({
  ethereum: {},
  getEthereumContract: () => {},
  currentAccount: null,
  connectWallet: () => {},
  checkIfWalletConnected: () => {},
  handleChange: () => {},
  form: {},
  sendTransaction: () => {},
  isLoading: false,
  transactions: [],
});
