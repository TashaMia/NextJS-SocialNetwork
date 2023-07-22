import useSWRMutation from "swr/mutation";

export default function useMutationPosts() {
  const { trigger, isMutating, data } = useSWRMutation("posts", addPost);
  async function addPost(params: string, { arg }: { arg: { body: object } }) {
    fetch(`http://localhost:3000/${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg.body),
    });
  }
  return { trigger, isMutating, data };
}
