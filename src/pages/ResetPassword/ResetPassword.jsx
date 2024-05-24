import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/Form";
import clsx from "clsx";
import { SpinnerRing } from "../../components/Spinner";
import { logo } from "../../assets/images";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import Page404 from "../404Page/Page.404";
import toast from "react-hot-toast";
import { userApi } from "../../apis";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { userId, code } = useParams();
  const [resetPasswordLoading, setResetPasswordLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const handleResetPassword = async () => {
    const password = getValues("password");
    setLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const resetPw = await axiosInstance.post(`/users/reset-password`, {
            userId,
            code,
            newPassword: password,
          });
          if (resetPw.status === "OK") {
            setLoading(false);
            navigate("/login");
            toast.success("Reset password successfully");
            resolve();
          }
        } catch (error) {
          setLoading(false);
          console.log("LOI ROI");
          reject();
          window.location.reload();
          toast.error(error.message);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const checkPwReset = async () => {
      setResetPasswordLoading(true);
      try {
        const pwValidate = await userApi.resetPassword(userId, code);
        // const pwValidate = await axiosInstance.get(
        //   `/users/validate-reset-password/${userId}/${code}`
        // );
        if (pwValidate.status === "OK") {
          setResetPasswordLoading(false);
          setCanAccess(true);
        }
      } catch (e) {
        console.log("LOI ROI");
        setCanAccess(false);
        setResetPasswordLoading(false);
        console.log(e);
      }
    };
    checkPwReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body = (
    <div className="flex flex-col gap-y-3 mt-10">
      <FormField
        register={register("password", {
          required: "New password is required !",
        })}
        placeholder="New Password"
        errors={errors}
        type="password"
      />
      <FormField
        register={register("confirmPassword", {
          required: "Confirm password is required !",
          validate: (val) => {
            if (watch("password") != val) {
              return "Your passwords do no match";
            }
          },
        })}
        placeholder="Confirm Password"
        errors={errors}
        type="password"
      />

      <button
        type="button"
        onClick={
          resetPasswordLoading ? () => {} : handleSubmit(handleResetPassword)
        }
        className={clsx(
          "btn text-sm w-full gap-x-2 h-auth-btn-h mt-2 py-2 rounded-md",
          "transition-all ease-linear duration-200",
          "text-white bg-[#1877f2] bg-opacity-85 flex items-center justify-center",
          resetPasswordLoading
            ? "disabled cursor-not-allowed"
            : "hover:bg-primary"
        )}
      >
        {loading ? <SpinnerRing className="text-white" /> : "Reset Password"}
      </button>
    </div>
  );

  if (!resetPasswordLoading && !canAccess) return <Page404></Page404>;
  if (!resetPasswordLoading && canAccess)
    return (
      <div className="w-full h-full pt-[60px]">
        <div
          className={clsx(
            "w-form-w mx-auto pt-9 ",
            "max-w-[388px] mb-0 mx-auto border border-[rgb(219, 219, 219)]"
          )}
        >
          <div className="border-1 border-line bg-white px-10 py-12">
            <img className="mx-auto" src={logo} alt="Logo" />
            {body}
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

export default ChangePassword;
