/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { userApi } from "../../apis";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const RequestItem = ({ f }) => {
  const [openModal, setOpenModal] = useState();
  const requestFrom = f.requestFrom;
  return (
    <li
      key={requestFrom._id}
      className="flex pb-2 pt-4 px-4 last:pb-0 items-center"
    >
      <div className="flex">
        <img
          className="h-10 w-10 rounded-full"
          src={requestFrom?.profileUrl}
          alt
        />
        <div className="ml-3 overflow-hidden text-[#737373]">
          <p className="text-sm font-medium text-black">
            {requestFrom.firstName} {requestFrom.lastName}
          </p>
          <p className="text-sm ">{f?.requestStatus}</p>
        </div>
      </div>
      <div className="ml-auto relative">
        {openModal && (
          <ConfirmDialog
            setOpenModal={setOpenModal}
            body={true}
          ></ConfirmDialog>
        )}
        <button
          // onClick={() => handleResponseFriend(f._id)}
          onClick={() => setOpenModal((prev) => !prev)}
          className="text-[12px] text-[#0095F6] font-semibold hover:text-[#00376b]"
        >
          Response
        </button>
      </div>
    </li>
  );
};

const FriendRequestReceived = ({ className }) => {
  const [requestReceived, setRequestReceived] = useState([]);

  const getRequestReceived = async () => {
    const requestFrReceived = await userApi.getRequestFriendReceived({
      limit: 3,
    });
    if (requestFrReceived.sucess) {
      setRequestReceived(requestFrReceived.data);
    }
  };
  useEffect(() => {
    getRequestReceived();
  }, []);

  if (requestReceived?.length <= 0) return;
  return (
    <div className={clsx("w-[320px]", className)}>
      <div className="flex items-center justify-between py-1 px-4 text-[14px] font-semibold text-[#737373]">
        <span className="">Friend Requests</span>
        <button className="text-[#000] hover:text-[#737373] text-[12px]">
          See All
        </button>
      </div>
      <ul role="list" className="divide-y divide-slate-200">
        {requestReceived &&
          requestReceived.map((f) => (
            <RequestItem key={f._id} f={f}></RequestItem>
          ))}
      </ul>
    </div>
  );
};

export default FriendRequestReceived;
