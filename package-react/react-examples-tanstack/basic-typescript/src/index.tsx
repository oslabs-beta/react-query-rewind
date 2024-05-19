/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import {
  QueryClient,
  skipToken,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryRewind from "react-query-rewind";

console.log("ReactQueryRewind", ReactQueryRewind);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

type Post = {
  id: number;
  title: string;
  body: string;
};

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  });
}

function Posts({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {


  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data?.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can access the query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

const getPostById = async (id: number): Promise<Post> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: postId ? () => getPostById(postId) : skipToken,
  });
}

function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data?.title}</h1>
          <div>
            <p>{data?.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

// JD testing, not part of actual code
function TestClient() {
    const queryClient = useQueryClient();
    const queryCache = queryClient.getQueryCache();
    React.useEffect(() => {
      const unsubscribe = queryCache.subscribe((event: any) => {
        if (event.type === 'updated' && event.action?.type === 'success') {
          console.log("full event: ", event);
          console.log('parsed event: ', {
            eventType: event.type,
            queryKey: event.query.queryKey,
            queryHash: event.query.queryHash,
            timestamp: new Date(event.query.state.dataUpdatedAt),
            queryData: queryClient.getQueryData(event.query.queryKey),
          
          })
        }
      });
      return () => unsubscribe();
    }, []);
    return null;
}

function App() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
      {/* <TestClient /> */}
      <ReactQueryRewind />
    </PersistQueryClientProvider>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
