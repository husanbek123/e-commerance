import React from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import useGetData from '../../Api/Queries'
import Mytable from '../../Components/Table'

function Messages() {
  let {t} = useTranslation()
  let {data} = useGetData(["messages"], "/message")

  return (
    <div className='messages_page'>
      <h3>{t("Pages.Messages")}</h3>
      <br />
      <Mytable data={data?.data} type="messages" />
      <Outlet />
    </div>
  )
}

export default Messages