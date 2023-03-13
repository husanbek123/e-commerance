import { Button, Form, Select } from 'antd'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useMyStore from '../../Context'
import styles from './index.module.scss'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import NoteSettings from '../NoteSettings'

function Sidebar({isSettings, setIsSettings}) {

  let {currentLang, setCurrentLang, user} = useMyStore((state) => state)

  let { t } = useTranslation()
  
  function Switch(e) {
    setCurrentLang(e)
    i18next.changeLanguage(e)
  }



  return (
    <div className={styles.sidebar}>
      <h3>{user?.name}</h3>
      <ul>
        <li><NavLink to="/">{t("Pages.Home")}</NavLink></li>
        <li><NavLink to="/users">{t("Pages.Users")}</NavLink></li>
        <li><NavLink to="/products">{t("Pages.Products")}</NavLink></li>
        <li><NavLink to="/category">{t("Pages.Categories")}</NavLink></li>
        <li><NavLink to="/control-panel">{t("Titles.Information")}</NavLink></li>
        <li><NavLink to="/messages">{t("Pages.Messages")}</NavLink></li>
      </ul>
      <br />
      <Form >
        <Form.Item 
          name="categoryId"
          className={styles.select}
          initialValue={currentLang}
        >
          <Select
            className={styles.select}
            placeholder="Choose category"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={['uz', 'ru', 'en'].map(item => ({
              label: item.toUpperCase(),
              value: item,
            }))}
            onChange={Switch}
          />
        </Form.Item>
      </Form>
      <Button onClick={() => setIsSettings(true)} type='primary'><i class="fa-solid fa-gear"></i></Button> 
      {
        isSettings && <NoteSettings isOpen={isSettings} setIsOpen={setIsSettings} />
      }

    </div>
  )
}
export default Sidebar