import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import useGetData, { useDeleteData, usePostData, useUpdateData } from '../../Api/Queries';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';


function Modal_Outlet({type}) {

  let {t} = useTranslation()
  let queryClient = useQueryClient()  

  let {action, id} = useParams()
  let navigate = useNavigate()
  let [photoId, setPhotoId] = useState("")

  let {data: categories} = useGetData(["categories"], "/category")
  let {data: products} = useGetData(['all_products'], `/products`)
  let {data: Messages} = useGetData(["messages"], "/message")

  
  let Post = usePostData(`/${type}`)
  let categoryPost = usePostData('/category')
  let Update = useUpdateData(`/products/${action}`)
  let UpdateCateg = useUpdateData(`/category/${action}`)

  let CurrentProduct = products?.data?.find((e) => e.id == action)
  let CurrentCategory = categories?.data?.find((e) => e.id == action)

  let CurrentMessage = Messages?.data[id - 1]
  console.log(CurrentMessage);

  let UpdateMessage = useUpdateData(`/message/${CurrentMessage?.id}`)

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList, file }) => {
    console.log(file);
    setFileList(newFileList);
    setPhotoId(file?.response?.id)
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

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
    console.log(values);
    if(type == "products") {
      if(action == "add") {
        Post.mutate({
          ...values,
          "id": "",
          "price": Number(values.price),
          "gender": "BOTH",
          "active": true,
          "type": "string",
          "photoId": photoId.toString(),
          "discount": 0
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
    else if(type == "category") {
      if(action == "add") {
        categoryPost.mutate({
          "name_Uz": values.name_Uz,
          "name_Ru": values.name_Ru,
          "name_En": values.name_En,
          "photoId": photoId
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
        }, {
          onSuccess: () => {
            Success()
            queryClient.invalidateQueries({queryKey: ["categories"]})
            navigate(-1)
          }
        })
      }
    }
    else {
      UpdateMessage.mutate({
        ...CurrentMessage,
        status: values.status
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries("messages")
          navigate(-1)
        }
      })
    }
  }

  if(type == "products") {
    return (
      <>
        <div className={styles.closeArea} onClick={() => navigate(-1)}></div>
        <div className={styles.modal}> 
          <Form onFinish={Submit}>
            <Form.Item label={"Uz-" + t("Others.Name")} className={styles.input} name='name_Uz' initialValue={CurrentProduct?.name_Uz}><Input required placeholder="Enter product's title in uzbek" /></Form.Item>
            <Form.Item label={"Ru-" + t("Others.Name")} className={styles.input} name='name_Ru' initialValue={CurrentProduct?.name_Ru}><Input required placeholder="Enter product's title in russian" /></Form.Item>
            <Form.Item label={"En-" + t("Others.Name")} className={styles.input} name='name_En' initialValue={CurrentProduct?.name_En}><Input required placeholder="Enter product's title in english" /></Form.Item>
            <Form.Item label={t("Others.Price")} className={styles.input} name='price' initialValue={CurrentProduct?.price}><Input required placeholder="Enter product's price" /></Form.Item>
            <Form.Item label={t("Others.Size")} className={styles.input} name='size' initialValue={CurrentProduct?.size}><Input required placeholder="Enter product's size" /></Form.Item>
            <Form.Item label={t("Others.Color")} className={styles.input} name='color' initialValue={CurrentProduct?.color}><Input required placeholder="Enter product's color"  /></Form.Item>
            <Form.Item label={"Uz-" + t("Others.Description")} className={styles.textarea} name='description_Uz' initialValue={CurrentProduct?.description_Uz}><TextArea required placeholder="Enter product's description in uzbek" /></Form.Item>
            <Form.Item label={"Ru-" + t("Others.Description")} className={styles.textarea} name='description_Ru' initialValue={CurrentProduct?.description_Ru} ><TextArea required placeholder="Enter product's description in russian" /></Form.Item>
            <Form.Item label={"En-" + t("Others.Description")} className={styles.textarea} name='description_En' initialValue={CurrentProduct?.description_En}><TextArea required placeholder="Enter product's description in english" /></Form.Item>
            
            <Form.Item 
              name="categoryId"
              className={styles.select}
              initialValue={CurrentProduct?.categoryId}
              label={t("Others.Category")}
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
            <ImgCrop rotate>
              <Upload
                action="http://3.19.30.204/upload/upload"
                listType="picture-card"
                fileList={[{
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: `http://3.19.30.204/upload/` + type == "category" ? CurrentCategory?.photo?.path : CurrentProduct?.photo?.path
                }]}
                onChange={onChange}
                onPreview={onPreview}
                name="photo"
                
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
            <Button htmlType='submit' type='primary'>{action == "add" ? t("Button.Add") : t("Button.Update")}</Button>
          </Form>
        </div>
      </>
    )
  }
  else if(type == "category") {
    return (
      <>
        <div className={styles.closeArea} onClick={() => navigate(-1)}></div>
        <div className={[styles.modal, styles.category].join(" ")}> 
          <Form onFinish={Submit}>
            <Form.Item label="Uz name" className={styles.input} name='name_Uz' initialValue={CurrentCategory?.name_Uz}><Input required placeholder="Enter product's title in uzbek" /></Form.Item>
            <Form.Item label="Ru name" className={styles.input} name='name_Ru' initialValue={CurrentCategory?.name_Ru}><Input required placeholder="Enter product's title in russian" /></Form.Item>
            <Form.Item label="En name" className={styles.input} name='name_En' initialValue={CurrentCategory?.name_En}><Input required placeholder="Enter product's title in english" /></Form.Item>
            <ImgCrop rotate>
              <Upload
                action="http://3.19.30.204/upload/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                name="photo"
                defaultFileList={[CurrentCategory?.photo?.path]}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
            <Button htmlType='submit' type='primary'>{action == "add" ? t("Button.Add") : t("Button.Update")}</Button>
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
            {/* <Form.Item label="Status" className={styles.input} name='status' initialValue={CurrentMessage?.status}><Input required placeholder="Enter product's title in english" /></Form.Item> */}
            
            <Form.Item 
              name="status"
              className={styles.select}
              initialValue={CurrentMessage?.status}
              label="Status"
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
                options={["PENDING", "RESOLVED", "REJECTED"].map(item => ({
                  title: item,
                  value: item
                }))}
              />
            </Form.Item>

            <Button htmlType='submit' type='primary'>{action == "add" ? t("Button.Add") : t("Button.Update")}</Button>
          </Form>
        </div>
      </>
    )
  }

}
export default Modal_Outlet