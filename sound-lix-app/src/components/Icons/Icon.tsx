import { ColorOption } from "@/utils/constants";
import { Tooltip } from "flowbite-react";

type Props = {
  children: React.ReactNode;
  content: string;
  color: ColorOption;
  size?: number;
  display?: boolean;
};
const Icon = ({
  children,
  content,
  color,
  size = 4,
  display = true,
}: Props) => {
  return (
    <>
      {display && (
        <Tooltip content={content} placement="top" className="text-xs">
          <svg
            className={`w-${size} h-${size} text-${color} dark:text-white cursor-pointer`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            {children}
          </svg>
        </Tooltip>
      )}
    </>
  );
};

export default Icon;
