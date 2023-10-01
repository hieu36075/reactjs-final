import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageByRoomId } from "../../redux/roomMessage/roomMessageThunk";
import socket from "../../services/socket";
import { addMessage } from "../../redux/roomMessage/roomMessageSlice";
const Message = ({ id, userId }) => {
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.roomMessage);
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    dispatch(getMessageByRoomId(id));
  }, [id]);

  const sendMessage=()=>{
    socket.emit('sendMessage', {
      content: message,
      roomId: details.id
    });
  }

  useEffect(()=>{
    socket.on('message-received',(data)=>{
      console.log('message:', data)
      dispatch(addMessage(data))
    })
  },[])

  if(loading){
    return(
        <h1> loading</h1>
    )
  }
  return (
    <>
      <div className="text-xl font-bold mb-4 text-center">Chat with User</div>
      {/* Chat messages */}
      {details.message &&
        details.message.map((item) => {
          return (
            <div className="flex flex-col overflow-y-auto mb-4" key={item.id}>
              <div className={`flex items-center mb-2 ${item.sederId === userId ? 'justify-end' : ''}` }  >
                <div className={item.sederId === userId ?  "bg-blue-500 p-2 rounded-lg ml-2 font-bold" : "bg-gray-300 p-2 rounded-lg ml-2 font-bold"} >
                  {item.content}
                </div>
              </div>
              {/* <div className="flex items-center mb-2 justify-end">
                <div className="bg-blue-500 p-2 rounded-lg ml-2 font-bold">
                  Hi there!
                </div>
              </div> */}
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
      {/* <div key={item.id} className="flex items-center mb-2">
              <div className="bg-gray-300 p-2 rounded-lg ml-2 font-bold">
                {item.content}
              </div>
            </div> */}
    </>
  );
};
export default Message;
