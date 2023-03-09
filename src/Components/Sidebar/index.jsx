import { Form, Select } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import useMyStore from '../../Context'
import styles from './index.module.scss'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

function Sidebar() {

  let {currentLang, setCurrentLang} = useMyStore((state) => state)
  let { t } = useTranslation()
  function Switch(e) {
    setCurrentLang(e)
    i18next.changeLanguage(e)
  }



  return (
    <div className={styles.sidebar}>
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
    </div>
  )
}
export default Sidebar