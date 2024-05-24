import clsx from "clsx";

// eslint-disable-next-line react/prop-types
const FormDivider = ({ className }) => {
  return (
    <div className={clsx("flex justify-between items-center", className)}>
      <div className={clsx("h-[1px] w-full", "bg-gray-200")} />
      <div className={clsx("font-medium mx-4 text-sm", "text-gray-500")}>
        OR
      </div>
      <div className={clsx("h-0.5 w-full", "bg-gray-200")} />
    </div>
  );
};

export default FormDivider;
