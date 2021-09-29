import React, { useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

const ChatApp =()=> {


const [value,setValue] =useState("");
const [messageList,setMessageList] =useState([])
const {userName} =useSelector((state)=>({userName:state.auth.username}))
 
   const handleSubmit = (e)=>{
      e.preventDefault();
     if (value) {
       socket.emit('chat message', {name:userName,value});
      setValue("")
     }
   }

   socket.on('chat message', function(obj) {
      const newMessageList =[...messageList,`${obj.name}: ${obj.value}`]
      setMessageList(newMessageList);

 
    });
   return <div id="content-wrapper" style={{padding:"320px",border:"2px",borderColor:"black"}}> 
   <h1>Chat</h1> 
      <ul style={{listStyleType:"none"}} id="messages">
         {messageList.map((message,ind)=>
         <li key ={`mess${ind}`}>{message}</li>
         )}
      </ul>
    <form id ="form" style ={{background: "rgba(0, 0, 0, 0.15)",position:"fixed",padding: "0.25rem", bottom: "150px", left: "0", right: "0", display: "flex", height: "3rem" }}id="form" action="">
      <input id="input" autoComplete="off" value ={value} onChange={(e)=>{
         setValue(e.target.value)
      }} />
      <button onClick={handleSubmit}className="btn btn-outline-secondary ">Send</button>
    </form>
   </div>
}

export default ChatApp