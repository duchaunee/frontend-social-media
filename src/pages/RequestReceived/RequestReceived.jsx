import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../../apis/user.api";
import toast from "react-hot-toast";
import EmptyData from "../../components/EmptyData";
import FriendSideBar from "../../components/FriendSideBar";

const RequestReceived = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getRequestFriendReceived"],
    queryFn: () => userApi.getRequestFriendReceived({ limit: 999999 }),
  });

  const responseRequestFriendMutation = useMutation({
    mutationFn: ({ status, rid }) => {
      return userApi.responseRequestFriend({
        rid,
        status,
      });
    },
    onSuccess: (requestFr) => {
      if (requestFr.success) {
        queryClient.invalidateQueries({
          queryKey: ["getRequestFriendReceived"],
        });
        toast.success(requestFr.message);
      }
    },
  });
  const responseFriend = (status, rid) => () => {
    try {
      responseRequestFriendMutation.mutate({ status, rid });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const friends = data?.data;

  if (!isLoading && (!friends || friends?.length <= 0))
    return <EmptyData></EmptyData>;

  if (!isLoading)
    return (
      <div className="bg-[#f9fafb] h-full px-6 py-6 rounded-md flex flex-col items-center">
        {/* body */}
        <div className="pb-4 my-8 rounded-xl flex gap-6 flex-col">
          <h1 className="text-[24px] font-medium">Requests Received</h1>
          <div className="w-[600px] bg-[#fefefe] shadow-shadowPrimary rounded-sm p-6 flex flex-col gap-6">
            {friends.map((f) => (
              <FriendSideBar
                key={f._id}
                f={f}
                typeComponent="RequestReceived"
                buttonText="Undo Request"
                handleSubmit={(_id, status) => responseFriend(status, _id)}
                // handleSubmit={() => {}}
                // loading={undoFriendMutation.isPending}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default RequestReceived;
