import useSWRMutation from "swr/mutation";

export default function useMutateLikePost() {
  const { trigger, isMutating, data } = useSWRMutation("posts", likePost);
  async function likePost(
    params: string,
    { arg }: { arg: { id: number; patch: object } }
  ) {
    fetch(`http://localhost:3000/${params}/${arg.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg.patch),
    });
  }
  return { trigger, isMutating, data };
}
