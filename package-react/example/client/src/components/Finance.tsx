import React, { FormEvent, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateCommentParams, Comment } from '../types';
import { useCommentInputChange } from '../hooks/useCommentInputChange';
import { useReplyInputChange } from '../hooks/useReplyInputChange';
import formatTimestamp from '../functions/formatTimestamp';

export default function Finance() {
  const queryClient = useQueryClient();

  const [openReplyArea, setOpenReplyArea] = useState<null | number>(null);
  const { commentInput, setCommentInput, commentInputChange } =
    useCommentInputChange();
  const { replyInputs, setReplyInputs, replyInputChange } =
    useReplyInputChange();

  // fetch-data route to get starting comments
  const fetchDataRoute = async () => {
    try {
      const database = 'finance';
      const response = await fetch(
        `http://localhost:3000/fetch-data?database=${database}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const newCommentsArray = await response.json();

      return newCommentsArray;
    } catch (error) {
      console.error('Fetching comments array failed:', error);
    }
  };

  // query for fetching old comments
  const {
    data: commentsArray,
    isLoading,
    error,
  } = useQuery<Comment[]>({
    queryKey: ['finance'],
    queryFn: fetchDataRoute,
  });

  // create-comment route
  const createCommentRoute = async (newComment: Comment) => {
    try {
      const response = await fetch('http://localhost:3000/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'finance',
          newComment: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating comment');
      }

      const updatedCommentsArray = await response.json();
      return updatedCommentsArray;
    } catch (errror) {
      console.error('Creating comment failed:', error);
    }
  };

  // mutation for creating a new comment
  const newCommentMutation = useMutation({
    mutationFn: createCommentRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance'] });
    },
  });

  // function that creates new comment
  const createComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      text: commentInput,
      liked: false,
      replies: [],
      createComment: false,
      timestamp: formatTimestamp(),
      username: 'Guest',
      picture: 'guest',
    };

    newCommentMutation.mutate(newComment);
    setCommentInput('');
  };

  // like-comment route
  const likeCommentRoute = async (commentIndex: number) => {
    try {
      const response = await fetch('http://localhost:3000/like-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'finance',
          commentIndex: commentIndex,
        }),
      });

      if (!response.ok) {
        throw new Error('Error liking a comment');
      }

      const updatedCommentsArray = await response.json();
      return updatedCommentsArray;
    } catch (err) {
      console.error('Error liking a comment', error);
    }
  };

  // mutation for liking a comment
  const likeCommentMutation = useMutation({
    mutationFn: likeCommentRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance'] });
    },
  });

  // function that likes comment
  const toggleLikeComment = (commentIndex: number) => {
    likeCommentMutation.mutate(commentIndex);
  };

  // delete-comment route
  const deleteCommentRoute = async (commentIndex: number) => {
    try {
      const response = await fetch('http://localhost:3000/delete-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'finance',
          commentIndex: commentIndex,
        }),
      });

      if (!response.ok) {
        throw new Error('Error deleting comment');
      }

      const updatedCommentsArray = await response.json();
      return updatedCommentsArray;
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  // mutation for deleting a comment
  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance'] });
    },
  });

  //function that deletes comment
  const deleteComment = (index: number) => {
    deleteCommentMutation.mutate(index);
  };

  // delete-reply route
  const deleteReplyRoute = async ({ commentIndex, replyIndex }) => {
    try {
      const response = await fetch('http://localhost:3000/delete-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: 'finance',
          commentIndex: commentIndex,
          replyIndex: replyIndex,
        }),
      });

      if (!response.ok) {
        throw new Error('Error deleting reply');
      }

      const updatedCommentsArray = await response.json();
      return updatedCommentsArray;
    } catch (err) {
      console.error('Deleting reply failed:', err);
    }
  };

  // mutation for deleting a reply
  const deleteReplyMutation = useMutation({
    mutationFn: deleteReplyRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance'] });
    },
  });

  //function that deletes reply
  const deleteReply = (commentIndex: number, replyIndex: number) => {
    deleteReplyMutation.mutate({ commentIndex, replyIndex });
  };

  // create-reply route
  const createReplyRoute = async ({
    commentIndex,
    reply,
  }: CreateCommentParams) => {
    try {
      const response = await fetch('http://localhost:3000/create-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ database: 'finance', commentIndex, reply }),
      });

      if (!response.ok) {
        throw new Error('Error creating a reply');
      }

      const updatedCommentsArray = await response.json();
      return updatedCommentsArray;
    } catch (err) {
      console.error('Error creating a reply:', err);
    }
  };

  // mutation for creating a comment
  const createReplyMutation = useMutation({
    mutationFn: createReplyRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance'] });
    },
  });

  // function that creates comment
  const createReply = (
    event: FormEvent<HTMLFormElement>,
    commentIndex: number
  ) => {
    event.preventDefault();

    const replyInput = replyInputs[commentIndex];

    const newReply = {
      text: replyInput,
      timestamp: formatTimestamp(),
      username: 'Guest',
      picture: 'guest',
    };

    if (replyInput && replyInput.trim()) {
      createReplyMutation.mutate({
        commentIndex: commentIndex,
        reply: newReply,
      });
      setReplyInputs({ ...replyInputs, [commentIndex]: '' });
      setOpenReplyArea(null);
    }
  };

  // function that opens comment
  const toggleReplyInput = (index: any) => {
    if (openReplyArea === index) {
      setOpenReplyArea(null);
    } else {
      setOpenReplyArea(index);
    }
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-top px-6 py-6 sm:p-6">
      <section className="bg-white dark:bg-gray-900 antialiased">
        <div className="max-w-2xl w-150 mx-auto px-4">
          <div className="flex flex-col space-y-6">
            {/* Create Comment */}
            <form className="" onSubmit={createComment}>
              <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="What do you think?"
                    value={commentInput}
                    onChange={commentInputChange}
                  />
                </div>
                <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading comments</div>}

            {commentsArray &&
              commentsArray.map((comment, commentIndex) => {
                return (
                  <div className="flex flex-col" key={commentIndex}>
                    {/* Comment */}
                    <article className="p-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          {comment.picture !== 'guest' ? (
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={comment.picture}
                                alt={comment.username}
                              />
                              <span>{comment.username}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3">
                                <svg
                                  className="absolute w-8 h-8 text-gray-400 -left-1 -top-0.4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                              <span>{comment.username}</span>
                            </div>
                          )}

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time
                              dateTime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              {comment.timestamp}
                            </time>
                          </p>
                        </div>

                        {/* X Icon */}
                        <button
                          id="dropdownComment1Button"
                          onClick={() => deleteComment(commentIndex)}
                          data-dropdown-toggle="dropdownComment1"
                          className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <XMarkIcon className="h-5  w-5" />
                          <span className="sr-only">Comment settings</span>
                        </button>
                      </footer>
                      <p className="text-gray-500 dark:text-gray-400">
                        {comment.text}
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => toggleLikeComment(commentIndex)}
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >
                          <svg
                            className="w-3.5 h-3.5 mr-0.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill={comment.liked ? 'red' : 'currentColor'}
                            viewBox="0 0 24 24"
                          >
                            <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                          </svg>
                          Like
                        </button>

                        {/* Reply Button */}
                        <button
                          type="button"
                          onClick={() => toggleReplyInput(commentIndex)}
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >
                          <svg
                            className="mr-1.5 w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                            />
                          </svg>
                          Reply
                        </button>
                      </div>

                      {/* Reply Area */}
                      {openReplyArea === commentIndex && (
                        <form
                          className="pt-6"
                          onSubmit={event => createReply(event, commentIndex)}
                        >
                          <label htmlFor="chat" className="sr-only">
                            Your reply
                          </label>
                          <div className="flex items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <textarea
                              id="chat"
                              rows={1}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-0 focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              placeholder="Add a reply..."
                              value={replyInputs[commentIndex] || ''}
                              onChange={event =>
                                replyInputChange(commentIndex, event)
                              }
                            ></textarea>
                            {/* Reply Send Button */}
                            <button
                              type="submit"
                              className="group inline-flex justify-center py-2 pl-6 text-blue-600 rounded-full cursor-pointer dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-600"
                            >
                              <svg
                                className="w-6 h-6 rotate-90 rtl:-rotate-90"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                              </svg>
                              <span className="sr-only">Send message</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </article>

                    {/* Reply */}
                    {comment.replies.length > 0 && (
                      <div className="flex flex-col space-y-6 pt-6">
                        {comment.replies.map((reply, replyIndex) => {
                          return (
                            <article
                              className="p-6 ml-6 lg:ml-12 text-base bg-gray-50 rounded-lg dark:bg-gray-700"
                              key={replyIndex}
                            >
                              <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  {reply.picture !== 'guest' ? (
                                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                      <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src={reply.picture}
                                        alt={reply.username}
                                      />
                                      <span>{reply.username}</span>
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                      <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3">
                                        <svg
                                          className="absolute w-8 h-8 text-gray-400 -left-1 -top-0.4"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                      </div>
                                      <span>{reply.username}</span>
                                    </div>
                                  )}
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time
                                      dateTime="2022-02-12"
                                      title="February 12th, 2022"
                                    >
                                      {reply.timestamp}
                                    </time>
                                  </p>
                                </div>

                                <button
                                  id="dropdownComment1Button"
                                  onClick={() =>
                                    deleteReply(commentIndex, replyIndex)
                                  }
                                  data-dropdown-toggle="dropdownComment1"
                                  className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                  type="button"
                                >
                                  <XMarkIcon className="h-5  w-5" />
                                  <span className="sr-only">
                                    Comment settings
                                  </span>
                                </button>
                              </footer>
                              <p className="text-gray-500 dark:text-gray-400">
                                {reply.text}
                              </p>
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
