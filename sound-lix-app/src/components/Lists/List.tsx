type Props = {
  heading: string;
  children: React.ReactNode;
};
const List = ({ heading, children }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {heading}
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {children}
        </ul>
      </div>
    </>
  );
};

export default List;
