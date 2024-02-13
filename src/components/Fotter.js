import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ChatIcon from '@mui/icons-material/Chat';
import { FaWhatsapp } from 'react-icons/fa';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import Cookies from 'js-cookie';

const iconStyle = {
  color: 'black',
};

function Punchin() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInDate, setPunchInDate] = useState('');
  const [punchInTime, setPunchInTime] = useState('');

 
  useEffect(() => {
    // Move the retrieval of mobileNo to here so that it's retrieved once on component mount
    const mobileNo = Cookies.get('mobileNo');
    console.log('Mobile number retrieved from cookie:', mobileNo);
  }, []);


  const handleClick = async () => {
    try {
      const now = new Date();
      const formattedDateTime = moment(now).format('YYYY-MM-DD HH:mm:ss'); // Format the date and time using moment.js
      const formattedDate = moment(now).format('YYYY-MM-DD'); // Extract the date
      const formattedTime = moment(now).format('HH:mm:ss'); // Extract the time

      console.log('Date:', formattedDate);
      console.log('Time:', formattedTime);

      const mobileNo = Cookies.get('mobileNo');
      const status = isPunchedIn ? 'Punch Out' : 'Punch In';

      // Make a POST request to your server to store the date and time
      const response = await fetch('https://attendance-backend-five.vercel.app/punching/attandance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendandanceDate: formattedDate, attendandanceTime: formattedTime, mobileNo, status }),
      });

      if (response.ok) {
        setPunchInDate(formattedDate);
        setPunchInTime(formattedTime);
        alert(`Today's status: ${status}`);
      } else {
        console.error('Failed to store date and time');
      }

      setIsPunchedIn((prevState) => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  const boxStyle = {
    backgroundColor: 'black',
    width: '328px',
    marginTop: '110%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#ef5350',
    width: '320px',
    height: '50px',
    color: 'white',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const iconStyle = {
    fontSize: '36px',
  };

  return (
    <div style={{ marginTop:'600px'}}>
      
     
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', marginLeft: '0px' }}>
        <Card sx={{ height: '120px', boxShadow: 'none', marginLeft: '10px', marginRight: '10px', width: '100px' }} className="card">
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
        </Card>

        <Card sx={{ height: '120px', boxShadow: 'none', marginLeft: '10px', marginRight: '10px', width: '100px' }} className="card">
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

        <Card sx={{ height: '120px', boxShadow: 'none', marginLeft: '10px', marginRight: '10px', width: '100px' }} className="card">
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
          <Card sx={{ height: '120px', boxShadow: 'none', marginLeft: '10px', marginRight: '10px', width: '100px' }} className="card">
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
  );
}

export default Punchin;
