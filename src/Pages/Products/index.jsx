import { Button } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useGetData from "../../Api/Queries";
import MyTable from "../../Components/Table";
import styles from "./index.module.scss";

function Products() {
  let navigate = useNavigate();

  let { data } = useGetData(["all_products"], "/products?take=1000");
  console.log(data);

  return (
    <div className={styles.products}>
      <header className="row">
        <h3>All Products</h3>
        <Button type='primary' onClick={() => navigate('add')}>Add Product</Button>
      </header>
      <br />
      <Outlet />
      <MyTable data={data?.data} type="products" />
    </div>
  );
}
export default Products;
