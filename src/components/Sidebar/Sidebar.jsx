/* eslint-disable react/prop-types */
import { IconCompass, IconCreate, IconMessenger } from "../../assets/Icon";
import { logo } from "../../assets/images";
import { Heart, HomeSVG, LogoutSVG, Search, Settings } from "../../assets/svg";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { authApi } from "../../apis";
import toast from "react-hot-toast";
import { useContext, useRef } from "react";
import { AppContext } from "../../contexts/App.context";
import LoadingBar from "react-top-loading-bar";

const ItemSideBar = ({ children, icon, to, className, onClick }) => {
  const LinkComponent = onClick ? "button" : NavLink;

  // const linkProp = onClick ? { onClick: onClick } : { to: to };
  const linkProp = onClick ? { onClick } : { to };
  return (
    <LinkComponent
      className={clsx(
        "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-100 gap-[6px] overflow-hidden cursor-pointer",
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
  const refLoadingBar = useRef(null);
  const navigate = useNavigate();
  const { setIsAuthentication, setUser, user } = useContext(AppContext);

  const handleLogout = async () => {
    await new Promise((resolve, reject) => {
      refLoadingBar.current.continuousStart(0, 300);
      setTimeout(async () => {
        try {
          const resLogout = await authApi.logout();
          if (resLogout.status === "OK") {
            refLoadingBar.current.complete();
            setIsAuthentication(false);
            setUser(null);
            navigate("/login");
            // window.location.reload();
            resolve();
          }
        } catch (error) {
          reject();
          toast.error(error.message);
          window.location.reload();
        }
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col">
      <LoadingBar
        ref={refLoadingBar}
        color="linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)"
        height={4}
      />

      <div className="flex flex-col items-center w-[248px] px-3 pt-2 pb-5 h-full overflow-hidden text-gray-700 bg-gray-50 bg-opacity-20 border-r-[1px] border-gray-200 rounded fixed">
        <div className="pt-[25px] pb-4 px-3">
          <img src={logo} className="h-10" alt="" />
        </div>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
            <ItemSideBar icon={<HomeSVG />} to="/">
              Home
            </ItemSideBar>
            <ItemSideBar icon={<Search />} to="/">
              Search
            </ItemSideBar>
            <ItemSideBar icon={<IconCompass />} to="/">
              Explore
            </ItemSideBar>
            <ItemSideBar icon={<IconMessenger />} to="/">
              Messages
            </ItemSideBar>
            <ItemSideBar icon={<IconCreate />} to="/">
              Create
            </ItemSideBar>
            <ItemSideBar
              icon={
                <img
                  src={user?.profileUrl}
                  className="w-6 rounded-full aspect-square"
                />
              }
              to="/profile/hau"
            >
              Profile
            </ItemSideBar>
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
            <ItemSideBar className="cursor-not-allowed" icon={<Heart />} to="/">
              Notifications
            </ItemSideBar>
            <ItemSideBar
              className="cursor-not-allowed"
              icon={<Settings />}
              to="/"
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
      <div className="ml-[248px]">{children}</div>
    </div>
  );
};

export default Sidebar;
