
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
import AddNote from '../../Components/AddNote'
import Note from '../../Components/Note'
import NoteSettings from '../../Components/NoteSettings'


function Home() {
  let {data} = useGetData(["users"], "/products")
  let D = useDeleteData();
  let [isOpen, setIsOpen] = useState(false)
  let {currentLang, setCurrentLang, Notes, addNote, setNotes, currentFont} = useMyStore((state) => state) 
  let [lang, setLang] = useState("uz") 


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
    <div className={styles.home} style={{
      fontFamily: "Oswald, sans-serif"
    }}>
      <div className='row'>
        <h4>{t("Titles.Welcome")}</h4>
        <div className={[styles.buttons, 'buttonIndex'].join(" ")}>
          <Button onClick={() => setIsOpen(true)} type='primary'>Add Note</Button> 
        </div>
      </div>
      {
        isOpen == true && <AddNote setIsOpen={setIsOpen} isOpen={isOpen} />
      }
      <br />
      <div className={styles.notes} >
        {
          Notes?.map(note => (
            <Note  
              BGcolor={note.BGcolor}
              text={note.text}
              title={note.title}
              id={note.id}
            /> 
          ))
        }
      </div>
    </div>
  );  
}

export default Home;
