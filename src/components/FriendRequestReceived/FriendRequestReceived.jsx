/* eslint-disable react/prop-types */
import clsx from "clsx";
import { userApi } from "../../apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const RequestItem = ({ f }) => {
  const queryClient = useQueryClient();

  const { requestFrom, _id } = f; //_id của người nhận lời mời

  const responseRequestFriendMutation = useMutation({
    mutationFn: (status) =>
      userApi.responseRequestFriend({
        rid: _id,
        status,
      }),
    onSuccess: (requestFr) => {
      console.log("requestFr: ", requestFr);
      if (requestFr.success) {
        queryClient.invalidateQueries({
          queryKey: ["getRequestFriendReceived"],
        });
        toast.success(requestFr.message);
      }
    },
  });

  const responseFriend = (status) => () => {
    responseRequestFriendMutation.mutate(status);
  };

  return (
    <li
      key={requestFrom._id} //id của người gửi lời mời
      className="flex pb-2 pt-4 last:pb-0 items-center"
    >
      <div className="flex">
        <NavLink to={`/profile/${requestFrom._id}`}>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={requestFrom?.profileUrl}
          />
        </NavLink>
        <div className="ml-3 flex flex-col gap-1 text-[#737373]">
          <NavLink
            to={`/profile/${requestFrom._id}`}
            className="hover:underline"
          >
            <p className="text-sm font-medium text-black">
              {requestFrom.firstName} {requestFrom.lastName}
            </p>
          </NavLink>

          <div className="flex gap-2">
            <button
              onClick={responseFriend("accept")}
              className="text-[13px] text-blue-500 font-medium hover:text-[#00376b]"
            >
              Acpect
            </button>
            <button
              onClick={responseFriend("deny")}
              className="text-[13px] text-gray-400 font-medium hover:text-[#00376b]"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
      <div className="ml-auto relative">
        <p className="text-[12px] tracking-wide font-semibold">
          {f?.requestStatus}
        </p>
      </div>
    </li>
  );
};

const FriendRequestReceived = ({ className }) => {
  const { data } = useQuery({
    queryKey: ["getRequestFriendReceived"],
    queryFn: () =>
      userApi.getRequestFriendReceived({
        limit: 4,
      }),
  });

  const requestReceived = data?.data;

  if (!requestReceived || requestReceived?.length <= 0) return;
  return (
    <div className={clsx("w-[320px]", className)}>
      <div className="flex items-center justify-between py-1 px-4 text-[14px] font-semibold text-[#737373]">
        <span className="">Friend Requests</span>
        <NavLink
          to="/friend/received"
          className="text-[#000] hover:text-[#737373] text-[12px]"
        >
          See All
        </NavLink>
      </div>
      <ul role="list" className="px-4">
        {requestReceived &&
          requestReceived.map((f) => (
            <RequestItem key={f._id} f={f}></RequestItem>
          ))}
      </ul>
    </div>
  );
};

export default FriendRequestReceived;
