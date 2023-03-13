import { Button, Form, Select } from 'antd'
import React, { useState } from 'react'
import useMyStore from '../../Context'
import styles from './index.module.scss'


function NoteSettings({isOpen, setIsOpen}) {
    let fonts = [
        {
            value: "Manrope",
            title: "Manrope"
        },
        {
            value: "Oswald",
            title: "Oswald"
        },
        {
            value: "Roboto",
            title: "Roboto"
        },
        {
            value: "Ubuntu",
            title: "Ubuntu"
        }
    ]
    let {Notes, addNote, currentFont, setCurrentFont} = useMyStore((state) => state)

    function Submit(values) {
        setCurrentFont(values.font)
        setIsOpen(false)
        console.log(currentFont);
    }

  return (
    <>
        <div  className={isOpen && styles.area} onClick={() => setIsOpen(false)}></div>
        <div className={styles.modal}>
            <Form onFinish={Submit}>
                <Form.Item initialValue={currentFont} name="font">
                    <Select 
                        className={styles.select}
                        options={fonts}
                    />
                </Form.Item>
                <Button htmlType='submit' type='primary'>Apply</Button>
            </Form>
        </div>
    </>
  )
}
export default NoteSettings