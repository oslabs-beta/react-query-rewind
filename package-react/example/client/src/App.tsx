import React, { useState, useEffect } from 'react';
// import PostsOne from './components/FeedOne';
// import PostsTwo from './components/PostsTwo';
// import PostsThree from './components/PostsThree';
// import ChromeComponent from './components/ChromeComponent';
import { useQuery, QueryKey } from '@tanstack/react-query';

type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

const App = () => {
  // const [screenView, setScreenView] = useState<string>('Posts One');
  // const [queryData, setQueryData] = useState<QueryData>({});

  // Fetch the data from React Query's cache
  // const { data: queryEvent } = useQuery({ queryKey: ['test-data'] });

  // Synchronize the local state with the React Query data
  // useEffect(() => {
  //   if (
  //     queryEvent &&
  //     typeof queryEvent === 'object' &&
  //     'queryHash' in queryEvent
  //   ) {
  //     const newEvent = queryEvent as QueryEvent;
  //     const queryHash = newEvent.queryHash;
  //     const existingUpdates = queryData[queryHash]?.updates || [];

  //     setQueryData(prevQueryData => ({
  //       ...prevQueryData,
  //       [queryHash]: {
  //         updates: [...existingUpdates, newEvent],
  //       },
  //     }));
  //   }
  // }, [queryEvent]);

  // useEffect(() => {
  //   // console.log(queryData);
  // }, [queryData]);

  // const handleNavClick = (screenName: string) => {
  //   setScreenView(screenName);
  // };

  // this is to keep the content constrained
  // max-w-7xl

  return (
    // <div className="window">
    //   <div className="nav-bar">
    //     <span className="title">React Query Rewind</span>
    //     <div className="nav-options">
    // <div
    //   className={`nav-option ${
    //     screenView === 'Posts One' ? 'active' : ''
    //   }`}
    //   onClick={() => handleNavClick('Posts One')}
    // >
    //   Feed 1
    // </div>
    //       <div
    //         className={`nav-option ${
    //           screenView === 'Posts Two' ? 'active' : ''
    //         }`}
    //         onClick={() => handleNavClick('Posts Two')}
    //       >
    //         Feed 2
    //       </div>
    //       <div
    //         className={`nav-option ${
    //           screenView === 'Posts Three' ? 'active' : ''
    //         }`}
    //         onClick={() => handleNavClick('Posts Three')}
    //       >
    //         Feed 3
    //       </div>
    //     </div>
    //   </div>

    {
      /* {screenView === 'Posts One' && <PostsOne />}
      {screenView === 'Posts Two' && <PostsTwo />}
      {screenView === 'Posts Three' && <PostsThree />} */
    }
    // </div>
    // <div className="mx-auto flex min-h-screen w-full flex-col bg-white">
    //   <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b-1 border-gray-300 shadow w-full">
    //     <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
    //       <a
    //         href="#"
    //         className="flex items-center space-x-3 rtl:space-x-reverse"
    //       >
    //         <img
    //           src="https://flowbite.com/docs/images/logo.svg"
    //           className="h-8"
    //           alt="Flowbite Logo"
    //         />
    //         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //           Blog
    //         </span>
    //       </a>
    //       <button
    //         data-collapse-toggle="navbar-solid-bg"
    //         type="button"
    //         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //         aria-controls="navbar-solid-bg"
    //         aria-expanded="false"
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <svg
    //           className="w-5 h-5"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 17 14"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M1 1h15M1 7h15M1 13h15"
    //           />
    //         </svg>
    //       </button>
    //       <div
    //         className="hidden w-full md:block md:w-auto"
    //         id="navbar-solid-bg"
    //       >
    //         <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
    //           {/* <div
    //             className={`nav-option ${
    //               screenView === 'Posts One' ? 'active' : ''
    //             }`}
    //             onClick={() => handleNavClick('Posts One')}
    //           >
    //             Feed 1
    //           </div> */}
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
    //               aria-current="page"
    //             >
    //               Home
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //             >
    //               Services
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //             >
    //               Pricing
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //             >
    //               Contact
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   <main>Content</main>
    // </div>
  );
};

export default App;
