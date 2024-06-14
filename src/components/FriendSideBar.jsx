/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatNumber } from "../utils";
import ButtonLoading from "./Button/ButtonLoading";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const FriendSideBar = ({ f, ...props }) => {
  //state dùng cho tab Suggestions
  const [statusAddFr, setStatusAddFr] = useState("Add Friend");

  const { _id: friend_id, firstName, lastName, friends, profileUrl } = f;

  const { typeComponent, buttonText, className, handleSubmit, loading } = props;

  return (
    <li
      key={friend_id} //id của người gửi lời mời
      className="flex last:pb-0 items-center"
    >
      <div className="flex">
        <NavLink
          to={
            typeComponent === "RequestSent"
              ? `/profile/${f?.requestTo._id}`
              : typeComponent === "RequestReceived"
              ? `/profile/${f?.requestFrom._id}`
              : `/profile/${friend_id}`
          }
        >
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={
              typeComponent === "AllFriend"
                ? profileUrl
                : typeComponent === "RequestSent"
                ? f?.requestTo?.profileUrl
                : typeComponent === "RequestReceived"
                ? f?.requestFrom?.profileUrl
                : f.profileUrl
            }
          />
        </NavLink>
        <div className="ml-3 flex flex-col gap-1 text-[#737373] justify-center">
          <NavLink
            to={
              typeComponent === "RequestSent"
                ? `/profile/${f?.requestTo._id}`
                : typeComponent === "RequestReceived"
                ? `/profile/${f?.requestFrom._id}`
                : `/profile/${friend_id}`
            }
            className="text-sm font-semibold text-black hover:underline"
          >
            {typeComponent === "AllFriend" && `${firstName} ${lastName}`}
            {typeComponent === "RequestSent" &&
              `${f.requestTo.firstName} ${f.requestTo.lastName}`}
            {typeComponent === "RequestReceived" &&
              `${f.requestFrom.firstName} ${f.requestFrom.lastName}`}
            {typeComponent === "Suggestions" && `${f.firstName} ${f.lastName}`}
          </NavLink>

          {typeComponent === "RequestReceived" ? (
            <p className="text-[14px] tracking-wide font-medium text-gray-500 opacity-75">
              {f?.requestStatus}
            </p>
          ) : (
            <p className="text-sm font-medium text-gray-500 opacity-75">
              {typeComponent === "AllFriend" && formatNumber(friends?.length)}
              {typeComponent === "RequestSent" &&
                `${formatNumber(f?.requestTo?.friends?.length)}`}
              {typeComponent === "Suggestions" &&
                `${formatNumber(f?.friends?.length)}`}{" "}
              Friends
            </p>
          )}
        </div>
      </div>
      <div className="ml-auto relative">
        {typeComponent === "RequestReceived" ? (
          <div className="flex gap-2">
            <button
              onClick={
                typeComponent === "AllFriend"
                  ? handleSubmit
                  : typeComponent === "RequestSent"
                  ? handleSubmit
                  : typeComponent === "RequestReceived" &&
                    handleSubmit(f._id, "accept")
              }
              className="text-sm transition-all ease-in-out duration-100 text-white bg-blue-600 bg-opacity-85 flex items-center justify-center hover:bg-blue-700 hover:opacity-85 font-medium py-[6px] px-5 rounded-[4px] select-none"
            >
              Acpect
            </button>
            <button
              onClick={
                typeComponent === "AllFriend"
                  ? handleSubmit
                  : typeComponent === "RequestSent"
                  ? handleSubmit
                  : typeComponent === "RequestReceived" &&
                    handleSubmit(f._id, "deny")
              }
              className="text-sm transition-all ease-in-out duration-100 text-white bg-gray-400 bg-opacity-85 flex items-center justify-center hover:bg-gray-500 hover:opacity-45 font-medium py-[6px] px-5 rounded-[4px] select-none"
            >
              Decline
            </button>
          </div>
        ) : (
          <ButtonLoading
            text={typeComponent != "Suggestions" ? buttonText : statusAddFr}
            className={clsx(
              "font-medium text-[14px] px-3 rounded-[4px]",
              className,
              typeComponent === "AllFriend"
                ? "!w-[92px] bg-red-500 hover:bg-red-600"
                : typeComponent === "RequestSent"
                ? "!w-[120px] bg-gray-500 hover:bg-gray-600"
                : typeComponent === "Suggestions" &&
                  statusAddFr === "Undo Friend" &&
                  "!bg-[#fefefe] !text-gray-700 !font-semibold !border-[2px] !border-gray-600 !hover:bg-[#fefefe]"
            )}
            handleSubmit={
              typeComponent === "Suggestions"
                ? handleSubmit(statusAddFr, setStatusAddFr)
                : handleSubmit
            }
            loading={loading}
          ></ButtonLoading>
        )}
        {/* <p className="text-[12px] tracking-wide font-semibold">Add Friend</p> */}
      </div>
    </li>
  );
};

export default FriendSideBar;
