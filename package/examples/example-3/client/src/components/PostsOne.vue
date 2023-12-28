<template>
  <div class="posts-container">
    <form class="create-post-container" @submit.prevent="createPost">
      <input type="text" class="input" v-model="postInput" />
      <button class="button left-margin" type="submit">Send</button>
    </form>

    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error loading posts</div>

    <div
      v-for="(post, index) in postsArray"
      :key="index"
      :class="`post-container ${index % 2 === 0 ? 'green' : 'blue'}`"
    >
      <div class="post-content">
        <span class="post-text">{{ post.text }}</span>
        <span class="post-timestamp">{{ post.timestamp }}</span>
      </div>

      <div class="like-comment-container">
        <button
          :class="`button ${post.liked ? 'red' : ''}`"
          @click="() => likePost(index)"
        >
          Like
        </button>
        <button class="button left-margin" @click="() => openComment(index)">
          Comment
        </button>
        <button class="button left-margin" @click="() => deletePost(index)">
          Delete
        </button>
      </div>

      <div class="comment-section" v-if="post.createComment">
        <form
          class="create-post-container-2"
          @submit.prevent="event => createComment(event, index)"
        >
          <input type="text" class="input-2" v-model="commentInputs[index]" />
          <button class="button left-margin" type="submit">Send</button>
        </form>

        <div
          v-for="(comment, commentIndex) in post.comments"
          :key="commentIndex"
          class="post-text"
        >
          {{ `${commentIndex}) ${comment}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref, Ref } from 'vue';
import { formatTimestamp } from '../functions/formatTimestamp';
import { Post, CreateCommentParams } from '../types';

const queryClient = useQueryClient();

const postInput = ref<string>('');
const commentInputs: Ref<{ [key: number]: string }> = ref({});

// fetch-data route to get starting posts
const fetchPostsRoute = async () => {
  try {
    const database = 'postsOne';
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

    const newPostsArray = await response.json();

    return newPostsArray;
  } catch (error) {
    console.error('Fetching posts failed:', error);
    throw error;
  }
};

// query for fetching old posts
const {
  data: postsArray,
  isLoading,
  error,
} = useQuery<Post[]>({
  queryKey: ['posts-one'],
  queryFn: fetchPostsRoute,
});

// create-post route
const createPostRoute = async (newPost: Post) => {
  try {
    const response = await fetch('http://localhost:3000/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database: 'postsOne', newPost: newPost }),
    });

    if (!response.ok) {
      throw new Error('Error creating post');
    }

    const updatedPostsArray = await response.json();
    return updatedPostsArray;
  } catch (errror) {
    console.error('Creating post failed:', error);
  }
};

// mutation for creating a new post
const newPostMutation = useMutation({
  mutationFn: createPostRoute,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts-one'] });
  },
});

// function that creates new post
const createPost = (event: Event) => {
  event.preventDefault();

  const postText = (postInput.value as string).trim();

  if (postText) {
    const newPost = {
      text: postText,
      liked: false,
      comments: [],
      createComment: false,
      timestamp: formatTimestamp(),
    };

    newPostMutation.mutate(newPost);
    postInput.value = '';
  }
};

// like-post route
const likePostRoute = async (index: number) => {
  try {
    const response = await fetch('http://localhost:3000/like-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database: 'postsOne', index: index }),
    });

    if (!response.ok) {
      throw new Error('Error creating post');
    }

    const updatedPostsArray = await response.json();
    console.log(updatedPostsArray);

    return updatedPostsArray;
  } catch (errror) {
    console.error('Creating post failed:', error);
  }
};

// mutation for liking a post
const likePostMutation = useMutation({
  mutationFn: likePostRoute,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts-one'] });
  },
});

// function that likes post
const likePost = (index: number) => {
  likePostMutation.mutate(index);
};

// delete-post route
const deletePostRoute = async (index: number) => {
  try {
    const response = await fetch('http://localhost:3000/delete-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database: 'postsOne', index: index }),
    });

    if (!response.ok) {
      throw new Error('Error creating post');
    }

    const updatedPostsArray = await response.json();
    return updatedPostsArray;
  } catch (errror) {
    console.error('Creating post failed:', error);
  }
};

// mutation for deleting a post
const deletePostMutation = useMutation({
  mutationFn: deletePostRoute,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts-one'] });
  },
});

//function that deletes post
const deletePost = (index: number) => {
  deletePostMutation.mutate(index);
};

// open-comment route
const openCommentRoute = async (index: number) => {
  try {
    const response = await fetch('http://localhost:3000/open-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database: 'postsOne', index: index }),
    });

    if (!response.ok) {
      throw new Error('Error creating post');
    }

    const updatedPostsArray = await response.json();
    return updatedPostsArray;
  } catch (errror) {
    console.error('Creating post failed:', error);
  }
};

// mutation for opening comment
const openCommentMutation = useMutation({
  mutationFn: openCommentRoute,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts-one'] });
  },
});

// function that opens comment
const openComment = (index: number) => {
  openCommentMutation.mutate(index);
};

// NEW NEW NEW NEW NEW
// create-comment route
const createCommentRoute = async ({ index, comment }: CreateCommentParams) => {
  try {
    const response = await fetch('http://localhost:3000/create-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database: 'postsOne', index, comment }),
    });

    if (!response.ok) {
      throw new Error('Error creating post');
    }

    const updatedPostsArray = await response.json();
    return updatedPostsArray;
  } catch (errror) {
    console.error('Creating post failed:', error);
  }
};

// mutation for creating a comment
const createCommentMutation = useMutation({
  mutationFn: createCommentRoute,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts-one'] });
  },
});

// function that creates comment
const createComment = (event: Event, postIndex: number) => {
  event.preventDefault();

  const comment = commentInputs.value[postIndex];

  if (comment && comment.trim()) {
    createCommentMutation.mutate({ index: postIndex, comment: comment });
    commentInputs.value[postIndex] = ''; // Update the comment input directly
  }
};
</script>

<style scoped>
.posts-container {
  height: auto;
  width: auto;
  margin-top: 6rem;
}

.create-post-container {
  background-color: #e2e6ea;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.input {
  height: 2rem;
  width: 20rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none; /* Removes the default focus outline */
  margin-right: 0.8rem;
}

.input:focus {
  border-color: #007bff; /* Blue border on focus */
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* Soft blue glow */
}

.button {
  height: 2rem;
  padding: 0 0.8rem;
  background-color: #007bff; /* Blue background */
  border: 1px solid #007bff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.button:hover {
  background-color: #0056b3; /* Slightly darker blue on hover */
  border-color: #0056b3;
}

.red {
  background-color: lightcoral;
  border: 1px solid lightcoral;
}

.button.red:hover {
  background-color: red; /* Color when hovered */
  border-color: red;
}

.left-margin {
  margin-left: 1rem;
}

.post-container {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}

.post-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-text {
  color: black;
  padding: 1rem;
}

.post-timestamp {
  opacity: 0.7;
  padding: 1rem;
}

.blue {
  background-color: #e2e6ea;
}

.green {
  background-color: #b0c4de;
}

.like-comment-container {
  padding: 1rem;
}

.create-post-container-2 {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.input-2 {
  height: 2rem;
  width: 20rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none; /* Removes the default focus outline */
  margin-right: 0.8rem;
}

.input-2:focus {
  border-color: #007bff; /* Blue border on focus */
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* Soft blue glow */
}
</style>
