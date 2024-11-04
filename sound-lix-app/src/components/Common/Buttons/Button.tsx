type Props = {
  text: string;
  children: React.ReactNode;
};

const Button = ({ text, children }: Props) => {
  return (
    <button
      type="button"
      className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
    >
      <svg
        className="w-5 h-5 me-2 -ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
      {text}
    </button>
  );
};

export default Button;
