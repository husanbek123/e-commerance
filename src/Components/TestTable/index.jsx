import React from "react";
import { Button, Table } from "antd";
import useGetData, { useDeleteData, useUpdateData } from "../../Api/Queries";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Warning from "../Warning";
import { toast } from "react-toastify";


function MyTable({ data, type }) {
  let { data: products } = useGetData(["all_products"], "/products");
  let Del = useDeleteData();
  let Up = useUpdateData("/products");

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
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Action",
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
        category: item?.Category?.name_Uz,
        action: (
          <div>
            <Warning onOk={()=> Delete(item?.id)} text="Delete" color="red" />
            <a> </a>
            <Button style={{
              backgroundColor: "green"
            }} type="primary" onClick={() => Update(item?.id)}>Update</Button>
          </div>
        ),
      });
    });
  } else {
    columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Number of Products",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
      },
      {
        title: "Action",
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
            <Warning onOk={()=> Delete(item?.id)} text="Delete" color="red" />
            <a> </a>
            <Button style={{
              backgroundColor: "green"
            }} type="primary" onClick={() => Update(item?.id)}>Update</Button>
          </div>
        ),
      });
    });
  }

  return (
    <div>
      <Table
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
    </div>
  );
}
export default MyTable;
