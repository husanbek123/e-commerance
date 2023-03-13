import React, { useEffect, useState } from 'react'
import useMyStore from '../../Context'
import Sidebar from '../Sidebar'
import styles from './index.module.scss'

function Layout({children}) {

  let {currentFont} = useMyStore((state) => state)
  let [isSettings, setIsSettings] = useState(false)

  useEffect(() => {
    console.log(currentFont);
  }, [currentFont])

  return (
    <div className={[styles.layout, isSettings && styles.btnsDisabled].join(" ")} style={{
      fontFamily: `${currentFont}, sans-serif`
    }}>
      <div className={styles.left_side}>
        <Sidebar isSettings={isSettings} setIsSettings={setIsSettings} />
      </div>
      <div className={styles.right_side}>
        {children}
      </div>
    </div>
  )
}

export default Layout