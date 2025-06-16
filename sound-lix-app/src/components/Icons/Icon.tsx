import { ColorOption } from "@/utils/constants";

type Props = {
  children: React.ReactNode;
  color: ColorOption;
  size?: number;
  display?: boolean;
  viewBox?: number;
};
const Icon = ({
  children,
  color,
  size = 4,
  display = true,
  viewBox = 24,
}: Props) => {
  return (
    <>
      {display && (
        <svg
          className={`w-${size} h-${size} text-${color} dark:text-white cursor-pointer`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          width="24"
          height="24"
        >
          {children}
        </svg>
      )}
    </>
  );
};

export default Icon;
