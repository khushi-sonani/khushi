import React, { useState } from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import khushi from './img/khushi.jpeg';

function For({ closeModal }) {
  const [photoUpdated, setPhotoUpdated] = useState(false);

  const handleReset = () => {
    // Perform the action you want, such as updating the photo
    // For example, set the photoUpdated state to true
    setPhotoUpdated(true);
  };

  return (
    <div className='model-back'>
      <div className='modelcontainer'>
        <div className='imgs'>
          <div className='container-img'>
            <img src={khushi} alt='logo' className='logo' />
          </div>
        </div>
        <div className='title'>
          <h1> Forgot password ?</h1>
        </div>
        <div className='body'>
          {/* Your input fields */}
        </div>
        <br/><br/><br/><br/><br/><br/>
        <div className='footer'>
          <Link to="/">
            <Button variant="contained" size="large" >cancel</Button>
          </Link>
          <Button variant="contained" size="large" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default For;
