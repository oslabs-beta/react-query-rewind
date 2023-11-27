import React from 'react';
import PostsOne from './components/PostsOne';

const App = () => {
  // const [screenView, setScreenView] = useState<string>('Posts One');

  return (
    <>
      <div className="window">
        <div className="nav-bar">React Query Rewind</div>
        <PostsOne />
      </div>
    </>
  );
};

export default App;
