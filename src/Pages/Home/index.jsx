import axios from 'axios'
import React, { useState } from 'react'
import useGetData, { useDeleteData, usePostData} from '../../Api/Queries'
import styles from './index.module.scss'
import useMyStore from '../../Context'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import uzbek from '../../Lang/Uzbek.json'
import english from '../../Lang/English.json'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'


function Home() {

  let {data} = useGetData(["users"], "/products")
  let D = useDeleteData();

  let {currentLang, setCurrentLang} = useMyStore((state) => state) 
  let [lang, setLang] = useState("uz") 
  console.log(data, currentLang);

  let [image, setImage] = useState(null)
  let [url, setUrl] = useState(null) 

  let {t} = useTranslation()

  function Submit() {
    setCurrentLang("En")
  }
  

  function Change(e) {
    let b = e.target.files[0]
    let a = URL.createObjectURL(b)
    setImage(a) 
  }

  return (
    <div className={styles.home}>
      <div className='row'>
        <h4>{t("Titles.Welcome")}</h4>
        <Button type='primary'>Add Note</Button> 
      </div>
    </div>
  );  
}

export default Home

