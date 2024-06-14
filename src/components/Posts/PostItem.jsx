/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { IconComment, IconHeart, IconSave, IconShare } from "../../assets/Icon";
import { ThreeDot } from "../../assets/svg";
import { formatTimePost } from "../../utils";
import { postApi } from "../../apis";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/App.context";

const PostItem = ({ p }) => {
  const { user, setOverlayPostId } = useContext(AppContext);
  const author = p?.userId; //tĩnh
  const isLike = p.likes.some((id) => id === user?._id); //tĩnh

  const [totalLike, setTotalLike] = useState(p.likes.length); //động
  const [likeStatus, setLikeStatus] = useState(isLike); //động

  const likeOrUnlikeMutation = useMutation({
    mutationFn: (postId) => postApi.likeOrUnlikeAPost(postId),
    onSuccess: (requestFr) => {
      if (requestFr.sucess) {
        setLikeStatus(requestFr.isLike);
        setTotalLike(requestFr.data.likes.length);
      }
    },
  });

  const handleLike = () => {
    try {
      likeOrUnlikeMutation.mutate(p._id);
    } catch (e) {
      toast.error(e.message);
    }
  };

  //ban đầu props p chưa fetch api xong --> undefined
  //dùng useEffect để bắt nó setLikeStatus khi fetch xong
  useEffect(() => {
    setLikeStatus(isLike);
  }, [isLike]);

  if (!user) return;
  return (
    <li className="bg-white max-w-xl mx-3 last:border-0 border-b-[1px] border-gray-300 ">
      <div className="py-4 text-gray-800 px-[-12px]">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 aspect-square">
              <img
                src={author.profileUrl}
                alt="millionaires-formula"
                className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5"
              />
            </div>
            <h6 className="font-medium text-sm">
              {author.firstName} {author.lastName}
            </h6>
            <span className="text-gray-500 text-2xl">·</span>
            <span className="text-gray-500 text-xs">
              {formatTimePost(p.createdAt)}
            </span>
          </div>
          <div>
            {user._id === author._id && (
              <ThreeDot
                className="cursor-pointer"
                onClick={() => console.log("click")}
              ></ThreeDot>
            )}
          </div>
        </div>
        <div className="py-3 w-[576px] h-[576px]">
          <img
            src={p.image}
            className="w-full h-full rounded object-cover aspect-square"
          />
        </div>
        {/* Like Sections */}
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center justify-center">
            <IconHeart
              className="cursor-pointer hover:text-gray-700"
              active={likeStatus}
              onClick={handleLike}
            ></IconHeart>
            <IconComment
              onClick={() => setOverlayPostId(p._id)}
              className="cursor-pointer hover:text-gray-700"
            ></IconComment>
            <IconShare className="mt-1 hover:text-gray-700 cursor-not-allowed"></IconShare>
          </div>
          <IconSave className="cursor-not-allowed"></IconSave>
        </div>
        <div className="my-2 font-medium text-sm">{totalLike} likes</div>
        <div className="flex space-x-2 text-sm items-center">
          <button className="font-semibold">
            {author.firstName} {author.lastName}
          </button>
          <p className="">{p.description}</p>
        </div>
        <button
          onClick={() => setOverlayPostId(p._id)}
          className="text-sm text-gray-500 py-2 cursor-pointer"
        >
          {p.comments.length > 0
            ? `View all ${p.comments.length} comments`
            : "Click here to be the first to comment on this post"}
        </button>
      </div>
    </li>
  );
};
export default PostItem;
