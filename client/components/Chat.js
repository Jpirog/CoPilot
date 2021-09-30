import React, { useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

const ChatApp =()=> {


const [value,setValue] =useState("");
const [messageList,setMessageList] =useState([])
const {userName} =useSelector((state)=>({userName:state.auth.username}))
const [senderName,setSenderName] =useState("")
 
   const handleSubmit = (e)=>{
      e.preventDefault();
     if (value) {
       socket.emit('chat message', {name:userName,value});
      setValue("")
     }
   }

   socket.on('chat message', function(obj) {
      const newMessageList =[...messageList,obj]
      setMessageList(newMessageList);
      setSenderName(obj.name)

 
    });
   return <div style={{paddingTop:"100px"}}> 
   
   <h1>Chat</h1>
      <ul style={{listStyleType:"none",border:"2px solid black",height:"55vh"}} id="messages">
         {messageList.map((message,ind)=>
         <li className ={message.name===userName?"text-end":"text-start"} key ={`mess${ind}`}>{`${message.name}: ${message.value}`}</li>
         )}
      </ul>
    <form id ="form" style ={{background: "rgba(0, 0, 0, 0.15)",position:"fixed",padding: "0.25rem", bottom: "150px", left: "0", right: "0", display: "flex", height: "3rem" }}id="form" action="">
      <input autoFocus={true} id="input" autoComplete="off" value ={value} onChange={(e)=>{
         setValue(e.target.value)
      }} />
      <button onClick={handleSubmit}className="btn btn-outline-secondary ">Send</button>
    </form>

   </div>
}

export default ChatApp