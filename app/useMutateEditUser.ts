import useSWRMutation from "swr/mutation";

export default function useMutateEditUser() {
  const { trigger, isMutating, data } = useSWRMutation("users", editUser);
  async function editUser(
    params: string,
    { arg }: { arg: { id: string; patch: object } }
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
