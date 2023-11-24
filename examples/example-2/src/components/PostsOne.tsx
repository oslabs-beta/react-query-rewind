import { useState, FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import postsOneData from '../data/postsOne.json';

import { usePostInputChange } from '../hooks/usePostInputChange';
import { useCommentInputChange } from '../hooks/useCommentInputChange';

type Post = {
  text: string;
  liked: boolean;
  comments: string[];
  createComment: boolean;
};

// simulate a fetch request with a delay
const fetchPosts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(postsOneData);
    }, 2000);
  });
};

function PostsOne() {
  const [postsArray, setPostsArray] = useState<Post[]>([]);
  const { postInput, setPostInput, postInputChange } = usePostInputChange();
  const { commentInputs, setCommentInputs, commentInputChange } =
    useCommentInputChange();

  // Using useQuery to fetch posts
  const {
    data: newPostsArray,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Check for loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check for error state
  if (error) {
    return <div>Error loading posts</div>;
  }

  console.log(newPostsArray);

  const createPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (postInput.trim()) {
      const newPost = {
        text: postInput,
        liked: false,
        comments: [],
        createComment: false,
      };

      setPostsArray([newPost, ...postsArray]);
      setPostInput('');
    }
  };

  const likePost = (index: number) => {
    setPostsArray(postsArray =>
      postsArray.map((post, curIndex) => ({
        ...post,
        liked: index === curIndex ? !post.liked : post.liked,
      }))
    );
  };

  const deletePost = (index: number) => {
    setPostsArray((postsArray: Post[]) => {
      return postsArray.filter((_, curIndex) => {
        return index !== curIndex;
      });
    });
  };

  const openComment = (index: number) => {
    setPostsArray(postsArray =>
      postsArray.map((post, curIndex) => ({
        ...post,
        createComment:
          index === curIndex ? !post.createComment : post.createComment,
      }))
    );
  };

  const createComment = (
    event: FormEvent<HTMLFormElement>,
    postIndex: number
  ) => {
    event.preventDefault();

    const comment = commentInputs[postIndex];
    if (comment && comment.trim()) {
      setPostsArray(postsArray =>
        postsArray.map((post, curIndex) => {
          if (curIndex === postIndex) {
            return {
              ...post,
              comments: [...post.comments, comment],
            };
          }
          return post;
        })
      );
      setCommentInputs({ ...commentInputs, [postIndex]: '' });
    }
  };

  return (
    <>
      <div className="posts-container">
        <form className="create-post-container" onSubmit={createPost}>
          <input
            type="text"
            className="input"
            value={postInput}
            onChange={postInputChange}
          />
          <button className="button margin-left" type="submit">
            Send
          </button>
        </form>
        {postsArray.map((post, index) => (
          <div
            className={`post-container ${index % 2 === 0 ? 'green' : 'blue'}`}
            key={index}
          >
            <div className="post-text">{post.text}</div>
            <div className="like-comment-container">
              <button
                className={`button ${post.liked === true ? 'red' : ''}`}
                onClick={() => likePost(index)}
              >
                Like
              </button>
              <button
                className="button left-margin"
                onClick={() => openComment(index)}
              >
                Comment
              </button>
              <button
                className="button left-margin"
                onClick={() => deletePost(index)}
              >
                Delete
              </button>
            </div>
            <div className="comment-section">
              {post.createComment === true && (
                <>
                  {' '}
                  <form
                    className="create-post-container-2"
                    onSubmit={event => createComment(event, index)}
                  >
                    <input
                      type="text"
                      className="input-2"
                      value={commentInputs[index] || ''}
                      onChange={event => commentInputChange(index, event)}
                    />
                    <button className="button margin-left" type="submit">
                      Send
                    </button>
                  </form>
                  {post.comments.map((comment, commentIndex) => (
                    <div className="post-text" key={commentIndex}>
                      {`${commentIndex}) ${comment}`}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PostsOne;
