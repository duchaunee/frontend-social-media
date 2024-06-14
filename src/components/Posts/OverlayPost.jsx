/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../contexts/app.context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../../apis";
import { IconComment, IconHeart, IconSave, IconShare } from "../../assets/Icon";
import { formatTimePost } from "../../utils";
import { ThreeDot } from "../../assets/svg";
import toast from "react-hot-toast";
import { useRef } from "react";

const OVERLAY_ROOT = document.querySelector("#overlay");

const CommentItem = ({ comment, hasReply }) => {
  const { user } = useContext(AppContext);
  const userComment = comment?.userId;
  // console.log("comment: ", comment);

  const isLike = comment?.likes.some((id) => id === user?._id); //tĩnh
  const [totalLike, setTotalLike] = useState(comment?.likes.length); //động
  const [likeStatus, setLikeStatus] = useState(isLike); //động

  const likeOrUnlikeMutation = useMutation({
    mutationFn: (commentId) => postApi.likeCommentOrReplyComment(commentId),
    onSuccess: (requestFr) => {
      if (requestFr.sucess) {
        setTotalLike(requestFr?.data.likes.length);
        setLikeStatus(requestFr.isLike);
      }
    },
  });

  const handleLikeComment = () => {
    try {
      likeOrUnlikeMutation.mutate(comment._id);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    setTotalLike(comment?.likes.length);
    setLikeStatus(isLike);
  }, [isLike]);

  if (!userComment) return;
  return (
    <div className="w-full">
      <div className="bg-white w-full flex justify-between">
        <div className="flex gap-4 items-start h-fit flex-1">
          <img
            className="w-[36px] h-[36px] object-cover rounded-full"
            src={userComment.profileUrl}
            alt=""
          />
          <div className="flex flex-col h-full gap-[6px]">
            <div className="gap-2">
              <h6 className="font-medium text-sm">
                {userComment.firstName} {userComment.lastName}
              </h6>
              <p className="text-sm text-gray-500 flex-wrap">
                {comment.comment}
              </p>
            </div>
            <div className="text-sm text-[12px] flex items-center gap-2 select-none">
              <p className=" text-gray-400 leading-3 text-[12px]">
                {formatTimePost(comment.createdAt)}
              </p>
              <div className="text-[12px] text-red-400 opacity-90">
                {totalLike} likes
              </div>
              <button className="text-[12px] hover:text-gray-400">Reply</button>
            </div>
          </div>
        </div>
        <IconHeart
          className="cursor-pointer hover:text-gray-700"
          active={likeStatus}
          size="18"
          onClick={handleLikeComment}
        ></IconHeart>
      </div>
      {/* {hasReply && (
        <div className="">
          <ReplyCommentItem u={u}></ReplyCommentItem>
          <ReplyCommentItem u={u}></ReplyCommentItem>
        </div>
      )} */}
    </div>
  );
};

const ReplyCommentItem = ({ u, hasReply }) => {
  const handleLikeReplyComment = () => {
    toast.error("The feature is currently maintain.");
  };

  return (
    <div className="w-full">
      <div className="bg-white w-full flex justify-between pl-[52px] pt-2">
        <div className="flex gap-4 items-start h-fit flex-1">
          <img
            className="w-[36px] h-[36px] object-cover rounded-full"
            src={u.profileUrl}
            alt=""
          />
          <div className="flex flex-col h-full gap-[6px]">
            <div className="gap-2">
              <h6 className="font-medium text-sm">
                {u.firstName} {u.lastName}
              </h6>
              <p className="text-sm text-gray-500 flex-wrap">
                okadiej dokasdiejdok okadiejdok asdiejdok oka diejd o ka sd
                iejdo k okadiejdo kasd
              </p>
            </div>
            <div className="text-sm text-[12px] flex items-center gap-2 select-none">
              <p className=" text-gray-400 leading-3">
                {/* {formatTimePost(u.createdAt)} */}1m
              </p>
              <button className="text-[12px] hover:text-gray-400">Reply</button>
            </div>
          </div>
        </div>
        <IconHeart
          className="cursor-pointer hover:text-gray-700"
          active={false}
          size="16"
          onClick={handleLikeReplyComment}
        ></IconHeart>
      </div>
      {hasReply && <div className="">Comment reply</div>}
    </div>
  );
};

