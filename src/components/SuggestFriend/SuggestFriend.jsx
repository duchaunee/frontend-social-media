/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { userApi } from "../../apis";
import toast from "react-hot-toast";

const SuggestFriend = ({ className }) => {
  const [suggested, setSuggested] = useState([]);

  const getSuggestFriend = async () => {
    const suggestFr = await userApi.getSuggestFriend({ limit: 3 });
    if (suggestFr.success) {
      setSuggested(suggestFr.data);
    }
  };
  useEffect(() => {
    getSuggestFriend();
  }, []);

  const handleAddFriend = async (friend_id) => {
    try {
      const requestFr = await userApi.requestAddFriend({
        requestTo: friend_id,
      });
      if (requestFr.sucess) {
        toast.success(requestFr.message);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  if (suggested?.length <= 0) return;
  return (
    <div className={clsx("w-[320px]", className)}>
      <div className="flex items-center justify-between py-1 px-4 text-[14px] font-semibold text-[#737373]">
        <span className="">Suggested for you</span>
        <button className="text-[#000] hover:text-[#737373] text-[12px]">
          See All
        </button>
      </div>
      <ul role="list" className="divide-y divide-slate-200">
        {/* Remove top/bottom padding when first/last child */}
        {suggested &&
          suggested.map((f) => (
            <li
              key={f._id}
              className="flex pb-2 pt-4 px-4 last:pb-0 items-center"
            >
              <div className="flex">
                <img
                  className="h-10 w-10 rounded-full"
                  src={f?.profileUrl}
                  alt
                />
                <div className="ml-3 overflow-hidden text-[#737373]">
                  <p className="text-sm font-medium text-black">
                    {f.firstName} {f.lastName}
                  </p>
                  <p className="text-sm ">{f.friends.length} Friends</p>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleAddFriend(f._id)}
                  className="text-[12px] text-[#0095F6] font-semibold hover:text-[#00376b]"
                >
                  Add Friend
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SuggestFriend;
