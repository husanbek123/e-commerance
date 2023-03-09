import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetData, {
  useDeleteData,
  usePostData,
  useUpdateData,
} from "../../Api/Queries";

import { Button, Form, Input, Modal, Space } from "antd";
import cl from "./stayle.module.scss";
import parse from 'html-react-parser'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";



function ControlPage() {

  let {t} = useTranslation()

  let queryClient = useQueryClient()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phones, setPhones] = useState([{
    placeholder: "phone 1",
    value: null,
    label: "Phone 1" ,
    name: "phone_1"
  }]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading } = useGetData(
    ["information"],
    "/information/"
  );
  const InfoData = usePostData("/information/");
  const UpdateData = useUpdateData("/information/" + data?.data[0]?.id);

  useEffect(() => {
    setPhones(data?.phone?.map(item => ({
      value: item,
    })))
  }, [data])
  
  const OnSubmit = (e) => {
    console.log(e);
   
    UpdateData.mutate(
      e,
      {
        onSuccess: () => queryClient.invalidateQueries("information"),
        onError: (eror) => console.log(eror, "errr"),
      }
    );
  };

  function Remove(name) {
    console.log(name);
    let newPhones = phones.filter(i => i.value != name)
    setPhones(newPhones)
  }

  return (
    <>
      <div className="row">
        <h2>{t("Titles.Information")}</h2>
        <Button onClick={showModal} type="primary">
          {t("Button.Update Info")}
        </Button>
      </div>
      <div>
        <br />
        <ul className="column">
          <div className={cl.wrapper}>
            <li className={cl.wrapper__li}> Email: {data?.data[0]?.email}</li>
            <li className={cl.wrapper__li}> Address: {data?.data[0]?.address}</li>
            <li className={cl.wrapper__li}> Instagram: {data?.data[0]?.instagram}</li>
            <li className={cl.wrapper__li}>Telegram: {data?.data[0]?.telegram}</li>
            <p>{data?.data[0]?.createdAt}</p>
            {
              data?.data[0]?.phone?.map((i, index) => (
                <li className={cl.wrapper__li}>Phone: {++index}: {i}</li>
              ))
            }
          </div>
          {
            isLoading != true && parse(
              data?.data[0]?.addressMap
            )
          }
        </ul>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer={false}
      >
        <Form onFinish={(e) => OnSubmit(e)} className={cl.form}>
          <div>
            <Button onClick={() => setPhones([...phones, {
              value: null
            }])}>Add phone</Button>
            <br />
            <br />
            {
              phones?.map((item, index) => (
                <div className="input">
                  <Form.Item label={"Phone" + (index + 1)} initialValue={item.value} name={["phone", index]}>
                    <Input type="tel" required placeholder={"phone " + index}></Input>
                  </Form.Item>
                  <button type="button" onClick={() => Remove(item.value)}>Delete</button>
                </div>
              ))
            }
          </div>
          <div>
            <Form.Item label="Email" name="email">
              <Input type="email" required placeholder="Email kirting"></Input>
            </Form.Item>
            <Form.Item label="Instagram" name="instagram">
              <Input required placeholder="Instagram raqam kirting"></Input>
            </Form.Item>
            <Form.Item label="Telegram" name="telegram">
              <Input required placeholder="Telegram raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="addressMap" name="addressMap">
              <Input required placeholder="addressMap kirting"></Input>
            </Form.Item>
            <Form.Item label="address" name="address">
              <Input required placeholder="address kirting"></Input>
            </Form.Item>
            
          </div>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
}
export default ControlPage;
