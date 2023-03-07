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

  // const InfoData = usePostData("/information");
  const { data } = useGetData(
    ["information"],
    "/information/4c5161df-130a-40cf-a044-0b83589740d9"
  );

  const Updata = useUpdateData(
    "/information/4c5161df-130a-40cf-a044-0b83589740d9"
  );

  const OnUpdate = (datavalues) => {
    let data = {
      ...datavalues,
      phone: [datavalues.phone1],
    };

    delete data.phone1;

    Updata.mutate(
      {
        ...data,
      },
      {
        onSuccess: (data) => console.log(data, "data"),
        onError: (eror) => console.log(eror, "errr"),
      }
    );
  };

  const date = new Date().toDateString(data?.createdAt);

  console.log(date);

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
            <li className={cl.wrapper__li}>Tel: {data?.phone}</li>
          </div>
          <iframe
            src={data?.addressMap}
            className={cl.wrapper__box}
            width={500}
            height={500}
          />
        </ul>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <Form onFinish={(e) => OnUpdate(e)} className={cl.form}>
          <div>
            <Form.Item initialValue={data?.phone} label="Tel" name="phone1">
              <Input placeholder="Tel raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item initialValue={data?.email} label="Email" name="email">
              <Input placeholder="Email kirting"></Input>
            </Form.Item>

            <Form.Item
              initialValue={data?.instagram}
              label="Instagram"
              name="instagram"
            >
              <Input placeholder="Instagram raqam kirting"></Input>
            </Form.Item>

            <Form.Item
              initialValue={data?.telegram}
              label="Telegram"
              name="telegram"
            >
              <Input placeholder="Telegram raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              initialValue={data?.addressMap}
              label="addressMap"
              name="addressMap"
            >
              <Input placeholder="addressMap kirting"></Input>
            </Form.Item>

            <Form.Item
              initialValue={data?.email}
              label="address"
              name="address"
            >
              <Input placeholder="address kirting"></Input>
            </Form.Item>
          </div>
          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      </Modal>
      <p className={cl.data}>{date}</p>
    </>
  );
}

export default ControlPage;
