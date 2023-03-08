import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
import Instance from "../Utils/Instance";

function useGetData(keys, api, options) {
  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const data = await Instance.get(api);
      return data.data;
    },
    // staleTime: 100,
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

export { usePostData, useDeleteData, useUpdateData };
export default useGetData;
