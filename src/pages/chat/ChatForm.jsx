import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/navbar/navbar';
import "./ChatForm.css"
import socket from "../../services/socket";
import { useDispatch, useSelector } from 'react-redux';
import ListUserChat from './ListUserChat';
import jwtDecode from 'jwt-decode';
import { getMyMessage } from '../../redux/roomMessage/roomMessageThunk';
import Message from './Message';
export default function ChatForm() {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState('')

  const {data} = useSelector((state) => state.roomMessage)
  const token = jwtDecode(localStorage.getItem('token'))
  useEffect(()=>{
    dispatch(getMyMessage()).unwrap()
    .then((res)=>{
      setRoomId(res[0].id)
      res.forEach(element => {
        socket.emit('joinRoom', element.id)
      });
    })
    // dispatch(getProfileById())
    
  },[dispatch])



  // const sendMessage=()=>{
  //   socket.emit('Message', {
  //     content: 'avc',
  //     userId: 'cln0eljqj0001c3q8k2fa4ixc'
  //   });
  // }

  const chooseRoom=(id)=>{
    console.log('chooseRoom called with ID:', id);
    // socket.emit('joinRoom', id) 
    setRoomId(id)
  }
  return (
    <>
        <Navbar />

        <div className="flex h-screen overflow-hidden chat-content ">
          {/* Side Left */}
          <div className="w-1/4 bg-gray-200 p-4 overflow-y chat-left overflow-y-auto">
            <div className="text-xl font-bold mb-4 text-center">App Name</div>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search"
              className="border p-2 mb-4 w-full"
            />
            {/* List of users */}
            {data?.map(room =>(
              <ListUserChat 
              key={room.id} 
              id={room?.id} 
              userId={room?.userRoomMessage[0].userId} 
              onPress={chooseRoom}
              message={room.message}


              />
            ))}
          </div>

          {/* Chat Section */}
          <div className="w-3/4 p-4 flex flex-col chat-right">
            {/* Chat header */} 
              <Message id={roomId} userId={token.id}/>
            {/* Message input and send button */}
            {/* <div className="flex message-input">
              <input
                type="text"
                placeholder="Type a message..."
                className="border p-2 flex-grow"
              />
              <button className="bg-blue-500 text-white p-2 ml-2 rounded-lg" onClick={()=>{sendMessage()}}>
                Send 
              </button>
            </div> */}
          </div>
        </div>

    </>
  )
}