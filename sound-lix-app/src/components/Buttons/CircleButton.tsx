import { MouseEventHandler } from "react";

type Props = {
  size?: number;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const CircleButton = ({
  children,
  size = 6,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-${size} h-${size} flex items-center justify-center bg-gray-300 hover:bg-white rounded-full me-2 mb-2`}
    >
      {children}
    </button>
  );
};

export default CircleButton;
