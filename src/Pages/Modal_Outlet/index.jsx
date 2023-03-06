import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MyUpload from '../../Components/Upload';
import styles from './index.module.scss'
import { useForm } from 'react-hook-form'; 
import useGetData, { useDeleteData, usePostData, useUpdateData } from '../../Api/Queries';



function Modal_Outlet({type}) {
  let {action} = useParams()
  let navigate = useNavigate()
  let [image, setImage] = useState(null)

  let {data: categories} = useGetData(["categories"], "/category")
  let {data: product} = useGetData(['product/', action], `/products/${action}`)
  let {data: products} = useGetData(['products'], `/products`)
  let Post = usePostData(`/${type}`)
  let Update = useUpdateData(`/products/${action}`)


  let CurrentProduct = products?.data?.find((e) => e.id == action)

  function Change(e) {
    let file = e.file
    file = URL.createObjectURL(file)
    setImage(file)
  }

  function Submit(values) {
    // Delete.mutate('/2445d4ab-4745-49ea-89d3-e9e831e6b18a', {
    //   onSuccess: () => console.log("success"),
    // })

    console.log(values, ";kajsdhjalsjd");

    if(type == "products") {
      if(action == "add") {
        Post.mutate({
          "id": "",
          "gender": "BOTH",
          "color": values.color,
          "active": true,
          "price": values.price,
          "size": values.size,
          "type": "string",
          "name_Uz": values.name_Uz,
          "name_Ru": values.name_Ru,
          "name_En": values.name_En,
          "description_Uz": values.description_Uz,
          "description_Ru": values.description_Ru,
          "description_En": values.description_En,
          "photoId": null,
          "categoryId": values.category,
          "discount": 0,
          "image_Url": values.image_url
        }) 
      }
      else {
        Update.mutate({
          "id": "",
          "color": values.color,
          "active": true,
          "price": Number(values.price),
          "size": values.size,
          "name_Uz": values.name_Uz,
          "name_Ru": values.name_Ru,
          "name_En": values.name_En,
          "description_Uz": values.description_Uz,
          "description_Ru": values.description_Ru,
          "description_En": values.description_En,
          "image_Url": values.image_url
        })
      }
    }
  }

  return (
    <>
      <div className={styles.closeArea} onClick={() => navigate(-1)}></div>
      <div className={styles.modal}> 
        <Form onFinish={Submit}>
          <Form.Item  className={styles.input} name='name_Uz' initialValue={CurrentProduct?.name_Uz}><Input required placeholder="Enter product's title in uzbek" /></Form.Item>
          <Form.Item  className={styles.input} name='name_Ru' initialValue={CurrentProduct?.name_Ru}><Input required placeholder="Enter product's title in russian" /></Form.Item>
          <Form.Item  className={styles.input} name='name_En' initialValue={CurrentProduct?.name_En}><Input required placeholder="Enter product's title in english" /></Form.Item>
          <Form.Item  className={styles.input} name='price' initialValue={CurrentProduct?.price}><Input required placeholder="Enter product's price" /></Form.Item>
          <Form.Item  className={styles.input} name='size' initialValue={CurrentProduct?.size}><Input required placeholder="Enter product's size" /></Form.Item>
          <Form.Item  className={styles.input} name='color' initialValue={CurrentProduct?.color}><Input required placeholder="Enter product's color" /></Form.Item>
          <Form.Item  className={styles.textarea} name='description_Uz' initialValue={CurrentProduct?.description_Uz}><TextArea required placeholder="Enter product's description in uzbek" /></Form.Item>
          <Form.Item  className={styles.textarea} name='description_Ru' initialValue={CurrentProduct?.description_Ru} ><TextArea required placeholder="Enter product's description in russian" /></Form.Item>
          <Form.Item  className={styles.textarea} name='description_En' initialValue={CurrentProduct?.description_En}><TextArea required placeholder="Enter product's description in english" /></Form.Item>
          
          {/* <Form.Item 
            name="category"
            className={styles.select}
            required
            initialValue={product?.categoryId}
          > */}
            <Select
              showSearch
              className={styles.select}
              placeholder="Choose category"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={categories?.data?.map(item => ({
                label: item?.name_Uz,
                value: item?.id,
              }))}
            />
          {/* </Form.Item> */}
          <Form.Item required className={styles.textarea} name="image_url"><Input placeholder='url for image' /></Form.Item>
          <Button htmlType='submit' type='primary'>{action == "add" ? "Add" : "Update"}</Button>
        </Form>
      </div>
    </>
  )
}
export default Modal_Outlet