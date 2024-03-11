import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent } from 'react';

export default function Feed() {
  const createComment = (event: FormEvent) => {
    event.preventDefault();

    console.log('Create Comment');
  };

  const deleteComment = () => {
    console.log('Delete Comment');
  };

  const deleteReply = () => {
    console.log('Delete Reply');
  };

  const toggleReplyInput = () => {
    console.log('Toggle Reply Input');
  };

  const toggleLikeComment = () => {
    console.log('Toggle Like Comment');
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-top px-6 py-6 sm:p-6">
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion
            </h2>
          </div>

          {/* Create Comment */}
          <form className="" onSubmit={createComment}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="What is on your mind..."
                  required
                />
              </div>
              <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Create post
                </button>
              </div>
            </div>
          </form>

          <div className="flex flex-col space-y-6">
            {/* Comment */}
            <article className="p-6 text-base bg-gray-50 rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    <span>Michael Gough</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-02-08" title="February 8th, 2022">
                      Feb. 8, 2022
                    </time>
                  </p>
                </div>

                {/* X Icon */}
                <button
                  id="dropdownComment1Button"
                  onClick={deleteComment}
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <XMarkIcon className="h-5  w-5" />
                  <span className="sr-only">Comment settings</span>
                </button>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                Very straight-to-point article. Really worth time reading. Thank
                you! But tools are just the instruments for the UX designers.
                The knowledge of the design tools are as important as the
                creation of the design strategy.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                {/* Like Button */}
                <button
                  type="button"
                  onClick={toggleLikeComment}
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-0.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                  </svg>
                  Like
                </button>

                {/* Reply Button */}
                <button
                  type="button"
                  onClick={toggleReplyInput}
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
              <form className="pt-6">
                <label htmlFor="chat" className="sr-only">
                  Your reply
                </label>
                <div className="flex items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <textarea
                    id="chat"
                    rows={1}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add a reply..."
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
            </article>

            {/* Reply */}
            <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-gray-50 rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos"
                    />
                    <span>Jese Leos</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-02-12" title="February 12th, 2022">
                      Feb. 12, 2022
                    </time>
                  </p>
                </div>

                <button
                  id="dropdownComment1Button"
                  onClick={deleteReply}
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <XMarkIcon className="h-5  w-5" />
                  <span className="sr-only">Comment settings</span>
                </button>

                <div
                  id="dropdownComment2"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                Much appreciated! Glad you liked it ☺️
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
