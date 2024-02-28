import React from 'react'
import {Header, SendChat, ShowChat} from "../index"
export default function Message({className}) {
  
  return (
    <div 
      className={`h-100 px-0 ${className}`}
      >
      <Header/>
      <ShowChat/>
      <SendChat/>
    </div>
  )
}
