import { ChangeEventHandler, useEffect, useState } from "react";
import Message from "./Message";

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

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200 select-none"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        className={`w-full rounded-lg ${
          isValid
            ? ""
            : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        }`}
      />
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
