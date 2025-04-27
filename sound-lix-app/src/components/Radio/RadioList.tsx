import { Radio } from "@/models/data";
import RadioItem from "./RadioItem";

type Props = {
  radios: Radio[];
};

const RadioList = ({ radios }: Props) => {
  return (
    <>
      <div className="rounded-lg dark:border-gray-700 gap-4 mb-4">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 max-w-full max-h-screen overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Popular Radio Stations
            </h5>
          </div>
          <p className="text-sm text-gray-500">
            Discover stations that set the perfect tone - wherever, whenever.
          </p>
          <hr className="h-px my-4 w-1/3 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="grid rounded-lg dark:border-gray-700 grid-cols-7 gap-4 mb-4">
            {radios.map((x) => (
              <RadioItem key={x.id} radio={x} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default RadioList;
