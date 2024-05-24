import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../../assets/images";
import { InputAuth } from "../../components/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonLoading } from "../../components/Button";
import axiosInstance from "../../axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleRegister = async () => {
    setLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const registerResponse = await axiosInstance.post("/auth/register", {
            firstName: getValues("firstName"),
            lastName: getValues("lastName"),
            email: getValues("email"),
            password: getValues("password"),
          });
          if (registerResponse.success === "PENDING") {
            setLoading(false);
            toast.success(registerResponse.message, {
              duration: 4000,
            });
            navigate(`/login`);
            resolve();
          }
        } catch (error) {
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
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <div className="">
          <img src={logo} alt="" />
        </div>
        <h1 className="mx-8 mt-3 text-[#737373] font-semibold text-center">
          Sign up to see photos and videos from your friends.
        </h1>
        <h1 className="bg-no-repeat instagram-logo" />
        <form className="mt-8 w-64 flex flex-col">
          <div className="flex flex-col gap-2 mb-4">
            <InputAuth
              autoFocus
              placeholder="First Name"
              register={register("firstName", {
                required: "First Name is required",
              })}
              errors={errors}
              type="text"
            />
            <InputAuth
              placeholder="Last Name"
              register={register("lastName", {
                required: "Last Name is required",
              })}
              errors={errors}
              type="text"
            />
            <InputAuth
              placeholder="Email"
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
              s
              register={register("password", {
                required: "Password is required",
              })}
              errors={errors}
              type="text"
            />
          </div>
          <ButtonLoading
            loading={loading}
            text="Sign up"
            handleSubmit={handleSubmit(handleRegister)}
            className="text-sm text-center bg-button text-white py-[6px] rounded font-medium flex items-center justify-center"
            overrideClassName={true}
          ></ButtonLoading>
        </form>
        <p className="mt-1 flex">
          <span className="text-xs text-gray-400 mt-[10px] mx-10 text-center">
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </span>
        </p>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Have an account?</span>
        <NavLink
          to="/login"
          className="text-blue-500 text-sm font-semibold ml-1"
        >
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
