import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ButtonPrimary } from "../../components/Button";
import { InputPin } from "../../components/Input";
import toast from "react-hot-toast";
import { Check } from "../../assets/svg";
import axiosInstance from "../../axios";
import Page404 from "../404Page/Page.404";
import { userApi } from "../../apis";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
  });

  const handleSubmitPin = async () => {
    let code5pin = "";
    for (const key in pin) code5pin += pin[key];
    if (code5pin.length != 5) return toast.error("Please enter your code");

    try {
      const verifyCode = await axiosInstance.get(
        `/users/validate-reset-password/${userId}/${code5pin}`
      );
      if (verifyCode.status === "OK") {
        navigate(`/reset-password/${userId}/${code5pin}`);
      }
    } catch (error) {
      console.log("LOI ROI");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const checkPwReset = async () => {
      setLoading(true);
      try {
        console.log(`/users/verify-reset-password/${userId}`);
        const pwReset = await userApi.verifyResetPassword(userId);
        // const pwReset = await axiosInstance.get(
        //   `/users/verify-reset-password/${userId}`
        // );
        if (pwReset.status === "OK") {
          setLoading(false);
          setCanAccess(true);
        }
      } catch (e) {
        console.log("LOI ROI");
        setCanAccess(false);
        setLoading(false);
        console.log(e);
      }
    };
    checkPwReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body = (
    <>
      <InputPin pin={pin} setPin={setPin}></InputPin>
      <div className="text-center">
        <ButtonPrimary
          text="Continue"
          onClick={handleSubmitPin}
          className={clsx("text-[14px] mt-4", "px-4, py-2")}
        />
      </div>
    </>
  );

  if (!loading && !canAccess) return <Page404></Page404>;

  if (!loading && canAccess)
    return (
      <div title="Forgot Password" className="h-full pt-[60px]">
        <div
          className={clsx(
            "w-form-w max-w-[388px] mb-0 mx-auto border border-[rgb(219, 219, 219)]"
          )}
        >
          <div className="wrapper-border px-10 py-12">
            <Check
              className="flex items-center justify-center"
              size={60}
            ></Check>

            <h2 className={clsx("text-base text-center font-medium my-4")}>
              Email sent successfully !
            </h2>
            <p
              className={clsx(
                "text-[14px] mt-2 mb-4 text-center",
                "text-[rgb(115,115,115)]"
              )}
            >
              Please check your emails for a message with your code. Your code
              is 5 numbers long
            </p>

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

export default RecoverPassword;
