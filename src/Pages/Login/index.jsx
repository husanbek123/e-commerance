import { Button, Form, Input, Select } from 'antd'
import i18next from 'i18next';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetUser, usePostAuth } from '../../Api/Queries';
import useMyStore from '../../Context';
import styles from './index.module.scss'

function Login() {
    let navigate = useNavigate()
    let {t} = useTranslation()
    let {setCurrentLang, currentLang, setToken, setIsAdminLoggedIn, setUser} = useMyStore((state) => state)
    let post = usePostAuth("/auth/signin")
    let {data, isLoading} = useGetUser(["user"], '/user/me')

    function login(values) {
        console.log(values);
        if(!isLoading) {
            setUser(data)
            navigate("/")
        }
        // post.mutate({
        //     ...values
        // }, {
        //     onSuccess: (data) => {
        //         console.log(data);
        //         setIsAdminLoggedIn(true)
        //         setToken(data?.data?.access_token)
        //         navigate("/")
        //     }
        // })
    }

    function Switch(e) {
        setCurrentLang(e)
        i18next.changeLanguage(e)
    }

  return (
    <div className={[styles.login, "form"].join(" ")}>
        <h2>Login</h2>
        <Form onFinish={login} className="form_in">
            <Form.Item name="email">
                <Input placeholder="Enter user's email" />
            </Form.Item>
            <Form.Item name="name">
                <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item name="password">
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

export default Login