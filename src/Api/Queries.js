import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Instance from "../Utils/Instance";


function useGetData(keys, api, options) {
    return useQuery({
        queryKey: keys,
        queryFn: async () => {
            const data = await Instance.get(api);
            return data.data;
        },
        options
    })
}

function usePostData() {
    return useMutation({
        mutationFn: (api) => {
            return Instance.post(api).then(res => res.data)
        }
    })
}

function useDeleteData() {
    return useMutation({
        mutationFn: (api) => {
            return Instance.delete(api).then(res => res.data)
        }
    })
}

function useUpdateData() {
    return useMutation({
        mutationFn: (api, data) => {
            return Instance.patch(api, data).then(res => res.data)
        }
    })
}


export { usePostData , useDeleteData, useUpdateData }
export default useGetData