import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MyUpload from '../../Components/Upload';
import styles from './index.module.scss'
import { useForm } from 'react-hook-form'; 
import useGetData, { useDeleteData, usePostData, useUpdateData } from '../../Api/Queries';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';




function Modal_Outlet({type}) {
  let queryClient = useQueryClient()  

  let {action} = useParams()
  let navigate = useNavigate()
  let [image, setImage] = useState(null)

  let {data: categories} = useGetData(["categories"], "/category")
  let {data: product} = useGetData(['product/', action], `/products/${action}`)
  let {data: products} = useGetData(['all_products'], `/products`)

  
  let Post = usePostData(`/${type}`)
  let categoryPost = usePostData('/category')
  let Update = useUpdateData(`/products/${action}`)
  let UpdateCateg = useUpdateData(`/category/${action}`)

  let CurrentProduct = products?.data?.find((e) => e.id == action)
  let CurrentCategory = categories?.data?.find((e) => e.id == action)


  function Success() {
    toast.success("O'xshadi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: "",
      theme: "dark",
    });
  }

  function Submit(values) {
    // Delete.mutate('/2445d4ab-4745-49ea-89d3-e9e831e6b18a', {
    //   onSuccess: () => console.log("success"),
    // })

    if(type == "products") {
      console.log("aijsghdhbahbsdkjbakjsbkabskdbad");
      if(action == "add") {
        console.log({
          ...values,
          "id": "",
          "price": Number(values.price),
          "gender": "BOTH",
          "active": true,

          // "id": "",
          // "color": values.color,
          // "price": Number(values.price),
          // "size": values.size,
          // "name_Uz": values.name_Uz,
          // "name_Ru": values.name_Ru,
          // "name_En": values.name_En,
          // "description_Uz": values.description_Uz,
          // "description_Ru": values.description_Ru,
          // "description_En": values.description_En,

          "type": "string",
          "photoId": "string",
          "discount": 0
          // "categoryId": values.category,
        });
        Post.mutate({
          ...values,
          "id": "",
          "price": Number(values.price),
          "gender": "BOTH",
          "active": true,

          // "id": "",
          // "color": values.color,
          // "price": Number(values.price),
          // "size": values.size,
          // "name_Uz": values.name_Uz,
          // "name_Ru": values.name_Ru,
          // "name_En": values.name_En,
          // "description_Uz": values.description_Uz,
          // "description_Ru": values.description_Ru,
          // "description_En": values.description_En,
          "type": "string",
          "photoId": "string",
          "discount": 0
          // "categoryId": values.category,
        }, {  
          onSuccess: () => {
            Success()
            queryClient.invalidateQueries({queryKey: ["all_products"]}) 
            navigate(-1)
          }
        }) 
      }
      else {
        Update.mutate({
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
        }, {
          
          onSuccess: () => {
            Success()
            navigate(-1)
            queryClient.invalidateQueries({queryKey: ['all_products']})
          }
        }) 
      }
    }
    else {
      if(action == "add") {
        categoryPost.mutate({
          "name_Uz": values.name_Uz,
          "name_Ru": values.name_Ru,
          "name_En": values.name_En,
          "photoId": "d56be775-280e-4ed2-9417-c962cfc35a92",
          "photo": {
            'id': "d56be775-280e-4ed2-9417-c962cfc35a92",
            "createdAt": new Date().toISOString(),
            "path": "23412325321235.png"
          }
        }, {
          onSuccess: () => {
            Success()
            queryClient.invalidateQueries({queryKey: ["categories"]})
            navigate(-1)
          }
        })
      }
      else {
        UpdateCateg.mutate({
          "name_Uz": values.name_Uz,
          "name_Ru": values.name_Ru,
          "name_En": values.name_En,
          "photoId": "d56be775-280e-4ed2-9417-c962cfc35a92"
          // "photo": {
          //   'id': "d56be775-280e-4ed2-9417-c962cfc35a92",
          //   "createdAt": new Date().toISOString(),
          //   "path": "23412325321235.png"
          // }
        }, {
          onSuccess: () => {
            Success()
            queryClient.invalidateQueries({queryKey: ["categories"]})
            navigate(-1)
          }
        })
      }
    }
  }


  if(type == "products") {
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
            <Form.Item  className={styles.input} name='color' initialValue={CurrentProduct?.color}><Input required placeholder="Enter product's color"  /></Form.Item>
            <Form.Item className={styles.textarea} name='description_Uz' initialValue={CurrentProduct?.description_Uz}><TextArea required placeholder="Enter product's description in uzbek" /></Form.Item>
            <Form.Item  className={styles.textarea} name='description_Ru' initialValue={CurrentProduct?.description_Ru} ><TextArea required placeholder="Enter product's description in russian" /></Form.Item>
            <Form.Item  className={styles.textarea} name='description_En' initialValue={CurrentProduct?.description_En}><TextArea required placeholder="Enter product's description in english" /></Form.Item>
            
            <Form.Item 
              name="categoryId"
              className={styles.select}
              required
              initialValue={CurrentProduct?.categoryId}
            >
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
            </Form.Item>
            <Form.Item required className={styles.textarea} name="image_url"><Input placeholder='url for image' /></Form.Item>
            <Button htmlType='submit' type='primary'>{action == "add" ? "Add" : "Update"}</Button>
          </Form>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className={styles.closeArea} onClick={() => navigate(-1)}></div>
        <div className={[styles.modal, styles.category].join(" ")}> 
          <Form onFinish={Submit}>
            <Form.Item label="Uz name" className={styles.input} name='name_Uz' initialValue={CurrentCategory?.name_Uz}><Input required placeholder="Enter product's title in uzbek" /></Form.Item>
            <Form.Item label="Ru name" className={styles.input} name='name_Ru' initialValue={CurrentCategory?.name_Ru}><Input required placeholder="Enter product's title in russian" /></Form.Item>
            <Form.Item label="En name" className={styles.input} name='name_En' initialValue={CurrentCategory?.name_En}><Input required placeholder="Enter product's title in english" /></Form.Item>
            
            <Button htmlType='submit' type='primary'>{action == "add" ? "Add" : "Update"}</Button>
          </Form>
        </div>
      </>
    )
  }

}
export default Modal_Outlet