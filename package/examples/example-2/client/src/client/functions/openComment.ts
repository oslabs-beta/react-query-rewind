import { Post } from '../types';

export const openComment = (
  postsArray: Post[],
  index: number,
  setPostsArray: React.Dispatch<React.SetStateAction<Post[]>>
): void => {
  const updatedPosts = postsArray.map((post, curIndex) => ({
    ...post,
    createComment:
      index === curIndex ? !post.createComment : post.createComment,
  }));

  setPostsArray(updatedPosts);
};
