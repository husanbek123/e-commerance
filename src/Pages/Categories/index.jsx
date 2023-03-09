import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import useGetData from "../../Api/Queries";
import MyTable from "../../Components/Table";
import styles from "./index.module.scss";

function Categories() {
  let navigate = useNavigate();
  let { data } = useGetData(["categories"], "/category");
  let {t} = useTranslation()

  return (
    <div className={styles.categories}>
      <header className="row">
        <h3>{t("Titles.All Categories")}</h3>
        <Button onClick={() => navigate("add")} type="primary">
          {t("Button.Add new Category")}
        </Button>
      </header>
      <br />
      <Outlet />
      <MyTable data={data?.data}  type="category" />
    </div>
  );
}
export default Categories;
