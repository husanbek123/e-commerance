import React from "react";
import st from "./index.module.scss";
import useGetData from "../../Api/Queries";
import { Table, Progress, Space } from "antd";

function AllUsers() {
  let { data } = useGetData(["users"], "/user");

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "hash",
      dataIndex: "hash",
    },
  ];

  return (
    <div className={st.user}>
      <h1 className={st.user__heading}>All User</h1>
      <Space className={st.user__wrapper} wrap>
        <Progress type="circle" percent={data?.length} />
      </Space>
      <Table bordered columns={columns} dataSource={data}></Table>
    </div>
  );
}

export default AllUsers;
