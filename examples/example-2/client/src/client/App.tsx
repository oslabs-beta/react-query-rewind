import React, { useState } from 'react';
import PostsOne from './components/postsOne';
import PostsTwo from './components/PostsTwo';
import PostsThree from './components/PostsThree';
// import ChromeComponent from './components/ChromeComponent';
// import { useQuery, QueryKey } from '@tanstack/react-query';

// type QueryEvent = {
//   eventType: string;
//   queryKey: QueryKey;
//   queryHash: string;
//   timestamp: Date;
//   queryData?: any;
// };

// type QueryData = {
//   [queryName: string]: {
//     updates: QueryEvent[];
//   };
// };

const App = () => {
  const [screenView, setScreenView] = useState<string>('Posts One');
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
  //   console.log(queryData);
  // }, [queryData]);

  const handleNavClick = (screenName: string) => {
    setScreenView(screenName);
  };

  return (
    <>
      <div className="window">
        <div className="nav-bar">
          <span className="title">React Query Rewind</span>
          <div className="nav-options">
            <div
              className={`nav-option ${
                screenView === 'Posts One' ? 'active' : ''
              }`}
              onClick={() => handleNavClick('Posts One')}
            >
              Feed 1
            </div>
            <div
              className={`nav-option ${
                screenView === 'Posts Two' ? 'active' : ''
              }`}
              onClick={() => handleNavClick('Posts Two')}
            >
              Feed 2
            </div>
            <div
              className={`nav-option ${
                screenView === 'Posts Three' ? 'active' : ''
              }`}
              onClick={() => handleNavClick('Posts Three')}
            >
              Feed 3
            </div>
          </div>
        </div>

        {screenView === 'Posts One' && <PostsOne />}
        {screenView === 'Posts Two' && <PostsTwo />}
        {screenView === 'Posts Three' && <PostsThree />}
      </div>
    </>
  );
};

export default App;
