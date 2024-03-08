<script lang="ts">
  import { writable } from "svelte/store";
  import formatTimestamp from "../functions/formatTimestamp";
  import type { Post, CreateCommentParams, CommentInputsType } from "../types";

  import {
    createQuery,
    createMutation,
    useQueryClient,
  } from "@tanstack/svelte-query";

  const postInput = writable<String>("");

  const commentInputs = writable<CommentInputsType>({});

  const queryClient = useQueryClient();

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
      initializeCommentInputs(newPostsArray); // Initialize comment inputs here
      return newPostsArray;
    } catch (error) {
      console.error("Fetching posts failed:", error);
      throw error;
    }
  };

  // query for fetching old posts
  const postsArray = createQuery<Post[]>({
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
    } catch (error) {
      console.error("Creating post failed:", error);
    }
  };

  // mutation for creating a new post
  const newPostMutation = createMutation({
    mutationFn: createPostRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-one"] });
    },
  });

  // function that creates new post
  const createPost = (event: Event) => {
    event.preventDefault();

    let currentPostInput = $postInput;
    const postText = currentPostInput.trim();

    if (postText) {
      const newPost = {
        text: postText,
        liked: false,
        comments: [],
        createComment: false,
        timestamp: formatTimestamp(),
      };

      $newPostMutation.mutate(newPost);
      postInput.set("");
    }
  };

  // like-post route
  const likePostRoute = async (index: number) => {
    try {
      const response = await fetch("http://localhost:3000/like-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ database: "postsOne", index: index }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const updatedPostsArray = await response.json();

      return updatedPostsArray;
    } catch (error) {
      console.error("Creating post failed:", error);
    }
  };

  // mutation for liking a post
  const likePostMutation = createMutation({
    mutationFn: likePostRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-one"] });
    },
  });

  // function that likes post
  const likePost = (index: number) => {
    $likePostMutation.mutate(index);
  };

  // delete-post route
  const deletePostRoute = async (index: number) => {
    try {
      const response = await fetch("http://localhost:3000/delete-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ database: "postsOne", index: index }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (error) {
      console.error("Creating post failed:", error);
    }
  };

  // mutation for deleting a post
  const deletePostMutation = createMutation({
    mutationFn: deletePostRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-one"] });
    },
  });

  //function that deletes post
  const deletePost = (index: number) => {
    $deletePostMutation.mutate(index);
  };

  // open-comment route
  const openCommentRoute = async (index: number) => {
    try {
      const response = await fetch("http://localhost:3000/open-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ database: "postsOne", index: index }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const updatedPostsArray = await response.json();
      console.log();
      return updatedPostsArray;
    } catch (error) {
      console.error("Creating post failed:", error);
    }
  };

  // mutation for opening comment
  const openCommentMutation = createMutation({
    mutationFn: openCommentRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-one"] });
    },
  });

  // function that opens comment
  const openComment = (index: number) => {
    $openCommentMutation.mutate(index);
  };

  // create-comment route
  const createCommentRoute = async ({
    index,
    comment,
  }: CreateCommentParams) => {
    try {
      const response = await fetch("http://localhost:3000/create-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ database: "postsOne", index, comment }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const updatedPostsArray = await response.json();
      return updatedPostsArray;
    } catch (error) {
      console.error("Creating post failed:", error);
    }
  };

  // mutation for creating a comment
  const createCommentMutation = createMutation({
    mutationFn: createCommentRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-one"] });
    },
  });

  // function that creates comment
  const createComment = (event: Event, postIndex: number) => {
    event.preventDefault();
    let currentComments = $commentInputs;
    const comment = currentComments[postIndex];

    if (comment && comment.trim()) {
      $createCommentMutation.mutate({ index: postIndex, comment: comment });
      currentComments[postIndex] = ""; // Reset the comment input for this post
      commentInputs.set(currentComments); // Update the store
    }
  };

  // After fetching posts, initialize commentInputs for each post
  const initializeCommentInputs = (newPostsArray: Post[]) => {
    let initialComments: CommentInputsType = {};
    newPostsArray.forEach((_, index) => {
      initialComments[index] = ""; // Initialize each comment input with an empty string
    });
    commentInputs.set(initialComments);
  };
</script>

<main class="posts-container">
  <form class="create-post-container" on:submit|preventDefault={createPost}>
    <input type="text" class="input" bind:value={$postInput} />
    <button class="button left-margin" type="submit">Send</button>
  </form>

  <!-- {#if $isLoading}
    <div>Loading...</div>
  {/if}
  {#if $error}
    <div>Error loading posts</div>
  {/if} -->

  {#if $postsArray.data}
    {#each $postsArray.data as post, index (index)}
      <div class="post-container {index % 2 === 0 ? 'green' : 'blue'}">
        <div class="post-content">
          <span class="post-text">{post.text}</span>
          <span class="post-timestamp">{post.timestamp}</span>
        </div>

        <div class="like-comment-container">
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
        </div>

        {#if post.createComment}
          <div class="comment-section">
            <form
              class="create-post-container-2"
              on:submit|preventDefault={(event) => createComment(event, index)}
            >
              <input
                type="text"
                class="input-2"
                bind:value={$commentInputs[index]}
              />
              <button class="button left-margin" type="submit">Send</button>
            </form>
            {#each post.comments as comment, commentIndex}
              <div class="post-text">
                {`${commentIndex}) ${comment}`}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</main>

<style>
</style>
