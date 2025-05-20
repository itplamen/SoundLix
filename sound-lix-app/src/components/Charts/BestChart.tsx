import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const BestChart = ({ children }: Props) => {
  const childrenArray = React.Children.toArray(children);
  const colCountClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
    }[childrenArray.length] || "grid-cols-1";

  return (
    <div
      className={`grid rounded-lg dark:border-gray-700 ${colCountClass} gap-4 mb-4`}
    >
      {childrenArray.map((element: React.ReactNode, index: number) => (
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
