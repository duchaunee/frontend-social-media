import { useParams, useSearchParams } from "react-router-dom";
import { logo } from "../assets/images";
import { Check } from "../assets/svg";
import { ButtonLoading } from "../components/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import toast from "react-hot-toast";
import Page404 from "./404Page/Page.404";

const VerifyEmail = () => {
  // const navigate = useNavigate();
  const { userId, token } = useParams();
  const [searchParams] = useSearchParams();

  const [canAccess, setCanAccess] = useState(null);

  const handleRedirect = () => {
    // navigate("/login");
    window.location.replace("/login");
  };

  useEffect(() => {
    const checkVerifyEmail = async () => {
      try {
        const verified = await axiosInstance.get(
          `/users/verify/${userId}/${token}`
        );
        if (verified.status === "OK") {
          setCanAccess(true);
          toast.success("Verify email successfully");
        }
      } catch (e) {
        console.log("LOI ROI");
        setCanAccess(false);
        console.log(e);
        toast.error(e.message);
      }
    };
    checkVerifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (canAccess == false) return <Page404></Page404>;

  if (canAccess == true)
    return (
      <div className="w-full h-screen bg-[#f9fafb] flex pt-[60px] justify-center">
        <div
          className="max-w-[500px] h-fit mx-auto bg-white shadow-shadowPrimary rounded-lg p-5
      "
        >
          <div className="border-1 border-line bg-white px-10 pb-5">
            <img className="mx-auto" src={logo} alt="Logo" />
          </div>
          <p className="font-semibold mb-3 text-[18px]">Verified!</p>
          <p className="text-[#687280] py-2 text-base">
            You have successfully verified your account, Welcome to
            <a className="text-primary ml-1 font-medium">Social Media !</a>
          </p>
          <div className="flex w-full items-center p-4 mt-2 mb-5 border text-[#046c4e] bg-[#def7ec] gap-1 border-[#bcf0da]">
            <Check color="#def7ec" bg="#046c4e" size={20}></Check>
            <span className="font-medium">{searchParams.get("email")}</span>
          </div>
          <ButtonLoading
            loading={false}
            text="Log in to your Account"
            handleSubmit={handleRedirect}
            className="text-sm text-center bg-[#2563eb] text-white py-[6px] rounded font-medium flex items-center justify-center w-full"
            overrideClassName={true}
          ></ButtonLoading>
        </div>
      </div>
    );
};

export default VerifyEmail;
