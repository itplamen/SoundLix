type Props = {
  text: string;
  checked: boolean;
};
const Checkbox = ({ text, checked }: Props) => {
  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        checked={checked}
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        htmlFor="checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {text}
      </label>
    </>
  );
};

export default Checkbox;
