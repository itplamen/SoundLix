type Props = {
  children: React.ReactNode;
};

const Section = ({ children }: Props) => {
  return <div className="mb-24 flex-1 border p-4 p-8 sm:ml-44">{children}</div>;
};

export default Section;
