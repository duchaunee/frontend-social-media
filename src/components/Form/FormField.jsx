/* eslint-disable react/prop-types */

import clsx from "clsx";

const FormField = ({
  register,
  errors,
  placeholder,
  type = "text",
  className,
}) => {
  const errorMessage = errors[register?.name]?.message;
  return (
    <div>
      <div
        className={clsx(
          "border-line rounded-sm",
          "border border-[rgb(219, 219, 219)]",
          className
        )}
      >
        <input
          {...register}
          autoFocus
          className={clsx(
            "w-full px-2 py-2 text-sm",
            "bg-[#fafafa]",
            "placeholder:text-sm-1",
            "placeholder:text-[#ccc]"
          )}
          type={type}
          placeholder={placeholder}
        />
      </div>
      {errorMessage && (
        <div className={clsx("text-[12px] mt-1 text-left", "text-red-500")}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FormField;
