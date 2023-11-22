import { useState } from 'react';

function App() {
  const [postsArray, setPostsArray] = useState([]);

  return (
    <>
      <div className="window">
        <div className="nav-bar"></div>
        <div className="create-post-container"></div>
        <div className="posts-container"></div>
      </div>
    </>
  );
}

export default App;
