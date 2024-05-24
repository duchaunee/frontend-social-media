/* eslint-disable react/prop-types */
import clsx from "clsx";

const InputAuth = (props) => {
  const { className, register, errors, ...others } = props;

  const errorMessage = errors[register?.name]?.message;
  return (
    <div className="">
      <input
        // eslint-disable-next-line react/prop-types
        className={`text-xs w-full rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none ${className}`}
        // id="email"
        // placeholder="Phone number, username, or email"
        // type="text"
        {...others}
        {...register}
      />
      {errorMessage && (
        <div className={clsx("text-[12px] mt-1 text-left", "text-red-500")}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputAuth;
