import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfileById } from "../../redux/profile/profileThunk";
import socket from "../../services/socket";
const ListUserChat=({id, userId, onPress , message})=>{

    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const [newMessage, setNewMessage] = useState(message?.[0]?.content || '')
    const [isRead, setIsRead] = useState(false)
    useEffect(()=>{
        if(userId){
          dispatch(getProfileById(userId)).unwrap()
          .then((res)=>{
              setUser(res)
          })
        }
    },[userId])
    useEffect(()=>{
      socket.on('message-received',(data)=>{
        if(id === data.roomId){
          setNewMessage(data.newMessage.content)
          setIsRead(true)
        }
      })
    },[])

    if(!user){
      return(
        <h1>wait..</h1>
      )
    }
    return(
        <div className="flex flex-col mb-4 " key={id}>
        <div className="flex items-center my-2 px-5 chat-item" onClick={()=>onPress(id)}>
          <div className="w-10 h-10 bg-blue-500 rounded-full mr-5"></div>
          <div className="flex-grow text-lg">
            <h2>{user.fullName}</h2>
            <p className=''>{newMessage}</p>
          </div>
        </div>

      </div>
    )
}

export default ListUserChat;