import { ColorOption, RoundedOption } from "@/utils/constants";
import { Tooltip } from "flowbite-react";
import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  text: string;
  size: { width: number; height: number };
  bgColor: ColorOption;
  hoverColor: ColorOption;
  rounded?: RoundedOption;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  children,
  text,
  size,
  bgColor,
  hoverColor,
  rounded,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <Tooltip content={text} placement="top" className="text-xs">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`w-${size.width} h-${size.height} flex items-center justify-center bg-${bgColor} hover:bg-${hoverColor} ${rounded}`}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default Button;
