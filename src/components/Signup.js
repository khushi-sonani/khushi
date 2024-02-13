import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import logo from './img/logo.jpg';
import './signup.css';
import styled from 'styled-components';
import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom"; 
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';


// import React, { useState, useEffect } from "react";
function Signup() {
  const [date, setDate] = useState();
  const [dob, setDob] = useState(null);
  const [dojoining, setDojoining] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNo: '',
  });
  const [PostData, setPostData] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      // Handle the "OK" button click
      if (result.isConfirmed) {
        navigate('/emp'); // Redirect to the desired route
      }
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        'https://attendance-backend-five.vercel.app/company',
        formData
      );
      setFormData({
        name: '',
        email: '',
        password: '',
        mobileNo: '',
      });
      setRegistrationSuccess(true);
      showSuccessAlert();
    } catch (error) {
      console.error(error);
      setRegistrationSuccess(false);
      Swal.fire({
        title: 'Registration Failed',
        text: 'falied in sign up try again ',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <div>
     
    
      <form onSubmit={handleSubmit}>
        <div className='main'>
          <div className='sub-main'>
            <div>
              <div className='imgs'>
                <div className='container-img'>
                  <img src={logo} alt='logo' className='logo' />
                </div>
              </div>
              <h1 className='h1'>Registration</h1>
              <div>
                <TextField label="User name" name="name" type="text" size="small" onChange={handleChange} />
              </div><br/>
              <div>
                <TextField label="Mobile No" name="mobileNo" type="number" size="small" onChange={handleChange}/>
              </div><br/>
              <div>
                <TextField label="Adrress" name="address" type="text" size="small"   style={{ width:'250px'}} multiline
          maxRows={4} onChange={handleChange}/> 
              </div><br/>
              <div>
    <input
        type="date"
        name="dob"
        style={{ width: '236px', borderRadius: '5px', border: '1px solid grey', height:'28px' }}
        onChange={handleChange}
        value="Date of Birth"
        onFocus={(e) => e.target.value === 'Date of Birth' && (e.target.value = '')}
        onBlur={(e) => e.target.value === '' && (e.target.value = 'Date of Birth')}
    />
</div>
<br/>
              <div>
                <TextField label="E-mail" name="email" type="text" size="small" onChange={handleChange} />
              </div><br/>
              <div> 
                <TextField label="Pancard No" type="number" name="pannumber" size="small" onChange={handleChange} /> <br />
              </div><br/>
              <div>
                <TextField label="Adhar No" name="adharnumber" size="small" onChange={handleChange} /> <br />
              </div><br/>
              <div>
      <FormControl component="fieldset">
        <Grid container alignItems="center" style={{ marginLeft:'15px', marginTop:"2px", marginBottom:'0px'}}>
          <Grid item>
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginRight: '18px' }}>
              Gender
            </FormLabel>
          </Grid>
          <Grid item>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={formData.gender} // Bind the value to the state
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                name=""
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </FormControl>
    </div><br/>
              <div>
                <TextField label="Designation"  name="designation" type="text"size="small" onChange={handleChange}/>
              </div><br/>
              <div>
         <input type="date" style={{width:'235px', borderRadius:"5px", border:"1px  solid grey",  height:'28px'}}  name="dojoining"  onChange={handleChange}/>
         </div><br/>
              <div>
                 </div><br/>
              <div>
                <input
                  type="file"
                  name="profile"
                  onChange={handleChange}
                  accept="image/*" // Allow only image files
                />
              </div><br/>
              <div>
                <TextField label="Password"  name="password" type="password" size="small" onChange={handleChange}/>
              </div><br/>
              <div className="btn">
                <Button type='submit' variant="contained" size="large" style={{ backgroundColor:'#4f5cd7'}}>submit</Button>
 
              </div>
              <p className='link' style={{ cursor: "pointer", paddingBottom:'50px' }}onClick={() => navigate("/")}>
                already have an account? <b>Login</b>
              </p>
            </div>
          </div>
        </div>
        
      </form>
    </div>
      );
}


export default Signup;
