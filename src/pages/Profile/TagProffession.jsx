/* eslint-disable react/prop-types */
import clsx from "clsx";
import { CloseSVG } from "../../assets/svg";

const TagProffession = ({ text = "graphicsdesigner", onClick, clasName }) => {
  return (
    <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded mt-2">
      {text}
      <button
        onClick={onClick}
        type="button"
        className={clsx(
          "inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900",
          clasName
        )}
      >
        <CloseSVG />
      </button>
    </span>
  );
};

export default TagProffession;
