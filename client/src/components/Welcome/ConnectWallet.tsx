import { AiFillPlayCircle } from "react-icons/ai";
import { FC } from "react";

interface ConnectWalletProps {
  onClick: () => void;
  currentAccount: any;
}

const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const { onClick, currentAccount } = props;
  return (
    <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
        Send Crypto <br /> across the world
      </h1>
      <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
        Explore the crypto world. Buy and sell cryptocurrencies easily on
        Krypto.
      </p>
      {!currentAccount && (
        <button type="button" onClick={onClick} className="button_blue w-full">
          <AiFillPlayCircle className="text-white mr-2" />
          <p className="text-white text-base font-semibold">Connect Wallet</p>
        </button>
      )}

      <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
        <div className={`rounded-tl-2xl cell_item_style`}>Reliability</div>
        <div className={"cell_item_style"}>Security</div>
        <div className={`sm:rounded-tr-2xl cell_item_style`}>Ethereum</div>
        <div className={`sm:rounded-bl-2xl cell_item_style`}>Web 3.0</div>
        <div className={"cell_item_style"}>Low Fees</div>
        <div className={`rounded-br-2xl cell_item_style`}>Blockchain</div>
      </div>
    </div>
  );
};

export default ConnectWallet;
