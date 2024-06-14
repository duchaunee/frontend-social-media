import { useContext } from "react";
import SuggestFriend from "../../components/SuggestFriend/SuggestFriend";
import { AppContext } from "../../contexts/app.context";
import FriendRequestReceived from "../../components/FriendRequestReceived/FriendRequestReceived";
import PostsHome from "../../components/Posts/Posts.home";

const SwitchAccount = () => {
  const { user } = useContext(AppContext);

  return (
    <li className="flex pb-2 pt-4 px-4 last:pb-0 items-center">
      <div className="flex">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user?.profileUrl}
        />
        <div className="ml-3 overflow-hidden text-[#737373]">
          <p className="text-sm font-medium text-black">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm truncate">Switch other account</p>
        </div>
      </div>
      <div className="ml-auto">
        <button className="text-[12px] text-[#0095F6] font-semibold hover:text-[#00376b]">
          Switch
        </button>
      </div>
    </li>
  );
};

const Home = () => {
  return (
    <div className="flex justify-center mt-9">
      <ul className="max-w-[1400px] pr-16">
        <PostsHome></PostsHome>
      </ul>
      <div className="w-[320px] ml-16">
        <SwitchAccount></SwitchAccount>
        <SuggestFriend className="mt-4 mb-2"></SuggestFriend>
        <FriendRequestReceived className="mt-4 mb-2"></FriendRequestReceived>
      </div>
    </div>
  );
};

export default Home;
