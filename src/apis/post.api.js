import axiosInstance from "../axios";

export const URL_COMMENT_ON_A_POST = "/posts/comment";
export const URL_GET_POST = "/posts";
export const URL_GET_POST_USER = "/posts/get-user-posts";
export const URL_GET_ALL_POSTS = "/posts";
export const URL_GET_ALL_COMMENT_FROM_POST = "/posts/comments";
export const URL_LIKE_A_POST = "/posts/like";

export const URL_LIKE_COMMENT_OR_REPLY_COMMENT = "/posts/like-comment";

const postApi = {
  commentAPost(postId, body) {
    return axiosInstance.post(URL_COMMENT_ON_A_POST + "/" + postId, body);
  },
  getPostByUser(userId) {
    return axiosInstance.post(URL_GET_POST_USER + "/" + userId);
  },
  getPost(postId) {
    return axiosInstance.post(URL_GET_POST + "/" + postId);
  },
  getAllPost() {
    return axiosInstance.get(URL_GET_ALL_POSTS + "/");
  },
  getAllCommentFromPost(postId) {
    return axiosInstance.get(URL_GET_ALL_COMMENT_FROM_POST + "/" + postId);
  },
  likeOrUnlikeAPost(postId) {
    return axiosInstance.post(URL_LIKE_A_POST + "/" + postId);
  },
  likeCommentOrReplyComment(commentId, replyCommentId) {
    return axiosInstance.post(
      URL_LIKE_COMMENT_OR_REPLY_COMMENT + "/" + commentId,
      {
        replyId: replyCommentId,
      }
    );
  },
};

export default postApi;
