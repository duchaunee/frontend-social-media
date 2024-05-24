import clsx from "clsx";

/* eslint-disable react/prop-types */
const ButtonPrimary = (props) => {
  const { className, text, ...other } = props;
  return (
    <button
      {...other}
      type="button"
      className={clsx(
        "bg-button text-white hover:bg-blue-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded",
        className
      )}
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
