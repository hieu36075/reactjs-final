import React from "react";
import MessageInput from "./MessageInput";

const ChatBox = () => {
  return (
    <div className="flex flex-row h-screen overflow-y-auto">
      {/* Left sidebar (user list and search) */}
      <div className="w-1/4 p-4 border-r border-gray-300 flex-shrink-0">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <div className="flex items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-bold">User 1</span>
          </div>
          <div className="flex items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-bold">User 2</span>
          </div>
          {/* Add more users here */}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-bold">User Name</span>
          </div>
          <p className="bg-gray-200 rounded-lg p-2 max-w-md">
            Hello! How are you?
          </p>
        </div>
      </div>
        <MessageInput/>

    </div>
  );
};

export default ChatBox;
