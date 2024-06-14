/* eslint-disable react/prop-types */
import clsx from "clsx";
import { userApi } from "../../apis";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ItemSuggestFriend = ({ f }) => {
  const [statusAddFr, setStatusAddFr] = useState("Add Friend");

  const requestAddFriendMutation = useMutation({
    mutationFn: (friend_id) =>
      userApi.requestAddFriend({
        requestTo: friend_id,
      }),
    onSuccess: (requestFr) => {
      if (requestFr.sucess) {
        setStatusAddFr("Undo Request");
        toast.success(requestFr.message);
      }
    },
  });

  const undoRequestFriendMutation = useMutation({
    mutationFn: (friend_id) =>
      userApi.undoRequestFriend({
        requestTo: friend_id,
      }),
    onSuccess: (requestFr) => {
      if (requestFr.success) {
        setStatusAddFr("Add Friend");
        toast.success("Undo successfully !");
      }
    },
  });

  const handleAddFriend = (friend_id) => {
    try {
      // await requestAddFriendMutation.mutateAsync(friend_id);
      // console.log("before");
      requestAddFriendMutation.mutate(friend_id);
      // console.log("after");
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const handleUndoFriend = (request_friend_id) => {
    try {
      undoRequestFriendMutation.mutate(request_friend_id);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <li className="flex pb-2 pt-4 px-4 last:pb-0 items-center">
      <div className="flex">
        <NavLink to={`/profile/${f._id}`}>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={f?.profileUrl}
          />
        </NavLink>
        <NavLink
          to={`/profile/${f._id}`}
          className="ml-3 overflow-hidden text-[#737373]"
        >
          <p className="text-sm font-medium text-black hover:underline">
            {f.firstName} {f.lastName}
          </p>
          <p className="text-sm ">{f.friends.length} Friends</p>
        </NavLink>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => {
            statusAddFr === "Add Friend"
              ? handleAddFriend(f._id)
              : handleUndoFriend(f._id);
          }}
          className={clsx(
            "text-[12px] font-semibold hover:text-[#00376b]",
            statusAddFr === "Add Friend" ? "text-[#0095F6]" : "text-gray-500"
          )}
        >
          {statusAddFr}
        </button>
      </div>
    </li>
  );
};

const SuggestFriend = ({ className }) => {
  // const queryClient = useQueryClient();
  const { data: suggested } = useQuery({
    queryKey: ["getSuggestFriend"],
    queryFn: () => userApi.getSuggestFriend({ limit: 3 }),
  });

  if (!suggested?.data || suggested?.data.length <= 0) return;
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex items-center justify-between py-1 px-4 text-[14px] font-semibold text-[#737373]">
        <span className="">Suggested for you</span>
        <NavLink
          to="/friend/suggestions"
          className="text-[#000] hover:text-[#737373] text-[12px]"
        >
          See All
        </NavLink>
      </div>
      <ul role="list" className="">
        {suggested?.data &&
          suggested?.data.map((f) => <ItemSuggestFriend key={f._id} f={f} />)}
      </ul>
    </div>
  );
};

export default SuggestFriend;
