import { ChangeEvent, HTMLInputTypeAttribute, FC } from "react";

interface InputProps {
  placeholder: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
  const { handleChange, name, placeholder, type, value } = props;

  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      name={name}
      value={value}
      onChange={(e) => {
        handleChange(e), console.log("changed");
      }}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

export default Input;
