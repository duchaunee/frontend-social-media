import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../../assets/images";
import { InputAuth } from "../../components/Input";
import { useForm } from "react-hook-form";
import { ButtonLoading } from "../../components/Button";
import { useContext, useRef, useState } from "react";
import axiosInstance from "../../axios";
import toast from "react-hot-toast";
import { AppContext } from "../../contexts/App.context";
import LoadingBar from "react-top-loading-bar";

const Login = () => {
  const refLoadingBar = useRef(null);
  const { setIsAuthentication } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((resolve, reject) => {
      refLoadingBar.current.continuousStart(0, 300);
      setTimeout(async () => {
        try {
          const logged = await axiosInstance.post("/auth/login", {
            email: getValues("email"),
            password: getValues("password"),
          });
          if (logged.message === "Login successfully") {
            refLoadingBar.current.complete();
            setLoading(false);
            toast.success(logged.message);
            setIsAuthentication(true);
            navigate(`/`);
            // window.location.reload();
            resolve();
          }
        } catch (error) {
          refLoadingBar.current.complete();
          setLoading(false);
          reject(error);
          toast.error(error.message);
          console.log("Error:", error);
        }
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <LoadingBar
        ref={refLoadingBar}
        color="linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)"
        height={4}
      />

      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <div className="">
          <img src={logo} alt="" />
        </div>
        <h1 className="bg-no-repeat instagram-logo" />
        <form className="mt-8 w-64 flex flex-col">
          <div className="flex flex-col gap-2 mb-4">
            <InputAuth
              autoFocus
              placeholder="Enter your email"
              name="email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email",
                },
              })}
              errors={errors}
              type="text"
            />
            <InputAuth
              placeholder="Password"
              name="password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              errors={errors}
            />
          </div>
          <ButtonLoading
            loading={loading}
            text="Log In"
            handleSubmit={handleSubmit(handleLogin)}
            className="text-sm text-center bg-button text-white py-[6px] rounded font-medium flex items-center justify-center"
            overrideClassName={true}
          ></ButtonLoading>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2" />
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
            or
          </span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2" />
        </div>
        <button className="mt-4 flex">
          <div className="bg-no-repeat facebook-logo mr-1" />
          <button
            onClick={() =>
              toast.error(
                "This function is being tested, please try again later"
              )
            }
            className="text-xs text-blue-900 font-semibold"
          >
            Log in with Facebook
          </button>
        </button>
        <NavLink
          to="/forgot-password"
          className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4"
        >
          Forgot password?
        </NavLink>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Don&apos;t have an account?</span>
        <NavLink
          to="/register"
          className="text-blue-500 text-sm font-semibold ml-1"
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
