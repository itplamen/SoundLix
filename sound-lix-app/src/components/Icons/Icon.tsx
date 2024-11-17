import { IconTypeView } from "@/models/views";
import { Tooltip } from "flowbite-react";

type Props = {
  children: React.ReactNode;
  content: IconTypeView;
  display?: boolean;
};
const Icon = ({ children, content, display = true }: Props) => {
  return (
    <div className="w-4 h-4">
      {display && (
        <Tooltip content={content.heading} placement="top" className="text-xs">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {children}
          </svg>
        </Tooltip>
      )}
    </div>
  );
};

export default Icon;
