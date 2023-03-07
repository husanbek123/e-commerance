
import axios from 'axios'
import React, { useState } from 'react'
import useGetData, { useDeleteData, usePostData} from '../../Api/Queries'
import styles from './index.module.scss'
import useMyStore from '../../Context'

function Home() {
  let {data} = useGetData(["users"], "/products")
  let D = useDeleteData();

  let {currentLang, setCurrentLang} = useMyStore((state) => state) 
  console.log(data, currentLang);

  let [image, setImage] = useState(null)
  let [url, setUrl] = useState(null) 


  function Submit() {
    setCurrentLang("En")
  }
  
  function Nimadir() {
    axios.post("https://crudcrud.com/api/4bab7d142f144afeb7fbbb4c4e39fb7c/links", url, {
      headers: {
        'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, PATCH, OPTIONS',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Authorization, X-Requested-With",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8 ",
      },
      method: "POST",
    }).then(res => console.log(res))
  }

  function Change(e) {
    let b = e.target.files[0]
    let a = URL.createObjectURL(b)
    setImage(a) 
  }


  return (
    <div className={styles.home}>
      <h3>Hello this is Dashboard</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={Change} />
        <button onClick={Submit}>Submit</button>
        <button onClick={Nimadir}>Nimadir</button>
      </form>


      {
        image && <img src={image} alt="" height={"200px"} width={"200px"} />
      }

      {
        data?.data?.map((item) => 
          <h2>{item[`name_${currentLang}`]}</h2>
        )
      }

    </div>
  );
}

export default Home

