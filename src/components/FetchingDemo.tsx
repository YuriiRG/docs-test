import { useQuery } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ZodType, z } from "zod";

function fetcher<T>(
  url: string,
  schema: { parse: (input: unknown) => T },
): () => Promise<T> {
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(url);
    const data = await res.json();
    return schema.parse(data);
  };
}

export default function FetchingDemo() {
  const { data, isError, isLoading, refetch, remove } = useQuery({
    queryKey: ["data"],
    queryFn: fetcher(
      "https://jsonplaceholder.typicode.com/todos/1",
      z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        completed: z.boolean(),
      }),
    ),
  });

  let dataMarkup: ReactNode;

  dataMarkup = <>{data}</>;

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error happened while fetching</div>;
  }

  return (
    <div>
      Fetching Demo using Fetch API and React Query (and React context
      providers)
      <div>Id: {data.id}</div>
      <div>User Id: {data.userId}</div>
      <div>Title: {data.title}</div>
      <div>Completed: {data.completed ? "yes" : "no"}</div>
      <button
        onClick={() => {
          remove();
          refetch();
        }}
      >
        Refetch
      </button>
    </div>
  );
}
