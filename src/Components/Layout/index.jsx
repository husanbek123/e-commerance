import React from 'react'
import Sidebar from '../Sidebar'
import styles from './index.module.scss'

function Layout({children}) {
  return (
    <div className={styles.layout}>
      <div className={styles.left_side}>
        <Sidebar />
      </div>
      <div className={styles.right_side}>
        {children}
      </div>
    </div>
  )
}

export default Layout