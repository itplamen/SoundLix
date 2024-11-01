type Props = {
  children: React.ReactNode;
};
const Section = ({ children }: Props) => {
  return <div className="p-8 sm:ml-44">{children}</div>;
};

export default Section;
