<script lang="ts">
  import { writable } from "svelte/store";
  import formatTimestamp from "../functions/formatTimestamp";
  import type { Post, CreateCommentParams } from "../types";

  import {
    useQuery,
    useMutation,
    useQueryClient,
  } from "@tanstack/svelte-query";

  const postInput = writable("");
  let postInputValue = "";

  const commentInputs = writable({});

  // fetch-data route to get starting posts
  const fetchPostsRoute = async () => {
    try {
      const database = "postsOne";
      const response = await fetch(
        `http://localhost:3000/fetch-data?database=${database}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Server response was not ok");
      }

      const newPostsArray = await response.json();

      return newPostsArray;
    } catch (error) {
      console.error("Fetching posts failed:", error);
      throw error;
    }
  };

  // query for fetching old posts
  const {
    data: postsArray,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts-one"],
    queryFn: fetchPostsRoute,
  });

  // create-post route
  const createPostRoute = async (newPost: Post) => {
    try {
      const response = await fetch("http://localhost:3000/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ database: "postsOne", newPost: newPost }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (errror) {
      console.error("Creating post failed:", error);
    }
  };

  // mutation for creating a new post
  const newPostMutation = useMutation({
    mutationFn: createPostRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-one"] });
    },
  });

  // function that creates new post
  const createPost = (event: Event) => {
    event.preventDefault();

    const postText = postInputValue.trim();

    if (postText) {
      const newPost = {
        text: postText,
        liked: false,
        comments: [],
        createComment: false,
        timestamp: formatTimestamp(),
      };

      newPostMutation.mutate(newPost);
      postInput.set("");
    }
  };
</script>

<main class="posts-container">
  <form class="create-post-container" on:submit|preventDefault={createPost}>
    <input type="text" class="input" bind:value={$postInput} />
    <button class="button left-margin" type="submit">Send</button>
  </form>

  {#if $isLoading}
    <div>Loading...</div>
  {/if}
  {#if $error}
    <div>Error loading posts</div>
  {/if}

  {#each $postsArray as post, index (post.id)}
    <div class="post-container {index % 2 === 0 ? 'green' : 'blue'}">
      <div class="post-content">
        <span class="post-text">{post.text}</span>
        <span class="post-timestamp">{post.timestamp}</span>
      </div>

      <!-- <div class="like-comment-container">
        <button
          class="button {post.liked ? 'red' : ''}"
          on:click={() => likePost(index)}>Like</button
        >
        <button class="button left-margin" on:click={() => openComment(index)}
          >Comment</button
        >
        <button class="button left-margin" on:click={() => deletePost(index)}
          >Delete</button
        >
      </div> -->

      <!-- {#if post.createComment}
        <div class="comment-section">
          <form
            class="create-post-container-2"
            on:submit|preventDefault={(event) => createComment(event, index)}
          >
            <input
              type="text"
              class="input-2"
              bind:value={commentInputs[index]}
            />
            <button class="button left-margin" type="submit">Send</button>
          </form>
          {#each post.comments as comment, commentIndex}
            <div key={commentIndex} class="post-text">
              {`${commentIndex}) ${comment}`}
            </div>
          {/each}
        </div>
      {/if} -->
    </div>
  {/each}
</main>

<style>
</style>
