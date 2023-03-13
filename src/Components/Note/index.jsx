import { Dropdown, Space } from 'antd'
import React from 'react'
import useMyStore from '../../Context';
import styles from './index.module.scss'


function Note({title, text, BGcolor, id}) {

  let {Notes, setNotes} = useMyStore((state) => state)

  function DELETE() {
    setNotes(Notes.filter(item => item.id != id))
  }

  const items = [
    {
      label: <p onClick={DELETE}>Delete</p>,
      key: '0',
    },
  ];

  return (
    <div className={styles.note} style={{
        backgroundColor: BGcolor,
        color: BGcolor == "black" || BGcolor == "rgb(0, 0, 0)" ? 'white' : "black"
    }}>
      <div className={styles.header}>
          <h5>{title}</h5>
          
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </Space>
            </a>
          </Dropdown>
      </div>
      <br />
      <p>{text}</p>
    </div>
  )
}
export default Note