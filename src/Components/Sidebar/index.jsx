import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'


function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/category">Categories</NavLink></li>
            <li><NavLink to="/control-panel">Control panel</NavLink></li>
            <li><NavLink to="/messages">Messages</NavLink></li>
            <li><NavLink to="/write-message">Write Message</NavLink></li>
        </ul>
    </div>
  )
}
export default Sidebar