import { Button, Form, Input } from 'antd'
import React from 'react'
import useMyStore from '../../Context'
import styles from './index.module.scss'

function AddNote({isOpen, setIsOpen}) {
  let {Notes, addNote} = useMyStore((state) => state)

  function Submit(values) {
    addNote({
      ...values,
      id: Math.round(Math.random() * 1000)
    })
    setIsOpen(false)
  }

  return (
    <>
      <div className={isOpen && styles.area} onClick={() => setIsOpen(false)}></div>
      <div className={[isOpen ? styles.open : styles.close, styles.modal].join(" ")}>
        <Form onFinish={Submit} className={styles.form}>
          <Form.Item name="title" label="Note title"  initialValue={""} className={styles.input}>
            <Input placeholder='Enter Note title' />
          </Form.Item>
          <Form.Item name="text" label="Note text" initialValue={""} className={styles.textarea}>
            <Input.TextArea placeholder='Enter Note text' />
          </Form.Item>
          <Form.Item name="BGcolor" label="Note Color" initialValue={"black"}  className={styles.colorInput}>
            <input type='color' defaultValue={"black"} placeholder='Enter Note text' />
          </Form.Item>
          <Button htmlType='submit' type='primary'>Add Note</Button>
        </Form>
      </div>
    </>
  )
}

export default AddNote