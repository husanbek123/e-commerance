import { Button } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useGetData from "../../Api/Queries";
import MyTable from "../../Components/Table";
import styles from "./index.module.scss";

function Categories() {
  let navigate = useNavigate();
  let { data } = useGetData(["categories"], "/category");

  return (
    <div className={styles.categories}>
      <header className="row">
        <h3>All Categories shu yerda boladi</h3>
        <Button onClick={() => navigate("/")} type="primary">
          Add new Category
        </Button>
      </header>
      <br />
      <Outlet />

      <MyTable data={data?.data} type="category" />
    </div>
  );
}
export default Categories;
