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
import { ref, onMounted } from 'vue';
import { formatTimestamp } from '../functions/formatTimestamp';

// Import or define types, hooks, and utility functions as needed
// Import API functions for fetching and mutating data

const postInput = ref('');
const commentInputs = ref({});
const postsArray = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Fetch posts, handle mutations, etc. Adapt the logic from your React component
// You can use the Composition API's ref, reactive, and computed for reactivity
// Implement createPost, likePost, deletePost, createComment, openComment, etc.

const createPost = (event: Event) => {
  event.preventDefault();

  if (postInput.value.trim()) {
    const newPost = {
      text: postInput.value,
      liked: false,
      comments: [],
      createComment: false,
      timestamp: formatTimestamp(),
    };

    console.log(newPost);

    postInput.value = '';
  }
};

// Example of an onMounted lifecycle hook
onMounted(async () => {
  isLoading.value = true;
  try {
    // Perform initial data fetching
  } catch (err) {
    console.error('Fetching posts failed:', err);
    error.value = err;
  } finally {
    isLoading.value = false;
  }
});
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

.create-post-container-2 {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.input {
  height: 2rem;
  width: 20rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin-right: 0.8rem;
}

.input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.input-2 {
  height: 2rem;
  width: 20rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin-right: 0.8rem;
}

.input-2:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.button {
  height: 2rem;
  padding: 0 0.8rem;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.post-container {
  height: auto;
  width: 100%;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}

.post-text {
  color: black;
  padding: 1rem;
}

.like-comment-container {
  padding: 1rem;
}

.left-margin {
  margin-left: 1rem;
}

.red {
  background-color: lightcoral;
  border: 1px solid lightcoral;
}

.button.red:hover {
  background-color: red;
  border-color: red;
}

.green {
  background-color: #b0c4de;
}

.blue {
  background-color: #e2e6ea;
}

.post-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-timestamp {
  opacity: 0.7;
  padding: 1rem;
}
</style>
