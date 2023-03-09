import React from 'react'
import useGetData from '../../Api/Queries'

function Messages() {

    let {data} = useGetData(["messages"], "/message")
    console.log(data);

  return (
    <div className='messages'>
        {
            // data?.da
        }
    </div>
  )
}

export default Messages