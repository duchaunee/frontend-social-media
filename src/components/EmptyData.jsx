import { Link } from "react-router-dom";

const EmptyData = ({ hasText = true }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="">
        <img className="w-[180px]" src="/empty-box.png" alt="" />
      </div>
      {hasText && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[24px] font-semibold">No data found</h1>
          <p className="mt-5 mb-2">
            Looks like you don't have any friends yet,{" "}
          </p>
          <p>
            Click
            <Link
              to="/friend/suggestions"
              className="text-blue-500 underline font-medium mx-[6px]"
            >
              Suggestions
            </Link>
            to add new friends
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyData;
