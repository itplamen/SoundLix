"use client";

import { COLOR } from "@/utils/constants";
import Icon from "../Icons/Icon";
import CloseIconType from "../Icons/Types/CloseIconType";
import Button from "../Buttons/Button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  text: string;
  imgage: string;
  onClose: () => void;
};

const AuthModal = ({ text, imgage, onClose }: Props) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-xl flex flex-col items-center text-center">
          <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">
            <Button
              bgColor={COLOR.WHITE}
              hoverColor={COLOR.LIGHT_GRAY}
              size={{ height: 8, width: 8 }}
              rounded={"rounded-lg"}
              onClick={onClose}
            >
              <Icon color={COLOR.DARK_GRAY} viewBox={14} size={3}>
                <CloseIconType />
              </Icon>
            </Button>
          </div>
          <div className="w-32 h-32 relative mb-4">
            <Image
              src={imgage}
              alt="Track Cover"
              width={300}
              height={300}
              className="w-full h-full rounded-lg"
            />
          </div>

          <h3 className="text-xl font-bold mb-4">{text}</h3>

          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm mb-3">
            Sign up for free
          </button>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="signin" className="text-blue-600 underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
