import React from "react";
import { Button, Table } from "antd";
import useGetData, { useDeleteData, useUpdateData } from "../../Api/Queries";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Warning from "../Warning";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import styles from './index.module.scss' 
 

function MyTable({ data, type }) {
  let {t} = useTranslation()
  let { data: products } = useGetData(["all_products"], "/products");
  let Del = useDeleteData();

  let queryClient = useQueryClient()  
  let navigate = useNavigate();

  function Delete(id) {
    if(type == "category") {
      for(let i of products?.data) {
        if(i?.categoryId == id) {
          Del.mutate("/products/" + i.id, {
            onSuccess: () => queryClient.invalidateQueries("all_products")
          })
        }
      }
    }

    Del.mutate(`${type}/${id}`, {
      onSuccess: () => {
        toast.success("O'chirildi!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
          theme: "dark",
        });
        navigate(`/${type}`)
        queryClient.invalidateQueries("all_products")
      }
    });
  }

  function Update(id) {
    navigate(id)
  }

  let columns = []
  let myData = [];

  if (type === "products") {
    columns = [
      {
        title: t("Others.Name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("Others.Price"),
        dataIndex: "price",
        key: "price",
      },
      {
        title: t("Others.Size"),
        dataIndex: "size",
        key: "size",
      },
      {
        title: t("Others.Image"),
        dataIndex: "image",
        key: "image",
      },
      {
        title: t("Others.Category"),
        dataIndex: "category",
        key: "category",
      },
      {
        title: t("Others.Action"),
        dataIndex: "action",
        key: "action",
      },
    ];
    data?.map((item, index) => {
      myData.push({
        ...item,
        name: item?.name_Uz,
        key: index + 1,
        description: (
          <h5>
            {item?.description_Uz}
            <br />
            <p>Product-id: {item?.id} </p>
            <p>Category-id: {item?.Category?.id}</p>
            <p>Category name: {item?.Category?.name_Uz}</p>
          </h5>
        ),
        image: <div className="img">
          <img src={"http://3.19.30.204/upload/" + item?.photo?.path} height="60px" width="60px" alt="" />
        </div>,
        category: item?.Category?.name_Uz,
        action: (
          <div>
            <Warning onOk={()=> Delete(item?.id)} text={t("Button.Delete")} color="red" />
            <a> </a>
            <Button style={{
              backgroundColor: "green"
            }} type="primary" onClick={() => Update(item?.id)}>{t("Button.Update")}</Button>
          </div>
        ),
      });
    });
  } else if(type == "category") {
    columns = [
      {
        title: t("Others.Name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("Others.Number of products"),
        dataIndex: "number",
        key: "number",
      },
      {
        title: t("Others.Image"),
        dataIndex: "image",
        key: "image",
      },
      {
        title: t("Others.Action"),
        dataIndex: "action",
        key: "action",
      },
    ];
    data?.map((item, index) => {
      myData.push({
        ...item,
        name: item?.name_Uz,
        key: index + 1,
        description: (
          <h5>
            <p>Category-id: {item?.id}</p>
          </h5>
        ),
        image: <div className="img">
          <img src={"http://3.19.30.204/upload/" + item?.photo?.path} height="60px" width="60px" alt="" />
        </div>,
        number: products?.data?.filter((e) => e.categoryId == item.id).length,
        action: (
          <div>
            <Warning onOk={()=> Delete(item?.id)} text={t("Button.Delete")} color="red" />
            <a> </a>
            <Button style={{
              backgroundColor: "green"
            }} type="primary" onClick={() => Update(item?.id)}>{t("Button.Update")}</Button>
          </div>
        ),
      });
    });
  }
  else if(type == "messages") {
    columns = [
      {
        title: t("Others.Title"),
        dataIndex: "subject",
        key: "subject",
      },
      {
        title: t("Others.Phone"),
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: t("Others.Status"),
        dataIndex: "status",
        key: "status",
      },
      {
        title: t("Others.Action"),
        dataIndex: "action",
        key: "action",
      },
    ]
    data?.map((item, index) => {
      myData.push({
        ...item, 
        subject: item.subject,
        description: item.message,
        phone: item.phone,
        status: item.status,
        key: index + 1,
        action: <div className="img">
          <Button 
            type="primary" 
            style={{
              backgroundColor: "green"
            }}
            onClick={() => navigate(`${index + 1}`)}
          >
            {t("Others.Change")}
          </Button>
        </div>
      })
    })
  }
  else  {
    columns = [
      {
        title: t("Others.Name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("Others.Email"),
        dataIndex: "email",
        key: "email",
      },
    ]
    if(data?.length != undefined) {
      data?.map((item, index) => {
        myData.push({
          ...item, 
          name: item.name == null ? "null" : item.name,
          description: <h5>{item.hash}</h5>,
          email: item.email,
          key: index + 1
        })
      })
    }
    else {
      console.log("this is undefined");
    }
  }

  return (
    <section className="table-container">
      <Table
        className={styles.table}
        bordered
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            record.description
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={myData}
      />
    </section>
  );
}
export default MyTable;
