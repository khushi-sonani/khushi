import React, { useState, useEffect } from 'react';
import khushi from "./img/khushi.jpeg";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from '@mui/material';
import './profile.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import Cookies from 'js-cookie'; // Import the Cookies package

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(khushi);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNo,setmobileNo]=useState('');
  const [email, setEmail] = useState('');
  const[empid,setempid] =useState(' ');
  const [token, setToken] = useState('');

  if (userData?.length != 0 ) {
    
    console.log("user name: ", userData)
  }

  
  const fetchUserData = async () => {
    try {
      const mobileNo = Cookies.get('mobileNo'); // Get the mobile number from the cookie
      
      if (!mobileNo) {
        throw new Error('Mobile number not found in cookie.');
      }
      const authToken = Cookies.get('authToken'); // Get the authentication token from the cookie

      // Make a request to your backend API to fetch user data based on the mobile number
      const response = await fetch(`https://attendance-backend-five.vercel.app/search/${mobileNo}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the authentication token
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      setUserData(data.data);
      setError('');
    } catch (error) {
      setError('Error fetching user data. Please try again later.');
    }
  };


  

  // Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    
    const storedUsername = Cookies.get('name');
    const storedEmail = Cookies.get('email');
    const storedempid =Cookies.get('empid');
    const storedmobileNo=Cookies.get('mobileNo')
    
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
        fetchUserData();

  }, [mobileNo]);
     
  
      
  //
  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle image change
  const handleImageChange = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Function to handle profile image click
  const handleProfileImageClick = () => {
    setShowProfileImage(!showProfileImage);
  };

  return (
    <div className='main' style={{ paddingTop: '1px' }}>
    <div className='sub-main'>
      <div>
        <Box sx={{ flexGrow: 1, width: 380, backgroundColor: 'black' }}>
          <AppBar position="static" style={{ backgroundColor: '#424242' }}>
            <Toolbar>
              <a href='userdash' style={{ backgroundColor: '#424242', border: 'none', color: 'white', textDecoration: 'none' }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ color: 'white' }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </a>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div>
            {userData.length !=0  ? (
              <div > 
                <p className='color'>{userData[0].name}</p>
                
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <div className='imgs'>
          <div className='container-img' style={{ marginTop: '10px' }}>
            <img
              src={profileImage}
              alt='logo'
              className={`logo ${showProfileImage ? 'enlarged' : ''}`}
              onClick={handleProfileImageClick}
            /><br />
          </div>
        </div>
        <Popup
          contentStyle={{ width: '300px', left: '40%' }}
          trigger={
            <Button variant="contained" size="large" style={{ marginTop: "10px" }} >
              Edit profile
            </Button>
          }
          position="bottom center"
        >
          <div style={{ width: '300px', textAlign: 'center' }}>
            <h4>Do you want to change your profile image?</h4>
            <p className='i'>Edit Image</p>
            <input
              type="file"
              id="fileInput"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => handleFileChange(e)}
              style={{ marginBottom: '10px' }}
            /><br />
            <Button variant="contained" size="small" onClick={handleImageChange} color="primary">Confirm</Button>
          </div>
        </Popup>
        {/* Display more user data here */}
        <div>

        <div>
  {userData.length !== 0 ? (
   <div
   style={{
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
      // Set the height to the viewport height for vertical centering
   }}
 >
    <table style={{ fontSize: '16px' , border:'0px' }}>
    <tbody>
      <tr>
        <td>empid:</td>
        <td style={{ fontSize: '18px', paddingRight: '20px' }}>{userData[0].empid}</td>
      </tr>
      <tr>
        <td>Name:</td>
        <td style={{ fontSize: '18px', paddingRight: '60px' }}>{userData[0].name}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td style={{ fontSize: '18px', paddingRight: '10px' }}>{userData[0].email}</td>
      </tr>
      {/* Add more rows and cells for other user data */}
    </tbody>
  </table>
  </div>
  ) : (
    <p>Loading user data...</p>
  )}
</div>

</div>



      </div>
    </div>
    {showProfileImage && (

      <div className="enlarged-image-container">
        <div className="enlarged-image">
          <img
            src={profileImage}
            alt='Enlarged profile'
            className="enlarged"
          />
        </div>
      </div>
    )}
  </div>
);
}

export default Profile;
