import React, { useEffect, useState, useRef } from 'react';
import '../index.css';
import { LuSendHorizontal } from 'react-icons/lu';
import { MdOutlineAttachment } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { baseurL } from '../config/Axioshelper';
import { Client } from '@stomp/stompjs';  // Correct import for Stomp Client in v7.x.x
import SockJS from 'sockjs-client';

function ChatPage() {
  const baseurl = baseurL;
  const [messages, setMessages] = useState([
    {
      content: 'hello',
      sender: 'Nikita',
    },
    {
      content: 'hi, how are you',
      sender: 'Sunny',
    },
    {
      content: 'I am fine',
      sender: 'Nikita',
    },
  ]);
  const { username } = useParams();
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState(username); // Set roomId from username
  const [user, setUser] = useState('Sunny');

  // Establish WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${baseurl}/chat`);  // Create SockJS connection

      const client = new Client({
        brokerURL: `${baseurl}/chat`,  // Adjust the WebSocket endpoint if necessary
        connectHeaders: {},  // Optional headers if needed
        debug: (str) => console.log(str),  // Debugging log
        reconnectDelay: 5000,  // Automatically reconnect after 5 seconds
        onConnect: () => {
          console.log('Connected to WebSocket');
          setStompClient(client);

          // Subscribe to the chat room topic
          client.subscribe(`/topic/room/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
        },
      });

      client.activate();  // Activate the connection
    };

    connectWebSocket();

    // Cleanup function
    return () => {
      if (stompClient) {
        stompClient.deactivate();  // Deactivate WebSocket connection on cleanup
      }
    };
  }, [baseurl, roomId, stompClient]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() !== '' && stompClient) {
      const newMessage = {
        content: input,
        sender: user,
      };

      // Send the message to the WebSocket server
      stompClient.send(`/app/room/${roomId}`, {}, JSON.stringify(newMessage));

      // Add the message to local state for instant update
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInput(''); // Clear the input field
      inputRef.current.focus(); // Focus back on the input field
    }
  };

  return (
    <>
      <div>
        {/* part1 */}
        <div id="chatpagepart1">
          <div>
            <h3>
              Room id: <span>{username}</span>
            </h3>
          </div>
          <div>
            <h3>
              User: <span>{user}</span>
            </h3>
          </div>
          <div>
            <button className="btn btn-danger">Leave Room</button>
          </div>
        </div>

        <div className="centerchatpart">
          {messages.map((message, index) => (
            <div
              key={index}
              className="messagecontainer"
              style={{
                justifyContent: message.sender === user ? 'flex-end' : 'flex-start',
              }}
            >
              <div id="single-message">
                <img
                  src="https://avatar.iran.liara.run/public"
                  id="avatar"
                  alt="avatar"
                />
                <div>
                  <p className="sender">{message.sender}</p>
                  <p className="content">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          id="chatpagepart1"
          className="lastbox"
          style={{
            marginTop: '10vh',
          }}
        >
          <div style={{ flexBasis: '90%', textAlign: 'center' }}>
            <input
              ref={inputRef}
              type="text"
              className="form-control lastinput"
              placeholder="Type Your Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <h3 id="attach">
              <MdOutlineAttachment />
            </h3>
          </div>
          <div>
            <button className="btn btn-warning" onClick={handleSendMessage}>
              <LuSendHorizontal />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
