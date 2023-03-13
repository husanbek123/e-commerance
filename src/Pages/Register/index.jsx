import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next';
import useMyStore from '../../Context';
import i18next from 'i18next';
import { usePostAuth } from '../../Api/Queries';
import { useNavigate } from 'react-router-dom';


function Register() {
    let navigate = useNavigate()
    let {t} = useTranslation()
    let {setCurrentLang, currentLang, setToken} = useMyStore((state) => state)

    let post = usePostAuth("/auth/signup")

    function register(values) {
        post.mutate({
            ...values
        }, {
            onSuccess: (data) => {
                console.log(data);
                setToken(data?.data?.access_token)
                navigate("/login")
            }
        })
    }

    function Switch(e) {
        setCurrentLang(e)
        i18next.changeLanguage(e)
    }
  
    return (
      <div className={[styles.register, "form"].join(' ')}>
        <h2>Register</h2>
          <Form onFinish={register} className="form_in">
              <Form.Item required name="email">
                  <Input placeholder="Enter user's email" />
              </Form.Item>
              <Form.Item required name="name">
                  <Input placeholder="Enter username" />
              </Form.Item>
              <Form.Item required name="password">
                  <Input placeholder="Enter user's password" />
              </Form.Item>
              <Button htmlType='submit' type='primary'>{t("Button.Submit")}</Button>
          </Form>
          <div className='toggle-Lang'>
            <Select 
                onChange={Switch}
                defaultValue={currentLang}
                options={[
                    {
                        label: "UZ",
                        value: "uz"
                    },
                    {
                        label: "RU",
                        value: "ru"
                    },
                    {
                        label: "EN",
                        value: "en"
                    }
                ]}
            />
        </div>
      </div>
    )

}

export default Register