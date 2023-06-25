import useSWRMutation from 'swr/mutation'

export default function useMutateNotifications(){
    const {trigger, isMutating, data} = useSWRMutation('notifications', addNotifications)
    async function addNotifications(params: string, {arg}:{arg: {body: object}}) {
        fetch (`http://localhost:3000/${params}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arg.body)
        })
        
    }
return {trigger, isMutating, data}
}