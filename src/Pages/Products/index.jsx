import { Button } from 'antd';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import useGetData from '../../Api/Queries'
import styles from './index.module.scss'


function Products() {

  let {data} = useGetData(["users"], "/products")
  console.log(data);

  let navigate = useNavigate()

  return (
    <div className={styles.products}>
      <header className='row'>
        <h3>All Products</h3>

        <Button type='primary' onClick={() => navigate('product_add')}>Add Product</Button>
      </header>
      <Outlet />
    </div>
  )
}

export default Products