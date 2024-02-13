import  React ,{useState,useRef, useEffect}from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Textarea from '@mui/joy/Textarea';
import Cookies from 'js-cookie';
import {Button,Dialog, DialogTitle,DialogContent,DialogActions,} from '@mui/material';

import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileOpen = () => {
    if (selectedFile) {
    
      console.log("Opening file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function History() {

  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const [age, setAge] = React.useState('');

  const currencies = [
    {
      value: 'Casual Leave',
      label: 'Casual Leave',
    },
    {
      value: 'Privileged leave',
      label: 'Privileged leave',
    },
    {
      value: 'Sick Leave',
      label: 'Sick Leave',
    },
    {
      value: 'Unpaid Leave',
      label: 'Unpaid Leave',
    },
    {
      value: 'paid Leave',
      label: 'Paid Leave',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const handleButtonClick = () => {
    
    fileInputRef.current.click();
  };
  const handleChooseFromGalleryClick = () => {
    secondFileInputRef.current.click();
  };
  const secondFileInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [leavetype, setLeavetype] = useState('c');
  const [reasonofleave, setReasonofleave] = useState('');
  
  
  const handleRequestLeave = async (e) => {
    e.preventDefault();
  
    try {  
      const empid = Cookies.get('empid');

      const formattedFromDate = new Date(fromDate);
      const formattedToDate = new Date(toDate);
  
     
      const timezoneOffset = formattedFromDate.getTimezoneOffset();
      formattedFromDate.setMinutes(formattedFromDate.getMinutes() - timezoneOffset);
      formattedToDate.setMinutes(formattedToDate.getMinutes() - timezoneOffset);
      const currentDate = new Date(); 

const formattedDate = currentDate.toISOString().split('T')[0]

  
      
  
      const requestData = {
        fromdate: formattedFromDate.toISOString().split('T')[0],
        todate: formattedToDate.toISOString().split('T')[0], 
        leavetype: leavetype, 
        reasonofleave: reasonofleave, 
        empid: empid,
        applydate: formattedDate, 
      };
      console.log('Request Data:', requestData);
  
  
      const apiUrl = 'https://attendance-backend-five.vercel.app/leave/requestleave'; 
  

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Leave request created:', data.leaveRequest);
  
      alert('Leave request created successfully');
  
    
    } catch (error) {
      console.error('Error creating leave request:', error);
      alert('Error creating leave request' + error);
    }
  };
const [empid, setEmpid] = useState('');
const [leaveRequests, setLeaveRequests] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [anchorEl, setAnchorEl] = useState(null); 
const [selectedRequestId, setSelectedRequestId] = useState(null);
const [empName, setEmpName] = useState('');

useEffect(() => {
  // Retrieve empid from cookies
  const storedEmpid = Cookies.get('empid');
  const storedEmpName = Cookies.get('empName');


  if (storedEmpid) {
    setEmpid(storedEmpid);

    // Fetch leave requests for the specific employee
    async function fetchData() {
      try {
        const response = await fetch(`https://attendance-backend-five.vercel.app/leave/getleave/${storedEmpid}`);
        if (response.ok) {
          const data = await response.json();
          setLeaveRequests(data.leaveRequests);
          setLoading(false);
        } else {
          setError('Error fetching leave requests');
          setLoading(false);
        }
      } catch (error) {
        setError('Network error');
        setLoading(false);
      }
    }

    fetchData();
  }
}, []);
const handleMenuOpen = (event, requestId) => {
  setAnchorEl(event.currentTarget);
  setSelectedRequestId(requestId);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  setSelectedRequestId(null);
};

const [leaveStats, setLeaveStats] = useState({
  privilegeLeaveCount: 0,
  sickLeaveCount: 0,
  casualLeaveCount: 0,
  paidLeaveccount: 0,
});

useEffect(() => {
  const empidFromCookie = Cookies.get('empid');

  if (empidFromCookie) {
    const fetchLeaveStats = async () => {
      try {
        const response = await fetch(`https://attendance-backend-five.vercel.app/leave/leavestats/${empidFromCookie}`);
        const data = await response.json();
        setLeaveStats(data);
      } catch (error) {
        console.error('Error fetching leave stats:', error);
      }
    };

    fetchLeaveStats();
  } else {
    console.warn('empid not found in cookies');
  }
}, []);

  
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        margin: '0 auto', 
        position: 'relative',
        minHeight: 100, 
        
      }}
    >
      <AppBar position="static" color="default" style={{ backgroundColor: '#424242', color:'white' }}>
      <Toolbar>
      <button style={{ backgroundColor:'#424242' , border:'none' , color:'white'}}>
            <a href='userdash'  >
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
          </button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Request Leave
          </Typography>
          
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="white"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Request" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <h3   style={{marginLeft:'1%', marginTop:'0%'}}>Leave Balance</h3>
            
        <div
    style={{
      display: 'flex',
      marginBottom: '10px', 
      justifyContent: 'center'
    }}
  >
    <Box
  color="black"
  marginLeft="10%"
  bgcolor="#e8f5e9"
  borderLeft="4px solid darkgreen"
  height="40px"
  width="80px"
  p={1}
  style={{
    marginRight: '10px',
    marginLeft: '1px',
    fontSize: '12px',
    textAlign: 'center',
    whiteSpace: 'nowrap', 
  }}
>
  Privileged leave<br />
  <div>
    <b style={{ fontSize: '20px' }}>{leaveStats.privilegeLeaveCount}</b>
  </div>
</Box>

    <Box

      color="black"
      marginLeft="10%"
      bgcolor="#e8f5e9"
      borderLeft="4px solid darkgreen"
      height="40px"
      width="80px"
      p={1}
      style={{ marginRight: '10px',marginLeft:'1px', fontSize: '12px', textAlign: 'center' }}
    >
      Sick leave<br />
      <b style={{ fontSize: '20px' }}>{leaveStats.sickLeaveCount}</b>
    </Box>
    <Box

color="black"
marginLeft="10%"
bgcolor="#e8f5e9"
borderLeft="4px solid darkgreen"
height="40px"
width="80px"
p={1}
style={{ marginRight: '10px',marginLeft:'1px', fontSize: '12px', textAlign: 'center' }}
>
      Casual leave<br />
      <b style={{ fontSize: '20px' }}>{leaveStats.casualLeaveCount}</b>
    </Box>
    
  </div>
  <div style={{ marginTop: '20px', marginLeft: '1%', display: 'flex', alignItems: 'center' }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ marginRight: '10px' }}>
      <DatePicker label="From Date"  value={fromDate}
        onChange={(date) => setFromDate(date)}/>
    </div>
    <div>
      <DatePicker label="To Date"  value={toDate}
        onChange={(date) => setToDate(date)} />
    </div>
  </LocalizationProvider>
</div>
<div style={{ marginTop: '10px' , marginLeft:'1%'}}>
  <FormGroup>
      
      <FormControlLabel control={<Checkbox />} label="Requst leave for half day" size="medium"/>
     
    </FormGroup>
    </div>
    <Box sx={{ minWidth: 120 }}>
    <div style={{ marginTop: '10px', marginLeft:'1%' }}>
    <TextField
          id="outlined-select-currency"
          select
          label="Select Leave"
          defaultValue="Casual Leave"
          value={leavetype}
          onChange={(e) => setLeavetype(e.target.value)}
          sx={{ minWidth: 310 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div style={{ marginTop: '10px', marginLeft:'1%', marginBottom:'1px' }}>
        
        <Textarea placeholder="Reason of leave (Optional)"value={reasonofleave}
  onChange={(e) => setReasonofleave(e.target.value)}  minRows={2}/>
        <p  style={{ fontSize:'20px', color:'black', marginTop:'5px'}}><b>Add Image</b></p>
          <Button style={{marginTop:'0%', color:'black' , border:'solid black',height:'50px', width:'10px', fontSize:'10px'}} onClick={openPopup}>ADD<br/> FILE</Button>
          <Dialog open={isOpen} onClose={closePopup}>
        <DialogTitle>Update Document</DialogTitle>
        <DialogContent>
        
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none', fontSize:'15px'}}onClick={handleButtonClick}  >
            Take a picture
           
          </Button>
          <input
        type="file"
        accept="image/*"
        capture="camera"
        ref={fileInputRef}
        style={{ display: 'none' }} 
      />
        
     <br/>
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none',fontSize:'15px'}} onClick={handleChooseFromGalleryClick} >
            Choose from gallery
          </Button>
          <input
        type="file"
        accept="image/*"
        ref={secondFileInputRef}
        style={{ display: 'none' }}
      />
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none', fontSize:'15px'}} onClick={handleChooseFromGalleryClick}>
            Choose document
          </Button>
          <input
        type="file"
        accept="image/*"
        ref={secondFileInputRef}
        style={{ display: 'none' }} 
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>Cancel</Button>
        </DialogActions>
      </Dialog>
          </div>
       
          <Button style={{marginTop:'17%', color:'white' ,height:'50px', width:'100%', fontSize:'20px', backgroundColor:'#4f5cd7'}}   onClick={handleRequestLeave}>Request Leave</Button>
        
        
    </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {leaveRequests.map((request) => (
       <div
  key={request._id}
  style={{
    width: '100%', 
    margin: '1%',
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '1px 3px 3px 1px #bdbdbd',
    padding: '10px',
    boxSizing: 'border-box', 
  }}
>
<div style={{ marginBottom: '10px' }}>
    <h4 style={{ fontSize: '16px', margin: 0 }}>{request.empid}</h4>
    <p style={{ fontSize: '12px', color: 'black', margin: 0 }}>
      Applied on {new Date(request.applydate).toLocaleDateString()}
    </p>
  </div>
  <p style={{ color: '#757575', fontSize: '12px' }}>From Date</p>
  <p style={{ color: 'black', fontSize: '12px' }}>{request.fromdate}</p>
  <p style={{ color: '#757575', fontSize: '12px' }}>To Date</p>
  <p style={{ color: 'black', fontSize: '12px' }}>{request.todate}</p>
  <p style={{ color: '#757575', fontSize: '12px' }}>Leave Type</p>
  <p style={{ color: 'black', fontSize: '12px' }}>{request.leavetype}</p>
  <p style={{ color: '#757575', fontSize: '12px' }}>Reason</p>
  <p style={{ color: 'black', fontSize: '12px', paddingBottom: '10px' }}>{request.reasonofleave}</p>
  <p style={{ color: '#757575', fontSize: '12px' }}>Status</p>
  <p style={{ color: 'red', fontSize: '12px' }}>{request.status}</p>
</div>

      ))}
    </div>
        </TabPanel>
        
      </SwipeableViews>
     
    
    </Box>
  );
}