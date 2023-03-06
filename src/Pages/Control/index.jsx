import axios from "axios";
import React, { useState } from "react";
import useGetData, {
  useDeleteData,
  usePostData,
  useUpdateData,
} from "../../Api/Queries";
import { Button, Form, Input, Modal } from "antd";
import cl from "./stayle.module.scss";

function ControlPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const InfoData = usePostData("/information");
  const { data } = useGetData(
    ["information"],
    "/information/4c5161df-130a-40cf-a044-0b83589740d9"
  );

  console.log(data);

  const OnSubmit = (e) => {
    const data = { ...e };
    InfoData.mutate(
      {
        phone: [data.phone1],
        ...data,
      },
      {
        onSuccess: (data) => console.log(data, "data"),
        onError: (eror) => console.log(eror, "errr"),
      }
    );

    console.log(data.email);
  };

  return (
    <>
      <div className="row">
        <h2>Information</h2>
        <Button onClick={showModal} type="primary">
          Update Info
        </Button>
      </div>
      <div>
        <br />
        <ul className="row">
          <div className={cl.wrapper}>
            <li className={cl.wrapper__li}> Email: {data?.email}</li>
            <li className={cl.wrapper__li}> Address: {data?.address}</li>
            <li className={cl.wrapper__li}> Instagram: {data?.instagram}</li>
            <li className={cl.wrapper__li}>Telegram: {data?.telegram}</li>
          </div>
          <iframe src={data?.addressMap} width={500} height={500} />
        </ul>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Form onFinish={(e) => OnSubmit(e)} className={cl.form}>
          <div>
            <Form.Item label="Tel" name="phone1">
              <Input placeholder="Tel raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email kirting"></Input>
            </Form.Item>
            <Form.Item label="Instagram" name="instagram">
              <Input placeholder="Instagram raqam kirting"></Input>
            </Form.Item>
            <Form.Item label="Telegram" name="telegram">
              <Input placeholder="Telegram raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="addressMap" name="addressMap">
              <Input placeholder="addressMap kirting"></Input>
            </Form.Item>
            <Form.Item label="address" name="address">
              <Input placeholder="address kirting"></Input>
            </Form.Item>
          </div>
          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      </Modal>
      <p>{data.createdAt}</p>
    </>
  );
}

export default ControlPage;