const OverlayPost = () => {
  const [commentValue, setCommentValue] = useState("");
  const [listComment, setListComment] = useState(null);
  const commentValueRef = useRef(null); //de click vao icon comment --> focus vao input
  // console.log("listComment: ", listComment);

  const { user, overlayPostId, setOverlayPostId } = useContext(AppContext);

  const [totalLike, setTotalLike] = useState(0); //động
  const [likeStatus, setLikeStatus] = useState(false); //động

  const queryClient = useQueryClient();
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["getPost"],
    queryFn: () => postApi.getPost(overlayPostId),
    enabled: overlayPostId !== null || overlayPostId === "create",
  });

  const {
    data: comments,
    isFetching: isFetchingComments,
    isSuccess: isSuccessComments,
  } = useQuery({
    queryKey: ["getAllCommnet"],
    queryFn: () => postApi.getAllCommentFromPost(overlayPostId),
    enabled: overlayPostId !== null || overlayPostId === "create",
  });

  const post = data?.data;
  const author = post?.userId;

  const isLike = post?.likes.some((id) => id === user?._id); //tĩnh

  const likeOrUnlikeMutation = useMutation({
    mutationFn: (postId) => postApi.likeOrUnlikeAPost(postId),
    onSuccess: (requestFr) => {
      if (requestFr.sucess) {
        setLikeStatus(requestFr.isLike);
        setTotalLike(requestFr.data.likes.length);
      }
    },
  });

  const commentMutation = useMutation({
    mutationFn: ({ postId, body }) => postApi.commentAPost(postId, body),
    onSuccess: ({ newComment }) => {
      const newListComment = [...listComment];
      newListComment.push(newComment);

      setListComment(newListComment);
      setCommentValue("");
      // toast.success(requestFr.message);
    },
  });

  const handleLike = () => {
    try {
      likeOrUnlikeMutation.mutate(post._id);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleComment = () => {
    if (commentValue === "") return;
    try {
      commentMutation.mutate({
        postId: post._id,
        body: {
          comment: commentValue,
          from: user._id,
        },
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTotalLike(post?.likes.length);
      setLikeStatus(isLike);
    }
    if (isSuccessComments) {
      setListComment(comments?.data);
    }
  }, [data, comments]);

  if (!data || isFetching || isFetchingComments || !listComment) return;
  if (!overlayPostId) return;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-hidden flex justify-center z-[9999]">
      <div className="w-full flex items-center justify-center">
        <div className="w-[1230px] h-[800px] flex mx-auto bg-white rounded-xl shadow-shadowHover overflow-hidden">
          <div className="LEFT w-[800px] h-full">
            <img className="w-full h-full ojbect-cover" src={post.image} />
          </div>
          <div className="RIGHT flex-1 relative py-4 flex flex-col justify-between border border-b-0 border-r-0 border-t-0 border-gray-200">
            <div className="RIGHT-TOP mt-[-16px] w-full">
              <div className="px-4 py-4 bg-rwhite border boreder-gray-200 w-full flex flex-col gap-2">
                <div className="bg-rwhite w-full flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      className="w-[36px] h-[36px] object-cover rounded-full"
                      src={author.profileUrl}
                      alt=""
                    />
                    <h6 className="font-medium text-sm">
                      {author.firstName} {author.lastName}
                    </h6>
                  </div>
                  <ThreeDot
                    className="cursor-pointer"
                    onClick={() => console.log("click")}
                  ></ThreeDot>
                </div>
                <h6 className="text-sm text-gray-600">{post.description}</h6>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-5 overflow-y-auto">
              {listComment.map((comment) => (
                <CommentItem
                  key={comment._id}
                  hasReply={true}
                  comment={comment}
                ></CommentItem>
              ))}
            </div>
            <div className="RIGHT-BOTTOM mb-[-16px] border border-gray-200">
              <div className="px-4 py-2">
                <div className="w-full flex justify-between pt-2">
                  <div className="flex space-x-4 items-center justify-center">
                    <IconHeart
                      className="cursor-pointer hover:text-gray-700"
                      active={likeStatus}
                      onClick={handleLike}
                    ></IconHeart>
                    <IconComment
                      className="cursor-pointer hover:text-gray-700"
                      onClick={() => commentValueRef.current.focus()}
                    ></IconComment>
                    <IconShare className="mt-1 hover:text-gray-700 cursor-not-allowed"></IconShare>
                  </div>
                  <IconSave className="cursor-not-allowed"></IconSave>
                </div>
                <div className="my-2 font-medium text-sm">
                  {totalLike} likes
                </div>
                <div className="my-2 text-[12px] text-gray-700">
                  {formatTimePost(post.createdAt)}
                </div>
              </div>
              <div className="w-full h-[52px] py-[6px] px-4 bg-white pr-4 border border-gray-200 flex items-center gap-4">
                <input
                  className="w-full"
                  type="text"
                  ref={commentValueRef}
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") handleComment();
                  }}
                  placeholder="Add a comment"
                />
                <button
                  disabled={commentValue === ""}
                  onClick={handleComment}
                  className="font-bold text-primary opacity-70 hover:opacity-100"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setOverlayPostId(null)}
        className="absolute top-6 right-6 font-medium text-[18px] text-white"
      >
        Close
      </button>
    </div>,
    OVERLAY_ROOT
  );
};

export default OverlayPost;
