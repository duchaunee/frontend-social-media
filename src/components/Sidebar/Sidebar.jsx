/* eslint-disable react/prop-types */
import { IconCreate, IconMessenger } from "../../assets/Icon";
import { logo } from "../../assets/images";
import { Heart, HomeSVG, LogoutSVG, Search, Settings } from "../../assets/svg";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { authApi } from "../../apis";
import toast from "react-hot-toast";
import { useContext, useRef } from "react";
import { AppContext } from "../../contexts/app.context";
// import LoadingBar from "react-top-loading-bar";
import PeopleImage from "../../assets/icon-image/PeopleImage";
import RequestSent from "../../assets/icon-image/RequestSent";
import RequestReceived from "../../assets/icon-image/RequestReceived";
import Suggestions from "../../assets/icon-image/Suggestions";
import { useQueryClient } from "@tanstack/react-query";

const ItemSideBar = ({
  children,
  reload = false,
  icon,
  to,
  className,
  onClick,
}) => {
  const LinkComponent = onClick ? "button" : NavLink;

  // const linkProp = onClick ? { onClick: onClick } : { to: to };
  const linkProp = onClick ? { onClick } : { to };

  const linkProps = {};
  if (LinkComponent === NavLink) {
    linkProps.style = ({ isActive }) => ({
      backgroundColor: isActive ? "#efefef" : "",
    });
  }

  return (
    <LinkComponent
      {...linkProps}
      className={clsx(
        "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-100 gap-[6px] overflow-hidden",
        className
      )}
      {...linkProp}
    >
      {icon}
      <span className="ml-2 text-sm font-medium">{children}</span>
    </LinkComponent>
  );
};

const Sidebar = ({ children }) => {
  // const refLoadingBar = useRef(null);
  const navigate = useNavigate();
  const { setIsAuthentication, user, setOverlayPostId } =
    useContext(AppContext);

  // const queryClient = useQueryClient();
  const handleLogout = async () => {
    await new Promise((resolve, reject) => {
      // refLoadingBar.current.continuousStart(0, 300);
      setTimeout(async () => {
        try {
          const resLogout = await authApi.logout();
          if (resLogout.status === "OK") {
            // refLoadingBar.current.complete();
            setIsAuthentication(false);
            // queryClient.invalidateQueries({
            //   queryKey: ["getMe"],
            // });
            navigate("/login");
            // window.location.replace("/login");
            resolve();
          }
        } catch (error) {
          reject();
          toast.error(error.message);
          // window.location.reload();
        }
      }, 500);
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* <LoadingBar
        ref={refLoadingBar}
        color="linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)"
        height={4}
      /> */}

      <div className="flex flex-col items-center w-[248px] px-3 pt-2 pb-5 h-full overflow-hidden text-gray-700 bg-gray-50 bg-opacity-20 border-r-[1px] border-gray-200 rounded fixed">
        <div className="pt-[25px] pb-4 px-3">
          <img src={logo} className="h-10" alt="" />
        </div>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
            <ItemSideBar icon={<HomeSVG />} to="/">
              Home
            </ItemSideBar>
            <ItemSideBar icon={<PeopleImage />} to="/friend/all">
              All friends
            </ItemSideBar>
            <ItemSideBar icon={<RequestSent />} to="/friend/sent">
              Requests Sent
            </ItemSideBar>
            <ItemSideBar icon={<RequestReceived />} to="/friend/received">
              Requests Received
            </ItemSideBar>
            <ItemSideBar icon={<Suggestions />} to="/friend/suggestions">
              Suggestions
            </ItemSideBar>
            <ItemSideBar
              icon={
                <img
                  src={user?.profileUrl}
                  className="w-6 rounded-full object-cover aspect-square"
                />
              }
              to="/profile/me"
            >
              Profile
            </ItemSideBar>
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
            <ItemSideBar
              className="cursor-not-allowed"
              icon={<Search />}
              to="/search"
              onClick={() => toast.error("The feature is currently maintain.")}
            >
              Search
            </ItemSideBar>
            <ItemSideBar
              className="cursor-not-allowed"
              icon={<IconCreate />}
              onClick={() => {
                // setOverlayPostId("create") ĐANG LÀM DỞ
                toast.error("The feature is currently maintain.");
              }}
            >
              Create
            </ItemSideBar>
            <ItemSideBar
              className="cursor-not-allowed"
              icon={<IconMessenger />}
              to="/"
              onClick={() => toast.error("The feature is currently maintain.")}
            >
              Messages
            </ItemSideBar>
            <ItemSideBar
              className="cursor-not-allowed"
              icon={<Heart />}
              to="/"
              onClick={() => toast.error("The feature is currently maintain.")}
            >
              Notifications
            </ItemSideBar>
            <ItemSideBar
              className="cursor-not-allowed"
              icon={<Settings />}
              to="/"
              onClick={() => toast.error("The feature is currently maintain.")}
            >
              Settings
            </ItemSideBar>
          </div>
        </div>
        <ItemSideBar
          className="mt-auto"
          icon={<LogoutSVG />}
          onClick={handleLogout}
        >
          Log out
        </ItemSideBar>
      </div>
      <div className="ml-[248px] h-full">{children}</div>
    </div>
  );
};

export default Sidebar;
