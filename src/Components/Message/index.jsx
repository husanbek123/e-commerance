import React from 'react'

function Message({title, text, time}) {
  return (
    <div className='message'>
        <h5>{title}</h5>
        <p>{text}</p>
        <h6>{time}</h6>
    </div>
  )
}

export default Message