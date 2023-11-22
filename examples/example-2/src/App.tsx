import { useState, ChangeEvent, FormEvent } from 'react';

function App() {
  const [postsArray, setPostsArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const createPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setPostsArray([...postsArray, inputValue]);
      setInputValue('');
    }
  };

  return (
    <>
      <div className="window">
        <div className="nav-bar">React Query Rewind</div>
        <div className="posts-container">
          <form className="create-post-container" onSubmit={createPost}>
            <input
              type="text"
              className="input"
              value={inputValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInputValue(event.target.value)
              }
            />
            <button className="button" type="submit">
              Send
            </button>
          </form>
          {postsArray.map((post, index) => (
            <div className="post-container" key={index}>
              <div className="post-text">{post}</div>
              <div className="like-comment-container">
                <button className="button">Like</button>
                <button className="button">Comment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
