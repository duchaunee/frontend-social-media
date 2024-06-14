import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../apis";
import toast from "react-hot-toast";
import EmptyData from "../../components/EmptyData";
import FriendSideBar from "../../components/FriendSideBar";

const Suggestions = () => {
  // const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getSuggestFriend"],
    queryFn: () => userApi.getSuggestFriend({ limit: 999999 }),
  });

  const requestAddFriendMutation = useMutation({
    mutationFn: (friend_id) =>
      userApi.requestAddFriend({
        requestTo: friend_id,
      }),
    onSuccess: (requestFr) => {
      if (requestFr.sucess) {
        // setStatusAddFr("Undo Request");
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
        // setStatusAddFr("Add Friend");
        toast.success("Undo successfully !");
      }
    },
  });

  const handleAddFriend = (request_friend_id, setStatusAddFr) => async () => {
    console.log("request_friend_id: ", request_friend_id);
    try {
      await requestAddFriendMutation.mutateAsync(request_friend_id);
      setStatusAddFr("Undo Friend");
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const handleUndoFriend = (request_friend_id, setStatusAddFr) => async () => {
    console.log("request_friend_id: ", request_friend_id);
    try {
      await undoRequestFriendMutation.mutateAsync(request_friend_id);
      setStatusAddFr("Add Friend");
    } catch (error) {
      console.log(error);
      toast(error.message);
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
          <h1 className="text-[24px] font-medium">Suggestions</h1>
          <div className="w-[600px] bg-[#fefefe] shadow-shadowPrimary rounded-sm p-6 flex flex-col gap-6">
            {friends.map((f) => (
              <FriendSideBar
                key={f._id}
                f={f}
                typeComponent="Suggestions"
                handleSubmit={(statusAddFr, setStatusAddFr) => {
                  if (statusAddFr === "Add Friend")
                    return handleAddFriend(f._id, setStatusAddFr);
                  if (statusAddFr === "Undo Friend")
                    return handleUndoFriend(f._id, setStatusAddFr);
                }}
                // loading={undoFriendMutation.isPending}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Suggestions;
