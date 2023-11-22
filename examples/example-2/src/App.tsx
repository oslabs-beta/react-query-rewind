import { useState, ChangeEvent, FormEvent } from 'react';

type Post = {
  text: string;
  liked: boolean;
  comments: string[];
  createComment: boolean;
};

function App() {
  const [postsArray, setPostsArray] = useState<Post[]>([]);
  // const [inputValue, setInputValue] = useState<string>('');

  const createPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('.input') as HTMLInputElement;

    if (input.value.trim()) {
      const newPost = {
        text: input.value,
        liked: false,
        comments: [],
        createComment: false,
      };
      setPostsArray([...postsArray, newPost]);
      input.value = '';
    }
  };

  const likePost = (index: number) => {
    setPostsArray((postsArray: Post[]) => {
      return postsArray.map((post, curIndex) => {
        if (index === curIndex) {
          if (post.liked) {
            post.liked = false;
          } else {
            post.liked = true;
          }
        }
        return post;
      });
    });
  };

  const deletePost = (index: number) => {
    setPostsArray((postsArray: Post[]) => {
      return postsArray.filter((_, curIndex) => {
        return index !== curIndex;
      });
    });
  };

  const createComment = (index: number) => {};

  return (
    <>
      <div className="window">
        <div className="nav-bar">React Query Rewind</div>
        <div className="posts-container">
          <form className="create-post-container" onSubmit={createPost}>
            <input type="text" className="input" />
            <button className="button margin-left" type="submit">
              Send
            </button>
          </form>
          {postsArray.map((post, index) => (
            <div className="post-container" key={index}>
              <div className="post-text">{post.text}</div>
              <div className="like-comment-container">
                <button
                  className={`button ${post.liked === true ? 'red' : ''}`}
                  onClick={() => likePost(index)}
                >
                  Like
                </button>
                <button className="button left-margin">Comment</button>
                <button
                  className="button left-margin"
                  onClick={() => deletePost(index)}
                >
                  Delete
                </button>
              </div>
              <div className="comment-section">
                {/* {post.createComment === true && ()} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
