import { ColorOption, RoundedOption } from "@/utils/constants";
import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  size: { width: number; height: number };
  bgColor: ColorOption;
  hoverColor: ColorOption;
  rounded?: RoundedOption;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  children,
  size,
  bgColor,
  hoverColor,
  rounded,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-${size.width} h-${size.height} flex items-center justify-center bg-${bgColor} hover:bg-${hoverColor} ${rounded}`}
    >
      {children}
    </button>
  );
};

export default Button;
