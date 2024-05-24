import { IconComment, IconHeart, IconSave, IconShare } from "../../assets/Icon";
import { ThreeDot } from "../../assets/svg";

const PostItem = () => {
  return (
    <li className="bg-white max-w-xl mx-3 last:border-0 border-b-[1px] border-gray-300 ">
      <div className="py-4 text-gray-800 px-[-12px]">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 aspect-square">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shoes-shopping-web.appspot.com/o/image%2030.04.1975%2Favtdepnehihi.jpg?alt=media&token=4b0b6169-3380-4c2a-a816-adcf07a4a4e3"
                alt="millionaires-formula"
                className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5"
              />
            </div>
            <h6 className="font-medium text-sm">duchaunee</h6>
            <span className="text-gray-500 text-2xl">·</span>
            <span className="text-gray-500 text-xs">3 m</span>
          </div>
          <div>
            <ThreeDot
              className="cursor-pointer"
              onClick={() => console.log("click")}
            ></ThreeDot>
          </div>
        </div>
        <div className="py-3 w-full h-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shoes-shopping-web.appspot.com/o/image%2030.04.1975%2Favtdepnehihi.jpg?alt=media&token=4b0b6169-3380-4c2a-a816-adcf07a4a4e3"
            alt="meme-1"
            className="rounded object-cover aspect-square"
          />
        </div>
        {/* Like Sections */}
        <div className="flex justify-between">
          <div className="flex space-x-4 items-center justify-center">
            <IconHeart
              className="cursor-pointer hover:text-gray-700"
              active={true}
            ></IconHeart>
            <IconComment className="cursor-pointer hover:text-gray-700"></IconComment>
            <IconShare className="mt-1 cursor-pointer hover:text-gray-700"></IconShare>
          </div>
          <IconSave className="cursor-pointer"></IconSave>
        </div>
        <div className="my-2 font-medium text-sm">4,047 likes</div>
        <div className="flex space-x-2 text-sm">
          <a
            href="https://www.instagram.com/millionairesformula/"
            className="font-medium"
          >
            millionairesformula
          </a>
          <p>Just Don’t give up👊🔥...</p>
        </div>
        <div className="text-sm text-gray-500 py-2 cursor-pointer">
          View all 13 comments
        </div>
      </div>
    </li>
  );
};

export default PostItem;
