import React, { useState } from 'react'
import styles from "./index.module.scss"
import { Button, Modal } from 'antd';


function Warning({text, color, onOk, onCancel}) {
  const [modal1Open, setModal1Open] = useState(false);

  function Ok() {
    onOk()
    setModal1Open(false)
  }

  return (
    <>
      <Button 
        style={{
          backgroundColor: color,
          padding: "4px 12px 6px",
          
        }}
        type="primary" 
        onClick={() => setModal1Open(true)}>

        {text}
      </Button>
      <Modal
        title="Ishonchingiz komilmi?"
        centered
        open={modal1Open}
        style={{
          // transition: "all 1s"
        }}
        onOk={Ok}
        onCancel={onCancel  ? onCancel : () => setModal1Open(false)}
      >
      </Modal>
    </>
  );
};
export default Warning