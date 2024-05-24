import clsx from "clsx";
import { SpinnerRing } from "../Spinner";

// eslint-disable-next-line react/prop-types
const ButtonLoading = ({ loading, text, handleSubmit, ...props }) => {
  // eslint-disable-next-line react/prop-types
  const { className, overrideClassName, ...other } = props;
  return (
    <button
      type="button"
      onClick={loading ? () => {} : handleSubmit}
      className={clsx(
        overrideClassName
          ? className
          : clsx(
              "btn text-sm w-full gap-x-2 h-auth-btn-h mt-2 py-2 rounded-md",
              "transition-all ease-linear duration-200",
              "text-white bg-[#1877f2] bg-opacity-85 flex items-center justify-center",
              loading ? "disabled cursor-not-allowed" : "hover:bg-primary",
              className
            )
      )}
      {...other}
    >
      {loading ? <SpinnerRing className="text-white" /> : `${text}`}
    </button>
  );
};

export default ButtonLoading;
