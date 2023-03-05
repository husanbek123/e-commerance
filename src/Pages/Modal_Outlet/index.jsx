import { Button, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'

function Modal_Outlet() {

  let {action} = useParams()
  let navigate = useNavigate()

  return (
    <>
      <div className={styles.closeArea} onClick={() => navigate(-1)}></div>
      <div className={styles.modal}> 
        <form>
          <Input placeholder="Enter product's title in uzbek" name='title_uz' />
          <Input placeholder="Enter product's title in russian" name='title_ru' />
          <Input placeholder="Enter product's title in english" name='title_en' />
          <TextArea required placeholder="Enter product's description in uzbek" name='description_uz' />
          <TextArea required placeholder="Enter product's description in russian" name='description_ru' />
          <TextArea required placeholder="Enter product's description in english" name='description_en' />
          <Select  
            mode='tags'
            className={styles.select}
            placeholder="Choose category"
          />
          <Button htmlType='submit' type='primary'>{action.split("_").reverse().join(" ").charAt().toUpperCase() + action.split("_").reverse().join(" ").slice(1)}</Button>
        </form>
      </div>
    </>
  )
}

export default Modal_Outlet