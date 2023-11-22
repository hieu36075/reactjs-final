import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/navbar/Navbar';
import "./ChatForm.css"
import socket from "../../services/socket";
import { useDispatch, useSelector } from 'react-redux';
import ListUserChat from './ListUserChat';
import jwtDecode from 'jwt-decode';
import { getMyMessage } from '../../redux/roomMessage/roomMessageThunk';
import Message from './Message';
import { useLocation } from 'react-router-dom';
import { updateListUser, updateNewRoom } from '../../redux/roomMessage/roomMessageSlice';
export default function ChatForm() {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState('')
  const location = useLocation();
  const {data} = useSelector((state) => state.roomMessage)
  const token = jwtDecode(localStorage.getItem('token'))
  useEffect(()=>{
    dispatch(getMyMessage()).unwrap()
    .then((res)=>{
      if(res.length > 0){
        // setRoomId(res[0].id)
        res.forEach(element => {
          socket.emit('joinRoom', element.id)
        });
      }
    })
    return()=>{
      
    }
  },[dispatch])

  useEffect(()=>{
    if(location?.state?.userId){
      dispatch(updateListUser())
    }
  },[location?.state?.userId])

  const chooseRoom=(id)=>{
    setRoomId(id)
  }

  useEffect(()=>{
    socket.on('newRoom-received',(data)=>{
      dispatch(updateNewRoom(data.newRoom))
      if(!roomId){
        setRoomId(data?.newRoom?.id)
        socket.emit('joinRoom', data?.newRoom?.id)
      }
    })
    return () => {
      socket.off('newRoom-received');
    };
  },[])
  return (
    <>
        <Navbar />
        <div className="flex h-screen overflow-hidden chat-content ">
          <div className="w-1/4 bg-gray-200 p-4 overflow-y chat-left overflow-y-auto">
            <div className="text-xl font-bold mb-4 text-center">App Name</div>
            <input
              type="text"
              placeholder="Search"
              className="border p-2 mb-4 w-full"
            />
            {data?.map(room =>(
              
              <ListUserChat 
              key={room?.id} 
              id={room?.id} 
              userId={room?.userRoomMessage?.[0]?.userId} 
              onPress={chooseRoom}
              message={room?.message}


              />
            ))}
          </div>
          <div className="w-3/4 p-4 flex flex-col chat-right overflow-y-auto">
              <Message id={roomId} userId={token.id}/>
          </div>
        </div>

    </>
  )
}