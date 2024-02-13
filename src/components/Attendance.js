import { Box } from '@mui/material';
import React, { useState,   useEffect  } from 'react';
import Calendar from 'react-calendar';
import './attendance.css';
import 'react-calendar/dist/Calendar.css';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CodeIcon from '@rsuite/icons/Code';
import Dropdown from 'rsuite/Dropdown';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    handleClickOpen();
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  const DateTile = ({ date, handleDateClick }) => (
    <button
      className="date-button"
      onClick={() => handleDateClick(date)}
    >
      {date.toLocaleDateString(undefined, { weekday: 'short' })}<br />
      {date.getDate()}
    </button>
  );
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
  const [attendanceData, setAttendanceData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const mobileNoFromCookies = Cookies.get('mobileNo');

    if (!mobileNoFromCookies) {
      // Handle the case when mobileNo is not found in cookies
      console.error('Mobile number not found in cookies');
      return;
    }

    // Get the current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Note: Months are 0-based

    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `https://attendance-backend-five.vercel.app/punching/employee-punch-records/${mobileNoFromCookies}/${currentYear}/${currentMonth}`
        );

        setAttendanceData(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching attendance data:', err);
      }
    };

    fetchAttendanceData();
  }, []); // No dependencies, fetch once on mount


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '1px',
      justifyContent: 'center'
    }}>
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
              {userData.length !== 0 ? (
                <div>
                  <p className='color'>{userData[0].name }</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

      <List sx={style} component="nav" aria-label="mailbox folders">
        <Stack sx={{ width: '100%', height: '20%' }} spacing={2}>
          <Alert severity="warning">Attendance for &nbsp;&nbsp;
            <button className='bttn'>
              2023
            </button>
          </Alert>

          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className='dialog'
          >
            <DialogTitle>{"View Your Attendance"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label"><h2>Select Year</h2></FormLabel>
                  <div>
                    <Dropdown title="2023"  >
                      <Dropdown.Item >
                        2023
                      </Dropdown.Item>
                      <Dropdown.Item>
                        2022
                      </Dropdown.Item>
                      <Dropdown.Item >
                        2021
                      </Dropdown.Item>
                      <Dropdown.Item >
                        2020
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                  <div><h2></h2></div>
                  <div><h2></h2></div>
                  <FormLabel id="demo-radio-buttons-group-label"><h2>Select Month</h2></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="august"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="september" control={<Radio />} label="september" />
                    <FormControlLabel value="august" control={<Radio />} label="august" />
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className='footer' variant="contained" onClick={handleClose}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </Stack><br /><br />
        <div style={{
          display: 'flex',
          marginBottom: '10px',
          justifyContent: 'center'
        }}>
          <Box
            color="black"
            marginLeft="10%"
            bgcolor="#e8f5e9"
            borderLeft="4px solid darkgreen"
            height="40px"
            width="55px"
            p={1}
            style={{ marginRight: '10px', marginLeft: '1px', fontSize: '12px', textAlign: 'center' }}
          >
            present<br />
            <div>
              <b style={{ fontSize: '20px' }}>{attendanceData.presentDays}</b>
            </div>
          </Box>
          <Box
            color="black"
            bgcolor="#ffebee"
            borderLeft="4px solid red"
            height="40px"
            width="55px"
            p={1}
            style={{ marginRight: '10px', fontSize: '12px', textAlign: 'center' }}
          >
            Absent<br />
            <b style={{ fontSize: '20px' }}>{attendanceData.absentDays}</b>
          </Box>
          <Box
            color="black"
            bgcolor="lightyellow"
            borderLeft="4px solid yellow"
            height="40px"
            width="55px"
            p={1}
            style={{ marginRight: '10px', fontSize: '12px', textAlign: 'center' }}
          >
            Half Days<br />
            <b style={{ fontSize: '20px' }}>0</b>
          </Box>
          <Box
            color="black"
            bgcolor="#fce4ec"
            borderLeft="4px solid #ad1457"
            height="40px"
            width="60px"
            p={1}
            style={{ marginRight: '10px', fontSize: '12px', textAlign: 'center' }}
          >
            Paid Leave<br />
            <b style={{ fontSize: '20px' }}>0</b>
          </Box>
        </div>
        <Divider />
        <div className='calendar-container' style={{ marginRight: '15px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className="widerCalendar"
              maxDetail="year"
              renderTile={({ date, view }) => {
                if (view === 'year') {
                  return (
                    <DateTile
                      date={date}
                      handleDateClick={handleDateClick}
                    />
                  );
                }
                return null;
              }}
            />
          </LocalizationProvider>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Selected Date</DialogTitle>
            <DialogContent>
              {selectedDate && (
                <div>
                  {selectedDate.toLocaleDateString()}
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </List>
    </div>
  );
};

export default App;
