import { MSG_TYPE, MsgOption } from "@/utils/constants";
import InfoIconType from "../Icons/Types/InfoIconType";

type Props = {
  type: MsgOption;
  text: string;
};

const getBgColor = (type: MsgOption): string => {
  switch (type) {
    case MSG_TYPE.WARNING:
      return "bg-amber-300 text-amber-900";
    case MSG_TYPE.DANGER:
      return "bg-red-50 dark:bg-gray-800 dark:text-red-400";
    case MSG_TYPE.ERROR:
      return "bg-[#b91c1c] text-white";
    default:
      throw new Error("Invalid msg type");
  }
};
const Message = ({ type, text }: Props) => {
  return (
    <div
      className={`flex items-start text-sm p-3 rounded-lg ${getBgColor(type)}`}
      role="alert"
    >
      <svg
        className={`w-4 h-4 mt-[2px] me-2 ${""}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <InfoIconType />
      </svg>
      <span className="sr-only">{type}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default Message;
