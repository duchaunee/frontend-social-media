import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../apis";
import EmptyData from "../../components/EmptyData";
import FriendSideBar from "../../components/FriendSideBar";
import toast from "react-hot-toast";

const RequestSent = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getFriendSent"],
    queryFn: () => userApi.getAllFriendSent(),
  });

  const undoFriendMutation = useMutation({
    mutationFn: (friend_request_id) =>
      userApi.undoRequestFriend({
        requestTo: friend_request_id,
      }),
    onSuccess: (requestFr) => {
      if (requestFr.success) {
        queryClient.invalidateQueries({
          queryKey: ["getFriendSent"],
        });
        toast.success(requestFr.message);
      }
    },
  });

  const handleUndoRequest = (friend_request_id) => {
    try {
      undoFriendMutation.mutate(friend_request_id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const friends = data?.data;
  const length = data?.length;

  if (!isLoading && (!friends || length <= 0)) return <EmptyData></EmptyData>;

  if (!isLoading)
    return (
      <div className="bg-[#f9fafb] h-full px-6 py-6 rounded-md flex flex-col items-center">
        {/* body */}
        <div className="pb-4 my-8 rounded-xl flex gap-6 flex-col">
          <h1 className="text-[24px] font-medium">Requests Sent</h1>
          <div className="w-[600px] bg-[#fefefe] shadow-shadowPrimary rounded-sm p-6 flex flex-col gap-6">
            {friends.map((f) => (
              <FriendSideBar
                key={f._id}
                f={f}
                typeComponent="RequestSent"
                buttonText="Undo Request"
                handleSubmit={() => handleUndoRequest(f.requestTo._id)}
                // loading={undoFriendMutation.isPending}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default RequestSent;
