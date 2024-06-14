import { useQuery } from "@tanstack/react-query";
import { postApi } from "../../apis";
import PostItem from "./PostItem";

const PostsHome = () => {
  const { data } = useQuery({
    queryKey: ["getAllPost"],
    queryFn: () => postApi.getAllPost(),
  });
  if (!data) return "LOADING POST...";

  const { data: posts } = data;
  return (
    <div>
      {posts.map((p) => (
        <PostItem key={p._id} p={p}></PostItem>
      ))}
    </div>
  );
};

export default PostsHome;
