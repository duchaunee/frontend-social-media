/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { userApi } from "../../apis";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useQuery } from "@tanstack/react-query";

const RequestItem = ({ f, data }) => {
  const { isOpen, handleSetOpenModal } = data;

  const { requestFrom, _id } = f; //_id của người nhận lời mời
  return (
    <li
      key={requestFrom._id} //id của người gửi lời mời
      className="flex pb-2 pt-4 px-4 last:pb-0 items-center"
    >
      <div className="flex">
        <img className="h-10 w-10 rounded-full" src={requestFrom?.profileUrl} />
        <div className="ml-3 overflow-hidden text-[#737373]">
          <p className="text-sm font-medium text-black">
            {requestFrom.firstName} {requestFrom.lastName}
          </p>
          <p className="text-sm ">{f?.requestStatus}</p>
        </div>
      </div>
      <div className="ml-auto relative">
        {isOpen && (
          <ConfirmDialog setOpenModal={() => {}} body={true}></ConfirmDialog>
        )}
        <button
          onClick={() => handleSetOpenModal(_id)}
          className="text-[12px] text-[#0095F6] font-semibold hover:text-[#00376b]"
        >
          Response
        </button>
      </div>
    </li>
  );
};

const FriendRequestReceived = ({ className }) => {
  const [openModal, setOpenModal] = useState([]);
  console.log("openModal: ", openModal);

  const { data, isSuccess } = useQuery({
    queryKey: ["getRequestFriendReceived"],
    queryFn: () =>
      userApi.getRequestFriendReceived({
        limit: 4,
      }),
  });

  const handleSetOpenModal = (id) => {
    const findIndexOpenModal = openModal.findIndex((item) => item.id == id);
    const newOpenModal = [...openModal]; //clone

    const newObj = {
      ...newOpenModal[findIndexOpenModal],
      isOpen: !newOpenModal[findIndexOpenModal].isOpen,
    };
    newOpenModal[findIndexOpenModal] = newObj;

    setOpenModal(newOpenModal);
  };

  const requestReceived = data?.data;
  useEffect(() => {
    /**
     * Nếu không check isSuccess thì khi isFetching, requestReceived là undefined -> res là
     * undefined -> setOpenModal(undefined) --> lúc này openModal là undefined --> openModal[idx] gây ra lỗi
     */
    if (isSuccess) {
      const res = requestReceived?.map((f) => ({
        id: f._id,
        isOpen: false,
      }));
      setOpenModal(res);
    }
  }, [isSuccess, requestReceived]);

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
          requestReceived.map((f, idx) => (
            <RequestItem
              key={f._id}
              f={f}
              data={{
                isOpen: openModal[idx]?.isOpen,
                handleSetOpenModal: handleSetOpenModal,
              }}
            ></RequestItem>
          ))}
      </ul>
    </div>
  );
};

export default FriendRequestReceived;
