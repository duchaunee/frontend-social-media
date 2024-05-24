import { faBilibili } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { FormDivider, FormField } from "../../components/Form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { ButtonLoading } from "../../components/Button";
import { userApi } from "../../apis";

const ForgotPassword = () => {
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  const handleSendMail = async () => {
    setForgotPasswordLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const requestResetPw = await userApi.requestResetPassword({
            email: getValues("email"),
          });
          // const requestResetPw = await axiosInstance.post(
          //   "/users/request-reset-password",
          //   {
          //     email: getValues("email"),
          //   }
          // );
          if (requestResetPw) {
            const { userId } = requestResetPw;
            setForgotPasswordLoading(false);
            navigate(`/recover/${userId}`);
            resolve();
          }
        } catch (error) {
          setForgotPasswordLoading(false);
          reject(error);
          toast.error(error.message);
          console.log("Error:", error);
        }
      }, 1000);
    });
  };

  // const handleSendMail = async () => {
  //   console.log("before");
  //   const requestResetPw = await axiosInstance.post(
  //     "/users/request-reset-password",
  //     {
  //       email: getValues("email"),
  //     }
  //   );
  //   console.log("after");
  //   console.log("requestResetPw: ", requestResetPw);
  // };

  let body = (
    <div className="flex flex-col gap-y-3 mt-3">
      <FormField
        register={register("email", {
          required: "Please enter your email ",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email",
          },
        })}
        errors={errors}
        placeholder="Enter your email"
      />

      {/* <button
        type="button"
        onClick={
          forgotPasswordLoading ? () => {} : handleSubmit(handleSendMail)
        }
        className={clsx(
          "btn text-sm w-full gap-x-2 h-auth-btn-h mt-2 py-2 rounded-md",
          "transition-all ease-linear duration-200",
          "text-white bg-[#1877f2] bg-opacity-85 flex items-center justify-center",
          forgotPasswordLoading
            ? "disabled cursor-not-allowed"
            : "hover:bg-primary"
        )}
      >
        {forgotPasswordLoading ? (
          <SpinnerRing className="text-white" />
        ) : (
          
        )}
      </button> */}
      <ButtonLoading
        loading={forgotPasswordLoading}
        text="Send Link Reset"
        handleSubmit={handleSubmit(handleSendMail)}
      ></ButtonLoading>
    </div>
  );

  return (
    <div title="Forgot Password" className="h-full pt-[60px]">
      <div
        className={clsx(
          "w-form-w max-w-[388px] mb-0 mx-auto border border-[rgb(219, 219, 219)]"
        )}
      >
        <div className="wrapper-border px-10 py-12">
          <FontAwesomeIcon
            icon={faBilibili}
            size="5x"
            className={clsx("w-full", "text-base-black")}
          />
          <h2 className={clsx("text-base text-center font-medium my-4")}>
            Trouble Logging In?
          </h2>
          <p
            className={clsx(
              "text-[14px] mt-2 mb-4 text-center",
              "text-[rgb(115,115,115)]"
            )}
          >
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </p>

          {body}

          <FormDivider className="mt-7" />
          <NavLink
            to="/register"
            className={clsx(
              "block w-full text-sm-1 font-medium text-center mt-4 text-[14px]",
              "hover:text-gray-400"
            )}
          >
            Create New Account
          </NavLink>
        </div>
        <NavLink
          to="/login"
          className={clsx(
            "block text-center w-full font-medium py-3 mt-4 text-sm border border-gray-200 ",
            "bg-[#fafafa]",
            "hover:text-gray-400",
            "active:opacity-70"
          )}
        >
          Back To Login
        </NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;
