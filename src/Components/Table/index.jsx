import React from "react";
import { Table } from "antd";
import useGetData, { useDeleteData, useUpdateData } from "../../Api/Queries";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


function MyTable({ data, type }) {
  let { data: products } = useGetData(["all_products"], "/products");
  let Del = useDeleteData();
  let Up = useUpdateData("/products");


  let queryClient = useQueryClient()  
  let navigate = useNavigate();

  function Delete(id) {
    console.log(id);
    Del.mutate(`products/${id}`, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["all_products"]})
        navigate("/products")
      }

    });
    if(Del.isLoading) {
      console.log("Loading");
    } 
    if(Del.isSuccess) {
      console.log("Successfully deleted");
    }
    else {
      console.log("Something went wrong");
    }
  }

  function Update(id) {
    console.log(id);
    navigate(id)
    // Up.mutate(`/${id}`, {
    //   active: false,
    // });
  }


  let columns = [
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
          </h5>
        ),
        category: item?.Category?.name_Uz,
        action: (
          <div>
            <button onClick={() => Delete(item?.id)}>Delete</button>
            <a> </a>
            <button onClick={() => Update(item?.id)}>Update</button>
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

        number: products?.data?.filter((e) => e.categoryId == item.id).length,
        action: (
          <div>
            <button onClick={() => Delete(item?.id)}>Delete</button>
            <a> </a>
            <button onClick={() => Update(item?.id)}>Update</button>
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
            // <p
            //   style={{
            //     margin: 0,
            //   }}
            // >
            //   {record.description}
            // </p>
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
