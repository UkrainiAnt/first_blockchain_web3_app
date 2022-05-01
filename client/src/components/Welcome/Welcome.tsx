import { ConnectWallet, WalletForm, CreditCard } from "./";

import { useTransactionContext } from "../../hooks";

const Welcome = () => {
  const { checkIfWalletConnected, connectWallet, currentAccount } =
    useTransactionContext();

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <ConnectWallet
          currentAccount={currentAccount}
          onClick={connectWallet}
        />

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <CreditCard />

          <WalletForm />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
