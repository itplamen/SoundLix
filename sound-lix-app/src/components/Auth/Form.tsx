import { COLOR } from "@/utils/constants";
import Icon from "../Icons/Icon";
import CloseIconType from "../Icons/Types/CloseIconType";
import Button from "../Buttons/Button";
import { useState } from "react";
import { useAppDispatch } from "@/app/state/hooks";

type Props = {
  heading: string;
  btnText: string;
  footer: React.ReactNode;
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
};
const Form = ({ heading, btnText, footer, action, children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    //dispatch(setAuthModal({ signIn: false, signUp: false }));
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {heading}
                </h3>
                <Button
                  bgColor={COLOR.WHITE}
                  hoverColor={COLOR.LIGHT_GRAY}
                  size={{ height: 8, width: 8 }}
                  rounded={"rounded-lg"}
                  onClick={handleClick}
                >
                  <Icon color={COLOR.DARK_GRAY} viewBox={14} size={3}>
                    <CloseIconType />
                  </Icon>
                </Button>
              </div>
              <div className="p-4">
                <form className="space-y-4" action={action}>
                  {children}
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {btnText}
                  </button>
                  <div>{footer}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
