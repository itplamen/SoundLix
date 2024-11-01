import React from "react";

type Props = {
  children: React.ReactNode[];
};

const BestChart = ({ children }: Props) => {
  return (
    <div className="grid rounded-lg dark:border-gray-700 grid-cols-2 gap-4 mb-4">
      {children.map((element: React.ReactNode, index: number) => (
        <div
          key={index}
          className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 max-w-full max-h-screen overflow-auto"
        >
          <div className="h-[75vh]">{element}</div>
        </div>
      ))}
    </div>
  );
};

export default BestChart;
