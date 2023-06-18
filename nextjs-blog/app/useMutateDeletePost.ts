import useSWRMutation from "swr/mutation";

export default function useMutateDeletePost() {
  const { trigger, isMutating, data } = useSWRMutation("posts", deletePost);
  async function deletePost(
    params: string,
    { arg }: { arg: { id: number } }
  ) {
    fetch(`http://localhost:3000/${params}/${arg.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
  return { trigger, isMutating, data };
}
