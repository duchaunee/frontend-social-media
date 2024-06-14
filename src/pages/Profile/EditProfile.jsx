/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ButtonLoading, ButtonPrimary } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import Requirements from "./Requirements";
import PasswordForm from "./ChangePassword";
import InputForm from "./InputForm";
import { AppContext } from "../../contexts/app.context";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { userApi } from "../../apis";
import toast from "react-hot-toast";
import { SpinnerRing } from "../../components/Spinner";
import firebaseApi from "../../apis/firebase.api";

// const ELEMENT_OVERLAY = document.querySelector("#overlay");
const EditProfile = () => {
  const { user } = useContext(AppContext);
  const [listProfession, setListProfession] = useState(user?.profession);
  const [loadingImgbb, setLoadingImgbb] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const updateUserMutation = useMutation({
    mutationFn: (body) => userApi.updateUser(body),
    onSuccess: (requestFr) => {
      if (requestFr.sucess) {
        toast.success(requestFr.message);
        window.location.reload();
      }
    },
  });

  const submitEditProfile = handleSubmit((body) => {
    try {
      updateUserMutation.mutate({ ...body, profession: listProfession });
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  });

  const handleChangePhoto = async (e) => {
    try {
      setLoadingImgbb(true);
      const fileImg = e.target.files[0];

      const profileUrl = await firebaseApi.uploadImageToFirebase(fileImg);
      await updateUserMutation.mutateAsync({ profileUrl });

      setLoadingImgbb(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  /**
   * @desc: CẦN USEEFFECT NÀY LÀ VÌ:
   * Lúc đầu, user từ context là null --> nó đã khởi tạo listProfession là useState(user?.profession) (null) rồi
   * Sau khi context getMe thành công thì nó cũng chỉ re-render lại component, còn useState(user?.profession) thì vẫn là null do re-render thì useState(user?.profession) không khởi tạo lại
   */
  useEffect(() => {
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("location", user?.location);
    setValue("description", user?.description);

    setListProfession(user?.profession);
  }, [setValue, user]);

  console.log("user: ", user);
  if (!user) return;
  return (
    <div className="bg-[#f9fafb] h-full px-6 py-6 rounded-md flex flex-col">
      {/* body */}
      <h1 className="text-[24px] my-4 font-medium">Edit profile</h1>
      <div className="w-full pb-4 my-4 rounded-xl flex gap-6">
        <div className="left w-[32%]">
          <div className="left-user bg-white shadow-shadowPrimary p-8 flex gap-5 rounded-lg">
            <div className="w-[112px] h-[112px]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={user?.profileUrl}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <p className="font-bold text-[24px]">
                {watch("firstName")?.length > 0
                  ? watch("firstName")
                  : user?.firstName}{" "}
                {watch("lastName")?.length > 0
                  ? watch("lastName")
                  : user?.lastName}
              </p>
              <p className="text-[#6b7280]">
                @
                {watch("location")?.length > 0
                  ? watch("location")
                  : user?.location}
              </p>
              <div className="flex">
                <label
                  htmlFor="profileUrl"
                  className="ml-auto px-4 py-3 text-white font-medium rounded-md text-[14px] ease-linear bg-[#1d4ed8] hover:bg-[#1e40af] duration-100 cursor-pointer w-[123px] h-[38px] flex items-center justify-center"
                >
                  {loadingImgbb ? (
                    <SpinnerRing className="text-white w-full" />
                  ) : (
                    `Change Photo`
                  )}
                </label>
                <input
                  onChange={handleChangePhoto}
                  id="profileUrl"
                  hidden
                  type="file"
                  accept=".jpg, .png, .gif, .bmp, .tiff, .ico, .webp"
                />
              </div>
            </div>
          </div>
          <PasswordForm></PasswordForm>
        </div>
        <div className="right flex-1 h-fit bg-white shadow-shadowPrimary p-8 rounded-lg relative">
          <h1 className="font-bold text-[20px] mb-6">General information</h1>
          <div className="flex w-full gap-6">
            <InputForm
              type="text"
              label="First Name"
              placeholder="e.g. dwc"
              clasNameWrap="flex-1"
              id="firstName"
              register={register("firstName", {
                required: "First Name is required",
                pattern: {
                  value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s]{2,8}$/,
                  message: "At least 2 characters (and up to 8)",
                },
              })}
              errors={errors}
            />
            <InputForm
              type="text"
              label="Last Name"
              placeholder="e.g. hau"
              clasNameWrap="flex-1"
              id="lastName"
              register={register("lastName", {
                required: "First Name is required",
                pattern: {
                  value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s]{2,8}$/,
                  message: "At least 2 characters (and up to 8)",
                },
              })}
              errors={errors}
            />
          </div>
          <div className="flex w-full gap-6 my-6">
            <InputForm
              type="text"
              label="Location"
              placeholder="e.g. Bac Ninh"
              clasNameWrap="flex-1"
              id="location"
              register={register("location", {
                required: "First Name is required",
                pattern: {
                  value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s]{4,30}$/,
                  message: "At least 4 characters (and up to 30)",
                },
              })}
              errors={errors}
            />
            <InputForm
              type="text"
              label="Description"
              placeholder="e.g. dwc hau trap boiz"
              clasNameWrap="flex-1"
              id="description"
              register={register("description", {
                required: "Description is required",
                pattern: {
                  value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\d\s]{3,30}$/,
                  message: "At least 3 characters (and up to 30)",
                },
              })}
              errors={errors}
            />
          </div>
          <div className="flex w-full gap-6 my-6">
            <InputForm
              style="profession"
              placeholder="e.g. graphicsdesigner"
              type="text"
              label="Profession"
              clasNameWrap="flex-1"
              id="profession"
              listProfession={listProfession}
              setListProfession={setListProfession}
            />
          </div>
          <Requirements type="information"></Requirements>

          <ButtonLoading
            onClick={submitEditProfile}
            text="Save changes"
            overrideClassName={true}
            classNameText="text-white font-semibold"
            className="w-fit bg-button px-5 py-3 rounded-lg hover:bg-[#1e40af] duration-100 ease-linear"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
