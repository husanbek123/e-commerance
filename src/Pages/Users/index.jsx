
import React from 'react'
import styles from './index.module.scss'
import MyTable from '../../Components/Table'
import useGetData from '../../Api/Queries'
import { useTranslation } from 'react-i18next'


function AllUsers() {
  let data = useGetData(['users'], "/user")
  let {t} = useTranslation()


  return (
    <div className={styles.all_users}>
      <h3>{t("Titles.All users")}</h3>
      <br />
      <MyTable data={data ? data?.data : []} />
    </div>
  );
}

export default AllUsers;
