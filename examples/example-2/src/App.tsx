import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

type Post = {
  text: string;
  liked: boolean;
  comments: string[];
  createComment: boolean;
};

function App() {
  const [postsArray, setPostsArray] = useState<Post[]>([]);

  useEffect(() => {
    console.log('test');
  }, [postsArray]);

  const createPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('.input') as HTMLInputElement;

    if (input.value.trim()) {
      const postText = input.value;

      const newPost = {
        text: postText,
        liked: false,
        comments: [],
        createComment: false,
      };

      const newPostsArray = [...postsArray];
      newPostsArray.unshift(newPost);

      setPostsArray(newPostsArray);
      input.value = '';
    }
  };

  const likePost = (index: number) => {
    setPostsArray(postsArray =>
      postsArray.map((post, curIndex) => ({
        ...post,
        liked: index === curIndex ? !post.liked : post.liked,
      }))
    );
  };

  const deletePost = (index: number) => {
    setPostsArray((postsArray: Post[]) => {
      return postsArray.filter((_, curIndex) => {
        return index !== curIndex;
      });
    });
  };

  const openComment = (index: number) => {
    setPostsArray(postsArray =>
      postsArray.map((post, curIndex) => ({
        ...post,
        createComment:
          index === curIndex ? !post.createComment : post.createComment,
      }))
    );
  };

  const createComment = (event: FormEvent<HTMLFormElement>, index: number) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('.input-2') as HTMLInputElement;

    if (input && input.value.trim()) {
      const comment = input.value;

      setPostsArray(postsArray =>
        postsArray.map((post, curIndex) => {
          if (curIndex === index) {
            console.log('in', input.value);
            return {
              ...post,
              comments: [...post.comments, comment],
            };
          }
          return post;
        })
      );
      input.value = '';
    }
  };

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
                  onClick={() => openComment(index)}
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
                      <input type="text" className="input-2" />
                      <button className="button margin-left" type="submit">
                        Send
                      </button>
                    </form>
                    {post.comments.map((comment, index) => (
                      <div className="post-text" key={index}>
                        {`${index}) ${comment}`}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
