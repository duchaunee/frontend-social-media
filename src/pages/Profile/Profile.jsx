/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { useContext, useLayoutEffect } from "react";
import { ProfileSettingSVG } from "../../assets/svg";

import ButtonPrimary from "../../components/Button/ButtonPrimary.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi, userApi } from "../../apis";
import { AppContext } from "../../contexts/app.context";
import toast from "react-hot-toast";
import { useState } from "react";
import EmptyData from "../../components/EmptyData";
import { useEffect } from "react";

const ButtonGenerate = ({ type, friend_id: id, resultUser }) => {
  const { id: userId } = useParams();
  let relationshipStatus = null,
    rid = null;

  const [relationshipData, setRelationshipData] = useState(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const getRelationship = async () => {
      if (id !== "me") {
        const result = await userApi.getRelationship({
          friend_id: id,
        });
        setRelationshipData(result.relationship);
      }
    };
    getRelationship();
  }, [done]);

  relationshipStatus = relationshipData?.status?.trim();
  rid = relationshipData?.rid?.trim(); //danh cho received --> dung de post acpect/deny

  const handleUnfriend = async (friend_id) => {
    try {
      const result = await userApi.unfriend({
        friend_id,
      });
      setDone((done) => !done);
      toast.success(result.message, {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUndoFriend = async (friend_id) => {
    try {
      const result = await userApi.undoRequestFriend({
        requestTo: friend_id,
      });
      setDone((done) => !done);
      toast.success(result.message, {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResponseFriend = async (rid, status) => {
    try {
      const result = await userApi.responseRequestFriend({
        rid,
        status,
      });
      setDone((done) => !done);
      window.location.reload();
      toast.success(result.message, {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddFriend = async (friend_id) => {
    try {
      const result = await userApi.requestAddFriend({
        requestTo: friend_id,
      });
      setDone((done) => !done);
      toast.success(result.message, {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (userId === "me") return;
  if (type === "received" && relationshipStatus === "received") {
    return (
      <div className="w-full text-base font-semibold text-gray-700 px-6">
        <div className="flex items-center justify-between p-4 bg-[#f7f8fa] shadow-sm border border-gray-200 rounded-md">
          <span className="text-[#050505] font-medium">
            {resultUser.firstName} {resultUser.lastName} sent you a friend
            request
          </span>
          <div className="flex gap-4">
            <ButtonPrimary
              onClick={() => handleResponseFriend(rid, "accept")}
              text="Acpect Request"
              className="bg-blue-600 flex items-center justify-center hover:bg-blue-700 hover:opacity-85"
            ></ButtonPrimary>
            <ButtonPrimary
              onClick={() => handleResponseFriend(rid, "deny")}
              text="Decline Request"
              className="bg-gray-400 bg-opacity-85 flex items-center justify-center hover:bg-gray-500 hover:opacity-45"
            ></ButtonPrimary>
          </div>
        </div>
      </div>
    );
  } else if (type === "other")
    return relationshipStatus === "friend" ? (
      <div className="text-base font-semibold text-gray-700 mr-2 ">
        <ButtonPrimary
          onClick={() => handleUnfriend(id)}
          text="Unfriend"
          className="bg-red-500 hover:bg-red-600"
        ></ButtonPrimary>
      </div>
    ) : relationshipStatus === "sent" ? (
      <div className="text-base font-semibold text-gray-700 mr-2">
        <ButtonPrimary
          onClick={() => handleUndoFriend(id)}
          text="Undo Rrequest"
          className="bg-gray-500 hover:bg-gray-600"
        ></ButtonPrimary>
      </div>
    ) : (
      relationshipStatus === "suggestions" && (
        <div className="text-base font-semibold text-gray-700 mr-2">
          <ButtonPrimary
            onClick={() => handleAddFriend(id)}
            text="Add friend"
          ></ButtonPrimary>
        </div>
      )
    );
};

const PostItemUser = ({ p }) => {
  const { setOverlayPostId } = useContext(AppContext);

  return (
    <div className="grid-cols-1 text-center px-4 py-2 m-2 select-none ">
      <button
        onClick={() => setOverlayPostId(p._id)}
        className="relative group cursor-pointer"
      >
        <img
          className="w-full h-full object-cover rounded-sm cursor-pointer"
          src={p.image}
        />
        <div className="group-hover:flex hidden absolute inset-0 bg-[#00000040] items-center justify-center">
          <p className="text-white font-bold absolute z-2">See post</p>
        </div>
      </button>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let resultUser = null;
  const { user } = useContext(AppContext);

  const { data, isFetching } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => userApi.getUser(id),
    enabled: id !== "me",
  });

  const queryClient = useQueryClient();
  const { data: postResponse, isFetching: isFetchingPost } = useQuery({
    queryKey: ["getPostUser"],
    queryFn: () => postApi.getPostByUser(id === "me" ? user._id : id),
    staleTime: 0,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["getPostUser"],
    });
  }, [id]);

  if (id === "me") resultUser = user;
  else {
    resultUser = data?.result;
  }
  console.log("isFetchingPost: ", isFetchingPost);
  console.log("isFetching: ", isFetching);

  // console.log("isLoading, isFetching: ", isLoading, isFetching);
  /**
   * data bị cache --> isLoading là false, nó trả về cache user trước đó trong cache xong fetch ngầm và update lại user --> gây màn hình bị nhảy giao diện từ user cũ --> user mới
   * ---> SẼ CHECK bằng isFetching
   */
  const post = postResponse?.data;
  console.log("post: ", post);

  if (!resultUser || !post || isFetching || isFetchingPost) return;
  if (resultUser && !isFetching)
    return (
      <>
        <div className="bg-white h-auto px-48">
          <div className="flex md:flex-row-reverse flex-wrap p-3">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3 flex items-center">
                <span className=" text-gray-700 text-2xl mr-4">
                  {resultUser?.firstName} {resultUser?.lastName}
                </span>
                {id === "me" ? (
                  <div className="text-base font-semibold text-gray-700 mr-2">
                    <ButtonPrimary
                      onClick={() => navigate("/edit/profile")}
                      text="Edit Profile"
                    ></ButtonPrimary>
                  </div>
                ) : (
                  <ButtonGenerate
                    friend_id={id}
                    resultUser={resultUser}
                    type="other"
                  ></ButtonGenerate>
                )}
              </div>
              <div className="text-left pl-4 pt-3 flex gap-2">
                <span className="text-base font-medium text-gray-700 mr-2">
                  <b>{post?.length}</b> posts
                </span>
                <span className="text-base font-medium text-gray-700 mr-2">
                  <b>{resultUser?.friends?.length}</b> friends
                </span>
              </div>
              <div className="text-left pl-4 pt-3">
                <span className="text-lg font-medium text-gray-700 mr-2">
                  {resultUser?.location ? (
                    "@" + resultUser.location
                  ) : (
                    <i className="italic text-gray-300">
                      Pls update your location
                    </i>
                  )}
                </span>
              </div>
              <div className="text-left pl-4 pt-3">
                <div className="text-base font-medium text-blue-700 mr-2">
                  {resultUser && resultUser.profession?.length > 0 ? (
                    resultUser.profession.map((p) => (
                      <p className="inline pr-2" key={p}>
                        #{p.trim()}
                      </p>
                    ))
                  ) : (
                    <i className="italic text-gray-300">
                      Pls update your profession
                    </i>
                  )}
                </div>
                <p className="text-base font-medium text-gray-700 mr-2">
                  {resultUser.description || (
                    <i className="italic text-gray-300">
                      Pls update your description
                    </i>
                  )}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4 text-center flex justify-center items-end">
              <img
                className="h-[180px] aspect-square object-cover rounded-full"
                src={resultUser?.profileUrl}
              />
            </div>
          </div>

          <ButtonGenerate
            friend_id={id}
            resultUser={resultUser}
            type="received"
          ></ButtonGenerate>

          <hr className="border-gray-500 mt-4 mx-[24px]" />
          {/*post icon and title*/}
          <div className="flex flex-row mt-4 justify-center">
            <div className="flex text-gray-700 text-center py-2 m-2 pr-5 cursor-pointer group">
              <div className="inline-flex ">
                <button
                  className="border-transparent text-gray-800 rounded-full focus:outline-none focus:text-gray-600 group-hover:text-blue-600"
                  aria-label="Notifications"
                >
                  <ProfileSettingSVG></ProfileSettingSVG>
                </button>
              </div>
              <div className="inline-flex ml-2 mt-1">
                <h3 className="text-sm font-bold text-gray-800 mr-2 group-hover:text-blue-600 select-none">
                  POSTS
                </h3>
              </div>
            </div>
          </div>
          {/*post images*/}
          {post.length == 0 && !isFetchingPost && (
            <div className="mt-20">
              <EmptyData hasText={false}></EmptyData>
            </div>
          )}

          <div className="grid grid-cols-3 pt-4">
            {post?.map((p) => (
              <PostItemUser key={p._id} p={p}></PostItemUser>
            ))}
          </div>
        </div>
      </>
    );
};

export default Profile;
