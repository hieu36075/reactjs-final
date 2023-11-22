import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageByRoomId } from "../../redux/roomMessage/roomMessageThunk";
import socket from "../../services/socket";
import { addMessage } from "../../redux/roomMessage/roomMessageSlice";
import { useLocation } from "react-router-dom";
const Message = ({ id, userId }) => {
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.roomMessage);
  const [message, setMessage] = useState('')
  const location = useLocation();
  const endOfMessagesRef = useRef(null);
  useEffect(() => {
    if(id){
      dispatch(getMessageByRoomId(id));
    }
  }, [id]);

  const sendMessage=()=>{
    if(!id){
      socket.emit('Message', {
        content: message,
        userId: location?.state?.userId
      });
    }else{
      socket.emit('sendMessage', {
        content: message,
        roomId: details.id
      });
    }
  }

  useEffect(()=>{
    socket.on('message-received',(data)=>{
      dispatch(addMessage(data))
    })
    return () => {
      socket.off('message-received');
    };
  },[])

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [details.message]); 

  
  if(loading){
    return(
        <h1> loading</h1>
    )
  }
  return (
    <>
      {/* Chat messages */}
      <div className="text-xl font-bold mb-4 text-center">Chat with User</div>
      {details.message &&
        details.message.map((item, index) => {
          return (
            <div className="flex flex-col mb-4"
             key={item.id}
              ref={index === details.message.length - 1 ? endOfMessagesRef : null}
             >
              <div className={`flex items-center mb-2 ${item.sederId === userId ? 'justify-end' : ''}` }  >
                <div className={item.sederId === userId ?  "bg-blue-500 p-2 rounded-lg ml-2 font-bold" : "bg-gray-300 p-2 rounded-lg ml-2 font-bold"} >
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex message-input">
              <input
                type="text"
                placeholder="Type a message..."
                className="border p-2 flex-grow"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button className="bg-blue-500 text-white p-2 ml-2 rounded-lg" onClick={()=>{sendMessage()}}>
                Send 
              </button>
            </div>
    </>
  );
};
export default Message;
