import React, { useState } from 'react';
import PostsOne from './components/PostsOne';
import PostsTwo from './components/PostsTwo';
import PostsThree from './components/PostsThree';

const App = () => {
  const [screenView, setScreenView] = useState<string>('Posts One');

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
