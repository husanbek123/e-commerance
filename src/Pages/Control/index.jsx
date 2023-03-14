
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
  const [phones, setPhones] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let { data, isLoading } = useGetData(
    ["information"],
    "/information/"
  );
  const InfoData = usePostData("/information/");
  const UpdateData = useUpdateData("/information/" + data?.data[0]?.id);
  let DeleteData = useDeleteData()
  let Post = usePostData("/information")

  let CurrentPhones = data?.data[0]?.phone?.map((item, index) => ({
    value: item,
    id: index + 1
  }))
  useEffect(() => {
    if(data?.data?.length != 0 && data?.data[0]?.phone?.length != 0) {
      setPhones(CurrentPhones)
    }
  }, [data])


  const OnSubmit = (e) => {
    console.log(e, "111111111111111111111");
    setPhones([])
    handleCancel()
    console.log(data);

    if(data?.data.length == 0) {
      console.log("@@@@@@@@@@@@@@");
      Post.mutate({
        ...e,
      },{
        onSuccess: () => queryClient.invalidateQueries(["information"]),
      })
    }
    else {
      UpdateData.mutate(
        {
          ...e,
          phone: e.phone != undefined ? e.phone : []
        },
        {
          onSuccess: () => queryClient.invalidateQueries(["information"]),
          onError: (eror) => console.log(eror, "errr"),
        }
      );
    }
  };


  function Remove(id) {
    let Arr = [...phones]
    let Slice = Arr.splice(id, 1)
    setPhones(Arr)
  }

  function Delete(id) {
    DeleteData.mutate(`/information/${id}`, {
      onSuccess: () => queryClient.invalidateQueries(["information"])
    })
  }
  let Newdata = {
    ...data?.data[0],
    null: "???"
  }


  return (
    <>
      <div className="row">
        <h2>{t("Titles.Information")}</h2>
        <div className="just_row">
          {
            data?.data.length != 0 ?
            <>
              <Button 
                style={{backgroundColor: "red"}} 
                onClick={() => Delete(data?.data[0]?.id)}
                type="primary"
              >
                {t("Button.Delete")}
              </Button>
              <div className="gap"></div>
              <Button onClick={showModal} type="primary">
                {t("Button.Update Info")}
              </Button> 
            </>
            :
            <Button 
              onClick={() => showModal()}
              type="primary"
            >
              {t("Button.Add")}
            </Button>
          }
        </div>
      </div>
      <div>
        <br />

        <ul className="column">
          <div className={cl.wrapper}>
            <li className={cl.wrapper__li}> Email: {Newdata?.email ? Newdata.email : Newdata.null}</li>
            <li className={cl.wrapper__li}> Address: {Newdata?.address ? Newdata.address : Newdata.null}</li>
            <li className={cl.wrapper__li}> Instagram: {Newdata?.instagram ? Newdata.instagram : Newdata.null}</li>
            <li className={cl.wrapper__li}>Telegram: {Newdata?.telegram ? Newdata.telegram : Newdata.null}</li>
            <p>{Newdata?.createdAt}</p>
            {
              data?.data[0]?.phone?.map((i, index) => (
                <li className={cl.wrapper__li}>Phone {++index}: {i}</li>
              ))
            }
          </div>
          {
            data?.data.length != 0 && parse(
              toString(data?.data[0]?.addressMap)
            )
          }
        </ul>

      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer={false}
        className="modal"
      >
        <Form onFinish={(e) => OnSubmit(e)} className={cl.form}>
          <div>
            <Button onClick={() => {
              console.log(phones, "33333333333333333");
              phones?.length > 0 ? setPhones([...phones, {
                value: null,
                id: Math.round(Math.random() * 1000)
              }])
              : 
              setPhones([{
                value: null,
                id: Math.round(Math.random() * 1000)
              }])
            }}>Add phone</Button>
            <br />
            <br />
            {
              phones?.map((item, index) => (
                <div className="input">
                  <Form.Item label={"Phone " + (index + 1)} name={["phone", index]} initialValue={item.value}>
                    <Input type="tel" required placeholder={item.value} ></Input>
                  </Form.Item>
                  <Button 
                    type="primary" 
                    onClick={() => Remove(index)}
                    style={{backgroundColor: "red"}}
                  >{t("Button.Delete")}</Button>
                </div>
              ))
            }
          </div>
          <div>
            <Form.Item label="Email" initialValue={data?.data[0]?.email} name="email">
              <Input type="email"  required placeholder="Email kirting"></Input>
            </Form.Item>
            <Form.Item label="Instagram" name="instagram" initialValue={data?.data[0]?.instagram}>
              <Input required placeholder="Instagram raqam kirting"></Input>
            </Form.Item>
            <Form.Item label="Telegram" name="telegram" initialValue={data?.data[0]?.telegram}>
              <Input required placeholder="Telegram raqam kirting"></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="addressMap" name="addressMap" initialValue={data?.data[0]?.addressMap}>
              <Input required placeholder="addressMap kirting"></Input>
            </Form.Item>
            <Form.Item label="address" name="address" initialValue={data?.data[0]?.address}>
              <Input required placeholder="address kirting"></Input>

            </Form.Item>
            
          </div>
          {
            data?.data.length == 0 ? <Button htmlType="submit" type="primary">{t("Button.Add")}</Button> : <Button htmlType="submit" type="primary">
            {t("Button.Update")}
          </Button>
          }
        </Form>
      </Modal>
    </>
  );
}
export default ControlPage;
