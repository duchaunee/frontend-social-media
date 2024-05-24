/* eslint-disable react/jsx-key */

import { useContext, useEffect } from "react";
import { Tool } from "../assets/svg";

import ButtonPrimary from "../components/Button/ButtonPrimary.jsx";
import { AppContext } from "../contexts/App.context";

const Profile = () => {
  const { getMe, user } = useContext(AppContext);
  console.log("user: ", user);

  useEffect(() => {
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user)
    return (
      <>
        {/*profile data*/}
        <div className="bg-white h-auto px-48">
          <div className="flex md:flex-row-reverse flex-wrap p-3">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3 flex items-center">
                <span className=" text-gray-700 text-2xl mr-4">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-base font-semibold text-gray-700 mr-2">
                  <ButtonPrimary text="Edit Profile "></ButtonPrimary>
                </span>
                <div className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600 cursor-pointer">
                  <Tool></Tool>
                </div>
              </div>
              <div className="text-left pl-4 pt-3 flex gap-2">
                {/* {Array.fill(3).map((item) => {
                return <div className=""></div>;
              })} */}
                <span className="text-base font-medium text-gray-700 mr-2">
                  <b>220</b> posts
                </span>
                <span className="text-base font-medium text-gray-700 mr-2">
                  <b>{user?.friends.length}</b> friends
                </span>
              </div>
              <div className="text-left pl-4 pt-3">
                <span className="text-lg font-medium text-gray-700 mr-2">
                  {user?.location ? (
                    "@" + user.location
                  ) : (
                    <i className="italic text-gray-300">
                      Pls update your location
                    </i>
                  )}
                </span>
              </div>
              <div className="text-left pl-4 pt-3">
                <p className="text-base font-medium text-blue-700 mr-2">
                  {user && user.profession.length > 0 ? (
                    user.profession.map((p) => (
                      <p className="inline pr-2" key={p}>
                        #{p.trim()}
                      </p>
                    ))
                  ) : (
                    <i className="italic text-gray-300">
                      Pls update your profession
                    </i>
                  )}
                  {/* #graphicsdesigner #traveller #reader #blogger #digitalmarketer */}
                </p>
                <p className="text-base font-medium text-gray-700 mr-2">
                  {user.description || (
                    <i className="italic text-gray-300">
                      Pls update your description
                    </i>
                  )}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4 text-center flex justify-center items-end">
              <div className="w-full relative md:w-3/4 text-center flex justify-center">
                <button
                  className="flex rounded-full"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    className="h-[180px] w-[180px] rounded-full"
                    src={user?.profileUrl}
                  />
                </button>
              </div>
            </div>
          </div>

          <hr className="border-gray-500 mt-4 mx-[24px]" />
          {/*post icon and title*/}
          <div className="flex flex-row mt-4 justify-center mr-16">
            <div className="flex text-gray-700 text-center py-2 m-2 pr-5 cursor-pointer group">
              <div className="inline-flex ">
                <button
                  className="border-transparent text-gray-800 rounded-full focus:outline-none focus:text-gray-600 group-hover:text-blue-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="inline-flex ml-2 mt-1">
                <h3 className="text-sm font-bold text-gray-800 mr-2 group-hover:text-blue-600 select-none">
                  POSTS
                </h3>
              </div>
            </div>
            <div className="flex text-gray-700 text-center py-2 m-2 pr-5 group cursor-pointer">
              <div className="inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full group-hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className=" inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2 group-hover:text-blue-600 select-none">
                  IGTV
                </h3>
              </div>
            </div>
          </div>
          {/*post images*/}
          <div className="flex pt-4">
            <div className="flex-1 text-center px-4 py-2 m-2">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              />
            </div>
            <div className="flex-1 text-center px-4 py-2 m-2">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              />
            </div>
            <div className="flex-1 text-center px-4 py-2 m-2">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </div>
      </>
    );
};

export default Profile;
