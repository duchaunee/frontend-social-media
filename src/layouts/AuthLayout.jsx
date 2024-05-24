import LoginScreenshot from "../features/login/LoginScreenshot";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="h-screen flex flex-row items-center justify-center gap-4 bg-gray-50">
        <LoginScreenshot />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
