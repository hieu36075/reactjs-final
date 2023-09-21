import React from 'react';

const MessageInput = () => {
  return (
    <div className="flex items-center justify-center"> {/* Thay đổi ở đây */}
      <input type="text" placeholder="Type a message" className="flex-1 rounded-full p-2" />
      <button className="ml-2 bg-blue-500 text-white rounded-full p-2">Send</button>
    </div>
  );
};

export default MessageInput;
