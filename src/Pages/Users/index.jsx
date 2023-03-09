import React from 'react'
import styles from './index.module.scss'
import MyTable from '../../Components/Table'
import useGetData from '../../Api/Queries'


function AllUsers() {

  let {data} = useGetData(['users'], "/user")
  console.log(data);

  return (
    <div className={styles.all_users}>
      <h3>All users</h3>
      <br />

      <MyTable data={data?.data} />
    </div>
  )
}

export default AllUsers