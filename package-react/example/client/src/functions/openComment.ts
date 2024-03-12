import { Comment } from '../types';

export const openComment = (
  postsArray: Comment[],
  index: number,
  setPostsArray: React.Dispatch<React.SetStateAction<Comment[]>>
): void => {
  const updatedPosts = postsArray.map((post, curIndex) => ({
    ...post,
    createComment:
      index === curIndex ? !post.createComment : post.createComment,
  }));

  setPostsArray(updatedPosts);
};
