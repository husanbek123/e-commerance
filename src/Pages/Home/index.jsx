import React from 'react'
import useGetData, { useDeleteData, usePostData} from '../../Api/Queries'
import styles from './index.module.scss'

function Home() {

    // console.log(useGetData(["users"], "https://jsonplaceholder.typicode.com/users").data);
  return (
    <div className={styles.home}>
        <h3>Hello this is Dashboard</h3>
    </div>
  )
}

export default Home