import React from 'react'
import useGetData, { useDeleteData, usePostData} from '../../Api/Queries'
import styles from './index.module.scss'

function Home() {

    // console.log(useGetData(["users"], "https://jsonplaceholder.typicode.com/users").data);
    let D = useDeleteData()

    function Do() {
        console.log(D.mutate("https://jsonplaceholder.typicode.com/posts/1"));
    }
  return (
    <div className={styles.home}>
        <h3>Hello this is Dashboard</h3>
        <button onClick={Do}>Submit</button>
    </div>
  )
}

export default Home