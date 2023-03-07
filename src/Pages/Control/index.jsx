import React, { useState } from "react";
import useGetData, { useUpdateData } from "../../Api/Queries";
import { Button, Form, Input, Modal } from "antd";
import cl from "./stayle.module.scss";
import parse from "html-react-parser";

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

  const { data } = useGetData(["information"], "/information/");

  const id = data?.data[0]?.id;

  const Updata = useUpdateData(`/information/${id}`);

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
        {data?.data?.map((e) => (
          <ul key={e.id} className="row">
            <div className={cl.wrapper}>
              <li className={cl.wrapper__li}> Email:{e?.email}</li>
              <li className={cl.wrapper__li}> Address:{e?.address}</li>
              <li className={cl.wrapper__li}> Instagram:{e?.instagram}</li>
              <li className={cl.wrapper__li}>Telegram:{e?.telegram}</li>
              <li className={cl.wrapper__li}>Tel:{e?.phone}</li>
            </div>
            <div
              className={cl.wrapper__map}
              dangerouslySetInnerHTML={{ __html: data?.data[0]?.addressMap }}
            ></div>
          </ul>
        ))}
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
            <Form.Item
              initialValue={data?.data[0]?.phone}
              label="Tel"
              name="phone1"
            >
              <Input placeholder="Tel raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              initialValue={data?.data[0]?.email}
              label="Email"
              name="email"
            >
              <Input placeholder="Email kirting"></Input>
            </Form.Item>

            <Form.Item
              initialValue={data?.data[0]?.instagram}
              label="Instagram"
              name="instagram"
            >
              <Input placeholder="Instagram raqam kirting"></Input>
            </Form.Item>

            <Form.Item
              initialValue={data?.data[0]?.telegram}
              label="Telegram"
              name="telegram"
            >
              <Input placeholder="Telegram raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              initialValue={data?.data[0]?.addressMap}
              label="addressMap"
              name="addressMap"
            >
              <Input placeholder="addressMap kirting"></Input>
            </Form.Item>

            <Form.Item
              initialValue={data?.data[0]?.address}
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
