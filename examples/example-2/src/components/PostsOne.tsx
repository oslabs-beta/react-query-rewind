import { useState, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { usePostInputChange } from '../hooks/usePostInputChange';
import { useCommentInputChange } from '../hooks/useCommentInputChange';
import { Post } from '../types';
import { openComment } from '../functions/openComment';

type CreateCommentParams = {
  index: number;
  comment: string;
};

function PostsOne() {
  const queryClient = useQueryClient();

  const [postsArray, setPostsArray] = useState<Post[]>([]);
  const { postInput, setPostInput, postInputChange } = usePostInputChange();
  const { commentInputs, setCommentInputs, commentInputChange } =
    useCommentInputChange();

  // fetch-data route to get starting posts
  const fetchPostsRoute = async () => {
    try {
      const response = await fetch('http://localhost:3000/fetch-data');
      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const newPostsArray = await response.json();
      setPostsArray(newPostsArray);

      return newPostsArray;
    } catch (error) {
      console.error('Fetching posts failed:', error);
    }
  };

  // query for fetching old posts
  const {
    data: newPostsArray,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPostsRoute,
  });

  // create-post route
  const createPostRoute = async (newPost: Post) => {
    try {
      const response = await fetch('http://localhost:3000/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (errror) {
      console.error('Creating post failed:', error);
    }
  };

  // mutation for creating a new post
  const newPostMutation = useMutation({
    mutationFn: createPostRoute,
    onSuccess: updatedPostsArray => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setPostsArray(updatedPostsArray);
    },
  });

  // function that creates new post
  const createPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (postInput.trim()) {
      const newPost = {
        text: postInput,
        liked: false,
        comments: [],
        createComment: false,
      };

      newPostMutation.mutate(newPost);

      // setPostsArray([newPost, ...postsArray]);
      setPostInput('');
    }
  };

  // like-post route
  const likePostRoute = async (index: number) => {
    try {
      const response = await fetch('http://localhost:3000/like-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: index }),
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (errror) {
      console.error('Creating post failed:', error);
    }
  };

  // mutation for liking a post
  const likePostMutation = useMutation({
    mutationFn: likePostRoute,
    onSuccess: updatedPostsArray => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setPostsArray(updatedPostsArray);
    },
  });

  // function that likes post
  const likePost = (index: number) => {
    likePostMutation.mutate(index);

    // setPostsArray(postsArray =>
    //   postsArray.map((post, curIndex) => ({
    //     ...post,
    //     liked: index === curIndex ? !post.liked : post.liked,
    //   }))
    // );
  };

  // delete-post route
  const deletePostRoute = async (index: number) => {
    try {
      const response = await fetch('http://localhost:3000/delete-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: index }),
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (errror) {
      console.error('Creating post failed:', error);
    }
  };

  // mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: deletePostRoute,
    onSuccess: updatedPostsArray => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setPostsArray(updatedPostsArray);
    },
  });

  //function that deletes post
  const deletePost = (index: number) => {
    deletePostMutation.mutate(index);

    // setPostsArray((postsArray: Post[]) => {
    //   return postsArray.filter((_, curIndex) => {
    //     return index !== curIndex;
    //   });
    // });
  };

  // create-comment route
  const createCommentRoute = async ({
    index,
    comment,
  }: CreateCommentParams) => {
    try {
      const response = await fetch('http://localhost:3000/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, comment }),
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (errror) {
      console.error('Creating post failed:', error);
    }
  };

  // mutation for creating a comment
  const createCommentMutation = useMutation({
    mutationFn: createCommentRoute,
    onSuccess: updatedPostsArray => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setPostsArray(updatedPostsArray);
    },
  });

  // function that creates comment
  const createComment = (
    event: FormEvent<HTMLFormElement>,
    postIndex: number
  ) => {
    event.preventDefault();

    const comment = commentInputs[postIndex];

    if (comment && comment.trim()) {
      createCommentMutation.mutate({ index: postIndex, comment: comment });

      // setPostsArray(postsArray =>
      //   postsArray.map((post, curIndex) => {
      //     if (curIndex === postIndex) {
      //       return {
      //         ...post,
      //         comments: [...post.comments, comment],
      //       };
      //     }
      //     return post;
      //   })
      // );
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
                onClick={() => openComment(postsArray, index, setPostsArray)}
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