import React from 'react'
import { Table } from 'antd'
import useGetData, { useDeleteData, useUpdateData } from '../../Api/Queries';

function MyTable({data , type}) {

    let Del = useDeleteData("/products")
    let Up = useUpdateData("/products")

    function Delete(id) {
        console.log(id);
        Del.mutate(`/${id}`)
    }

    function Update(id) {
        console.log(id);
        Up.mutate(`/${id}`, {
            active: false
        })
    }

    let columns = []

    let myData = []
    if(type == "products") {
        columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                // render: () => <div>
                //     <button>Edit</button>
                //     <a> </a>
                //     <button onClick={() => Delete()}>Delete</button>
                // </div>,
            },
        ];
        data?.map((item, index) => {
            console.log(item);
            myData.push({
                ...item, 
                name: item?.name_Uz,
                key: index + 1,
                description: <h5>
                    {item?.description_Uz} 
                    <br /> 
                    <p>Product-id: {item?.id}</p>
                    <p>Category-id: {item?.Category?.id}</p>
                </h5>,
                category: item?.Category?.name_Uz,
                action: <div>
                    <button onClick={() => Delete(item?.id)}>Delete</button>
                    <a> </a>
                    <button onClick={() => Update(item?.id)}>Update</button>
                </div>
            })
        })
    }
    else {
        columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Number of products',
                dataIndex: 'number',
                key: 'number',
            },
            // {
            //     title: 'Size',
            //     dataIndex: 'size',
            //     key: 'size',
            // },
            // {
            //     title: 'Category',
            //     dataIndex: 'category',
            //     key: 'category',
            // },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                // render: () => <div>
                //     <button>Edit</button>
                //     <a> </a>
                //     <button onClick={() => Delete()}>Delete</button>
                // </div>,
            },
        ];
        data?.map((item, index) => {
            console.log(item);
            myData.push({
                ...item, 
                name: item?.name_Uz,
                key: index + 1,
                description: <h5>
                    {item?.description_Uz} 
                    <br /> 
                    <p>Category-id: {item?.id}</p>
                </h5>,
                category: item?.Category?.name_Uz,
                action: <div>
                    <button onClick={() => Delete(item?.id)}>Delete</button>
                    <a> </a>
                    <button onClick={() => Update(item?.id)}>Update</button>
                </div>
            })
        })
    }
    
  return (
    <div>
        <Table
            bordered
            columns={columns}
            expandable={{
            expandedRowRender: (record) => (
                <p
                style={{
                    margin: 0,
                }}
                >
                {record.description}
                </p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={myData}
        />
    </div>
  )
}

export default MyTable