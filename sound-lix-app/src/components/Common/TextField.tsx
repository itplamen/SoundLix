import { ChangeEventHandler, useEffect, useState } from "react";
import Message from "./Message";
import Icon from "../Icons/Icon";
import { COLOR } from "@/utils/constants";
import ShowPasswordType from "../Icons/Types/ShowPasswordType";
import HidePasswordType from "../Icons/Types/HidePasswordType";

type Props = {
  type: "email" | "password" | "text";
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  msgText?: string;
  validate?: () => boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const TextField = ({
  type,
  name,
  label,
  value,
  placeholder = "",
  msgText = "",
  validate,
  onChange,
}: Props) => {
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isValid && validate && value) {
      setIsValid(validate());
    }
  }, [value, validate]);

  const handleBlur = () => {
    if (validate) {
      setIsValid(validate());
    }
  };

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full relative">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200 select-none"
      >
        {label}
      </label>
      <input
        type={inputType}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        className={`w-full pr-10 rounded-lg ${
          isValid
            ? "p-2.5"
            : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <Icon size={6} color={COLOR.DARK_GRAY} fill={false}>
            {showPassword ? <ShowPasswordType /> : <HidePasswordType />}
          </Icon>
        </button>
      )}
      {msgText && (
        <p className="text-sm mt-1 text-red-600 dark:text-red-400">
          <Message
            text={msgText}
            type={isValid && value ? "Warning" : "Danger"}
          />
        </p>
      )}
    </div>
  );
};

export default TextField;
