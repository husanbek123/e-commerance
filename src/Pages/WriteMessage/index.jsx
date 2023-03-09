import { Button, Form, Input } from 'antd'
import React from 'react'
import useGetData, {usePostData, useDeleteData, useUpdateData} from '../../Api/Queries'


function WriteMessage() {

    let Post = usePostData("/message") 

    function Submit(values) {
        Post.mutate({
            ...values,
            status: "PENDING"
        }, {
            onSuccess: () => console.log("aojks;kjk;ajsd")
        })
    }
 
  return (
    <div className=''>
        <Form onFinish={Submit}>
            <Form.Item name='subject' ><Input type="text"  placeholder='subject' /></Form.Item>
            <Form.Item name='message'><Input type="text" placeholder='message' /></Form.Item>
            <Form.Item name='phone'><Input type="number" placeholder='phone' /></Form.Item>
            <Button type='primary' htmlType='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default WriteMessage