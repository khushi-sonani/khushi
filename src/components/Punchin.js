import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ChatIcon from "@mui/icons-material/Chat";
import { FaWhatsapp } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import Popover from '@mui/material/Popover';
import moment from "moment";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import logo from "./img/logo-removebg-preview(1).png";

const iconStyle = {
  color: "black",
};

function Punchin() {
  const [mobileNo, setMobileNo] = useState("");
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Read mobile number from cookie when the component mounts
    const storedMobileNo = Cookies.get("mobileNo");
    if (storedMobileNo) {
      setMobileNo(storedMobileNo);
    } else {
      // Mobile number is not present in the cookie, navigate to the login page
      navigate('/');
    }
  }, [navigate]);

  const handlePunch = async () => {
    try {
      const now = new Date();
      const currentDate = moment(now).format("YYYY-MM-DD");
      const currentTime = moment(now).format("HH:mm:ss");

      const postData = {
        mobileNo,
        attendandanceDate: currentDate,
        attendandanceTime: currentTime,
        status: isPunchedIn ? "Punch out" : "Punch in", // Toggle status
      };

      const response = await fetch(
        "https://attendance-backend-five.vercel.app/punching/attandance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Punch Successful:", data);

        // Save mobile number to cookie for future use
        Cookies.set("mobileNo", mobileNo, { expires: 7 }); // Cookie expires in 7 days

        // Show SweetAlert with status and confirmation
        const alertResult = await Swal.fire({
          title: `${isPunchedIn ? "Punch Out" : "Punch In"} Successful`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        });

        if (alertResult.isConfirmed) {
          setIsPunchedIn((prevState) => !prevState); // Toggle the punched in state
        }
      } else {
        console.error("Failed to store date and time");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const boxStyle = {
    backgroundColor: "black",
    width: "328px",
    marginTop: "78%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonStyle = {
    backgroundColor: "#ef5350",
    width: "320px",
    height: "50px",
    color: "white",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const iconStyle = {
    fontSize: "36px",
  };
  const boxStyle2 = {
    backgroundColor: "#e1f5fe",
    color: "black",
    fontweight: "bold",
  };
  const logo1 = {
    height: "50px",
    marginLeft: "30px",
    marginTop: "10px",
  };
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60);
    return () => clearInterval(intervalId);
  }, []);

  const day = currentDate.toLocaleDateString('en-US', { day: '2-digit' });
  const month = currentDate.toLocaleDateString('en-US', { month: 'short' });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("mobileNo");
    navigate('/');
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box sx={boxStyle2}>
        <div style={{ display: "flex" }}>
          <img className="" style={logo1} src={logo} />
          <h3 style={{ marginTop: "25px", marginLeft: "10px" }}>Salary Box</h3>

          <NotificationsNoneOutlinedIcon
            style={{ paddingTop: '20px', paddingLeft: '140px', cursor: 'pointer' }}
            onClick={handleIconClick}
          />

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ padding: '10px' }}>
              <Button variant="" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Popover>
        </div>
        <div style={{ display: 'flex', marginTop: "-10px" }}>
          <p style={{ marginLeft: "10px", color: "black" }}>
            {`${day} ${month}`}    </p>
          {isPunchedIn && (
            <p style={{ marginLeft: '10px', color: '#304ffe', }}>Present</p>
          )}
        </div>
      </Box>
      <Box sx={boxStyle}>
        <Button style={buttonStyle} onClick={handlePunch}>
          {isPunchedIn ? "Punch Out" : "Punch In"}
        </Button>
      </Box>
      <a href="notes">
        <Button
          style={{
            backgroundColor: "#80deea",
            textAlign: "center",
            width: "360px",
            borderRadius: "0px",
            height: "50px",
            color: "black",
            fontSize: "15px",
          }}
        >
          Check today's note
        </Button>
      </a>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "0px",
          marginLeft: "0px",
        }}
      >
        <Card
          sx={{
            height: "120px",
            boxShadow: "none",
            marginLeft: "10px",
            marginRight: "10px",
            width: "100px",
          }}
          className="card"
        >
          <CardActionArea>
            <CardContent>
              <div>
                <FingerprintIcon style={iconStyle} />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "black" }}>
                  Mark Attendance
                </p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            height: "120px",
            boxShadow: "none",
            marginLeft: "10px",
            marginRight: "10px",
            width: "100px",
          }}
          className="card"
        >
          <a href="chat" style={{ textDecoration: "none", color: "black" }}>
            <CardActionArea>
              <CardContent>
                <div>
                  <ChatIcon style={iconStyle} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "black" }}>Chat</p>
                </div>
              </CardContent>
            </CardActionArea>
          </a>
        </Card>

        {/* <Card
          sx={{
            height: "120px",
            boxShadow: "none",
            marginLeft: "10px",
            marginRight: "10px",
            width: "100px",
          }}
          className="card"
        >
          <CardActionArea>
            <CardContent>
              <div>
                <FaWhatsapp style={iconStyle} />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "black" }}>Posters</p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card> */}

        <a href="userdash" style={{ textDecoration: "none" }}>
          <Card
            sx={{
              height: "120px",
              boxShadow: "none",
              marginLeft: "10px",
              marginRight: "10px",
              width: "100px",
            }}
            className="card"
          >
            <CardActionArea>
              <CardContent>
                <div>
                  <PersonIcon style={iconStyle} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "black" }}>Profile</p>
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
