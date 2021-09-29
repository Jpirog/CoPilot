import React, { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

const ChatApp =()=> {


const [value,setValue] =useState("");
const [messageList,setMessageList] =useState([])
 
   const handleSubmit = (e)=>{
      e.preventDefault();
     if (value) {
       socket.emit('chat message', value);
      setValue("")
     }
   }

   socket.on('chat message', function(msg) {
      const newMessageList =[...messageList,msg]
      setMessageList(newMessageList);
      // var item = document.createElement('li');
      // item.textContent = msg;
      // messages.appendChild(item);
      // window.scrollTo(0, document.body.scrollHeight);
    });
   return <div id="content-wrapper" style={{padding:"120px",border:"2px",borderColor:"black"}}> 
   <h1>Chat</h1> 
      <ul style={{listStyleType:"none",width:"80px",height:"500px",borderColor:"black"}} id="messages">
         {messageList.map((message,ind)=><li key ={`mess${ind}`}>{message}</li>)}
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