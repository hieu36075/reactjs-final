import React, { useState } from 'react';
import ChatBox from './ChatBox';
import MessageInput from './MessageInput';
import Navbar from '../../layout/navbar/navbar';


export default function ChatForm(){
    const [lastMessages, setLastMessages] = useState({
        user1: 'Hello! How are you?',
        user2: 'Hi! I am good, thank you!',
      });
    return(
        <>
        <Navbar/>

        <div className="flex h-screen overflow-hidden">
        {/* Side Left */}
        <div className="w-1/4 bg-gray-200 p-4">
        <div className="text-xl font-bold mb-4">App Name</div>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search"
          className="border p-2 mb-4 w-full"
        />
        {/* List of users */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full mr-2"></div>
            <div className="flex-grow text-lg">
              User 1
              <span className="text-sm ml-2">{lastMessages.user1}</span>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full mr-2"></div>
            <div className="flex-grow text-lg font-bold">
              User 2
              <span className="text-sm ml-2">{lastMessages.user2}</span>
            </div>
          </div>
        </div>
      </div>
  
        {/* Chat Section */}
        <div className="w-3/4 p-4 flex flex-col">
          {/* Chat header */}
          <div className="text-xl font-bold mb-4">Chat with User</div>
  
          {/* Chat messages */}
          <div className="flex flex-col flex-grow overflow-y-auto mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
              <div className="bg-blue-500 text-white p-2 rounded-lg">User 1:</div>
              <div className="bg-gray-300 p-2 rounded-lg ml-2">Hello!</div>
            </div>
            <div className="flex items-center mb-2 justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                You:
              </div>
              <div className="bg-gray-300 p-2 rounded-lg ml-2">Hi there!</div>
              <div className="w-8 h-8 bg-blue-500 rounded-full ml-2"></div>
            </div>
          </div>
  
          {/* Message input and send button */}
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="border p-2 flex-grow"
            />
            <button className="bg-blue-500 text-white p-2 ml-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
      </>
    )
}