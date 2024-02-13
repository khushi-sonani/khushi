import React, { useRef,useState,  useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import {Dialog, DialogTitle,DialogContent,DialogActions,} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Document() {
 
  const [userData, setUserData] = useState([]);

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

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
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState('');
  const [error, setError] = useState(null);

 

    
  // Function to handle the post request
  // Function to handle the post request
async function handlePostDocument(e) {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    // If a file is selected, set the newDocument state to its name or other relevant information.
    setNewDocument(selectedFile.name);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('https://attendance-backend-five.vercel.app/document/documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to post the document: ${response.status} ${response.statusText}`);
      }

      // Log the added document to the console
      console.log('Document added:', selectedFile.name);

      alert('Document added'); // Show an alert after the document is added
      setNewDocument(''); // Reset the newDocument state
    } catch (error) {
      setError('An error occurred while posting the document.');
      console.error('Error:', error);
    }
  }
}


  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/document/documents'); // Adjust the URL to your backend endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch documents: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        setError('An error occurred while fetching documents.');
        console.error('Error:', error);
      }
    }

    // Fetch documents when the component mounts
    fetchDocuments();
  }, []);

  return (
    <div  style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '1px',
      justifyContent: 'center'
    }}>
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
          {userData.length !== 0 ? (
            <div>
              <p className='color'>{userData[0].name}'s Documents</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  <div>
    {error ? (
      <p>Error: {error}</p>
    ) : (
      <ul>
        {documents.map((document, index) => (
          <li key={index}>{document.name}</li>
        ))}
      </ul>
    )}
  </div>
  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{ marginLeft: '200px' , marginTop:"450px"}}>
    Upload file
    <VisuallyHiddenInput type="file" onChange={handlePostDocument} />
  </Button>
</div>

      </div>
     
  
  );
}

export default Document;
