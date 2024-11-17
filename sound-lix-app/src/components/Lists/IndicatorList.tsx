const IndicatorList = ({ items }: { items: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center text-gray-900 dark:text-white">
      {items.map((item: string) => (
        <li>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span className="flex w-2.5 h-2.5 bg-gray-900 rounded-full me-1.5 flex-shrink-0"></span>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default IndicatorList;
