import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css';
import SendIcon from '@mui/icons-material/Send';
import chat from './img/chat.jpg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ChatIcon from '@mui/icons-material/Chat'; 
import { FaWhatsapp } from 'react-icons/fa'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns';



function ChatPage() {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const mobileNo = Cookies.get('mobileNo');
  const empid = Cookies.get('empid'); // Retrieve empid from cookies

  


  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        // Include empid as a query parameter when fetching chat messages
        const response = await axios.get("https://attendance-backend-five.vercel.app/chats/adminchat", {
          params: { empid }
        });

        const data = response.data;
        setChatMessages(data.chatMessages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();
  }, [empid]); 
  
  const handleInputChange = (e) => {
    setNewMessage(e.target.value); // Update the 'newMessage' state with the input field value
  };
  
  const handleSendClick = async () => {
    try {
      const trimmedMessage = newMessage.trim();
  
      if (trimmedMessage !== '' && empid) {
        const currentTime = new Date(); // Get the current time
        const timestamp = currentTime.toISOString(); // Format it as an ISO string
        console.log('Sending Data:', {
          addchat: trimmedMessage,
          mobileNo,
          empid,
          timestamp,
        });
  
        await axios.post("https://attendance-backend-five.vercel.app/chats/adminchat", {
          addchat: trimmedMessage,
          mobileNo,
          empid,
          timestamp,
        });
  
        setNewMessage('');
        alert('Data is sent');
      } else {
        alert('Please enter a message and make sure you are logged in.');
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      alert('Error sending message: ' + error.message);
    }
  };
  

  const iconStyle = {
    fontSize: '36px',
  };

  return (
    <div>
      <div className={`chat-container ${chatMessages.length === 0 ? 'chat-not-started' : ''}`}>
        {chatMessages.length === 0 ? (
          <div className="initial-content">
            <img src={chat} alt="Background" style={{ height: '180px', marginLeft: '80px', marginTop: '126px' }} />
            <p style={{ color: 'black', paddingLeft: '120px' }}>Say Hello!</p>
            <p style={{ color: '#bdbdbd', fontSize: '17px', marginLeft: '60px' }}>To start chatting with our team</p>
          </div>
        ) : (
          <div className="chat-box">
          {chatMessages.map((message) => (
            <div key={message._id} className={`message ${message.type}`}>
              <div className="message-details">
                <span className="small text-gray-500" style={{ fontSize: '12px', color: 'gray' }}>{message.empid} -</span>
                <span className="small text-gray-500" style={{ fontSize: '12px', color: 'gray' }}>
                  {message.timestamp ? format(parseISO(message.timestamp), 'yyyy-MM-dd HH:mm:ss') : 'not'}
                </span>
              </div>
              <span style={{ fontSize: '18px', color: 'black' }}>{message.addchat}</span>
            </div>
          ))}
        </div>
        
        
        
        )}
        <div className="chat-footer">
          <div className="input-container">
            <div className="input-with-icon">
              <input
                type="text"
                id="message-input"
                placeholder="   Type your message..."
                value={newMessage}
                onChange={handleInputChange}
                style={{ marginTop: '62px', marginLeft: '10px', width: '270px', borderRadius: '40px', height: '35px' }}
              />
            </div>
            <button
              style={{ backgroundColor: "#4f5cd7", border: '0px', borderRadius: '90px', height: '40px', width: '40px', marginTop: '65px' }}
              onClick={handleSendClick}
            >
              <SendIcon style={{ color: 'white' }} />
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px', marginLeft: '0px' }}>
          <Card sx={{ height: "120px", boxShadow: 'none', marginLeft: "10px", marginRight: "10px", width: '100px' }} className="card">
            <a href='punchin' style={{ color: 'black', textDecoration: 'none' }}>
              <CardActionArea>
                <CardContent>
                  <div>
                    <FingerprintIcon style={iconStyle} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'black' }}>
                      Mark Attendance
                    </p>
                  </div>
                </CardContent>
              </CardActionArea>
            </a>
          </Card>
          <Card sx={{ height: "120px", boxShadow: 'none', marginLeft: "10px", marginRight: "10px", width: '100px' }} className="card">
            <a href='chat' style={{ textDecoration: 'none', color: 'black' }}>
              <CardActionArea>
                <CardContent>
                  <div>
                    <ChatIcon style={iconStyle} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'black' }}>
                      Chat
                    </p>
                  </div>
                </CardContent>
              </CardActionArea>
            </a>
          </Card>
          <Card sx={{ height: "120px", boxShadow: 'none', marginLeft: "10px", marginRight: "10px", width: '100px' }} className="card">
            <CardActionArea>
              <CardContent>
                <div>
                  <FaWhatsapp style={iconStyle} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'black' }}>
                    Posters
                  </p>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
          <a href='userdash' style={{ textDecoration: 'none' }}>
            <Card sx={{ height: "120px", boxShadow: 'none', marginLeft: "10px", marginRight: "10px", width: '100px' }} className="card">
              <CardActionArea>
                <CardContent>
                  <div>
                    <PersonIcon style={iconStyle} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'black' }}>
                      Profile
                    </p>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
