import { useQuery, useMutation } from "@tanstack/react-query";
import Instance from "../Utils/Instance";
import useMyStore from "../Context";

function useGetData(keys, api, options) {
  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const data = await Instance.get(api);
      return data.data;
    },
    options
  });
}
function usePostData(api) {
    return useMutation({
        mutationFn: async (data) => {
            const res = await Instance.post(api, data);
            return res;
        },
    })
}

function useDeleteData() {
    return useMutation((api) => Instance.delete(api))
}

function useUpdateData(api) {
    return useMutation({
        mutationFn: async (data) => {
            const res = await Instance.patch(api, data);
            return res;     
        }
    })

}

function usePostAuth(api) {
    let token = useMyStore(state => state.token) 
    return useMutation({
        mutationFn: async (data) => {
            const res = await Instance.post(api, data, {headers: {
                Authorization: `Bearer ${token}`
            }});
            return res;
        },
    })
}

function useGetUser(keys, api) {
    let token = useMyStore(state => state.token) 

    return useQuery({
        queryKey: keys,
        queryFn: async () => {
            const data = await Instance.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data.data
        } 
    })
}


export { usePostData, useDeleteData, useUpdateData, usePostAuth, useGetUser };
export default useGetData;
