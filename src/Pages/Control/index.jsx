import axios from 'axios'
import React, { useState } from 'react'
import useGetData, {useDeleteData, usePostData, useUpdateData} from '../../Api/Queries'
import Instance from '../../Utils/Instance'

function ControlPage() {
  
    let [inputData, setInputData] = useState(null)
    let {data} = useGetData(['categories'], '/category', {})
    let Post = usePostData()
    
    // console.log(data);

    // controlda man shunchaki post request ni test qivotudim
    // bu yerga tegmasezam mayli

    function Submit(e) {
        e.preventDefault()
        // Post.mutate("/tests", {
        //     name: inputData,
        // })
        Instance.post("/posts", [{
            id: Math.random() * 10000,
            "name_Uz": "string",
            "name_Ru": "string",
            "name_En": "string",
            "photoId": "string"
        }]).then(res => console.log(res))
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <input type="text" placeholder='enter something' onChange={(e) => setInputData(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ControlPage