/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../apis";
import EmptyData from "../../components/EmptyData";
import FriendSideBar from "../../components/FriendSideBar";
import toast from "react-hot-toast";

const AllFriend = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllFriends"],
    queryFn: () => userApi.getAllFriends(),
  });

  const unfriendMutation = useMutation({
    mutationFn: (friend_id) =>
      userApi.unfriend({
        friend_id,
      }),
    onSuccess: (requestFr) => {
      if (requestFr.success) {
        queryClient.invalidateQueries({
          queryKey: ["getAllFriends"],
        });
        toast.success(requestFr.message);
      }
    },
  });

  const handleUnfriend = (friend_id) => {
    try {
      unfriendMutation.mutate(friend_id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const friends = data?.data;
  const length = data?.length;

  //nếu fetch xong rồi mà k có friend/friend = []
  if (!isLoading && (!friends || length <= 0)) return <EmptyData></EmptyData>;

  if (!isLoading)
    return (
      <div className="bg-[#f9fafb] h-full px-6 py-6 rounded-md flex flex-col items-center">
        {/* body */}
        <div className="pb-4 my-8 rounded-xl flex gap-6 flex-col">
          <h1 className="text-[24px] font-medium">All Friends</h1>
          <div className="w-[600px] bg-[#fefefe] shadow-shadowPrimary rounded-sm p-6 flex flex-col gap-6">
            {friends.map((f) => (
              <FriendSideBar
                key={f._id}
                f={f}
                typeComponent="AllFriend"
                title="All friends"
                buttonText="Unfriend"
                handleSubmit={() => handleUnfriend(f._id)}
                // loading={unfriendMutation.isPending}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default AllFriend;
