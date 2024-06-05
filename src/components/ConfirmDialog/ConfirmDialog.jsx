import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

/* eslint-disable react/prop-types */
const ConfirmDialog = ({ setOpenModal, ...props }) => {
  const { body, text } = props;
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      const { target } = e;
      if (!containerRef.current.contains(target)) {
        // setOpenModal(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#f1f1f1] absolute rounded-lg px-4 py-3 translate-x-[-50%] bottom-[100%] z-50 border-[1px] border-[#e1e1e1] mb-3 w-[210px] flex flex-col items-center"
    >
      <div className="absolute top-full right-[65px] border-[10px] border-[#e1e1e1] clip-path-top "></div>
      <div className=""></div>
      <p className="text-sm font-medium text-gray-700">
        Respond to friend requests
      </p>
      {/* {body && (
        <div className="items-center">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
            <i className="bx bx-error text-3xl">⚠</i>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold">Warning!</p>
            <p className="text-sm text-gray-700 mt-1">
              You will lose all of your data by deleting this. This action
              cannot be undone.
            </p>
          </div>
        </div>
      )} */}

      <div className="text-center mt-4 flex text-white">
        <button
          id="confirm-delete-btn"
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold text-sm ml-2 order-2"
        >
          Delete
        </button>
        <button
          onClick={() => setOpenModal(false)}
          id="confirm-cancel-btn"
          className="px-4 py-2 bg-[#0866ff] rounded-lg font-semibold text-sm mt-0 order-1 "
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
