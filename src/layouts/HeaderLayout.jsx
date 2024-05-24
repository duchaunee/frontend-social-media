import Header from "../components/Header";

// eslint-disable-next-line react/prop-types
const HeaderLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};

export default HeaderLayout;
