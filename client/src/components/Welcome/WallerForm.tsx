import { FC, useState, FormEvent } from "react";
import { Loader } from "../";
import { Input } from "../shared/";
import { useTransactionContext } from "../../hooks";

const WallerForm: FC = (props) => {
  const {
    checkIfWalletConnected,
    isLoading,
    form,
    handleChange,
    sendTransaction,
  } = useTransactionContext();

  const handleSubmit = (e: FormEvent) => {
    const { addressTo, amount, keyword, message } = form;

    e.preventDefault();

    if (!addressTo || !keyword || !message || !amount) return;

    sendTransaction();
  };

  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
      <Input
        placeholder="Address To"
        name="addressTo"
        type="text"
        handleChange={handleChange}
        value={form.addressTo}
      />
      <Input
        placeholder="Amount (ETH)"
        name="amount"
        type="number"
        handleChange={handleChange}
        value={form.amount}
      />
      <Input
        placeholder="Keyword (Gif)"
        name="keyword"
        type="text"
        handleChange={handleChange}
        value={form.keyword}
      />
      <Input
        placeholder="Enter Message"
        name="message"
        type="text"
        handleChange={handleChange}
        value={form.message}
      />

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {isLoading ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
        >
          Send now
        </button>
      )}
    </div>
  );
};

export default WallerForm;
