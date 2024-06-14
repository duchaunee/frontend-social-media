/* eslint-disable no-unused-vars */
import React from "react";
import InputForm from "./InputForm";
import Requirements from "./Requirements";
import { ButtonLoading } from "../../components/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../apis";
import toast from "react-hot-toast";

const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const changePasswordMutation = useMutation({
    mutationFn: (value) => userApi.changePassword(value),
    onSuccess: (requestFr) => {
      if (requestFr.status) {
        reset();
        toast.success(requestFr.message);
      }
    },
  });

  const handleChangePassword = (value) => {
    try {
      changePasswordMutation.mutate(value);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="left-reset-password bg-white mt-6 shadow-shadowPrimary p-8 flex flex-col rounded-lg"
    >
      <h1 className="font-bold text-[20px] mb-6">Password information</h1>
      <div className="flex flex-col gap-5">
        <InputForm
          type="password"
          id="current_password"
          register={register("current_password", {
            required: "Password at least 3 characters (up to 10)",
          })}
          errors={errors}
          label="Current Password"
          placeholder="••••••••"
        />
        <InputForm
          type="password"
          id="new_password"
          register={register("new_password", {
            required: "New Password is required",
          })}
          errors={errors}
          label="New Password"
          placeholder="••••••••"
        />
        <InputForm
          type="password"
          id="confirm_password"
          register={register("confirm_password", {
            required: "Confirm Password is required",
            validate: (val) => {
              if (watch("new_password") != val) {
                return "Confirm passwords do no match";
              }
            },
          })}
          errors={errors}
          label="Confirm Password"
          placeholder="••••••••"
        />
      </div>
      <Requirements type="password"></Requirements>
      <ButtonLoading
        type="submit"
        text="Change password"
        overrideClassName={true}
        classNameText="text-white font-semibold"
        className="w-fit bg-button px-5 py-3 rounded-lg hover:bg-[#1e40af] duration-100 ease-linear"
      />
    </form>
  );
};

export default PasswordForm;
