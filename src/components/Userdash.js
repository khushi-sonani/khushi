import React, { useState } from "react";
import Card from "@mui/material/Card";
import Fotter from './Fotter'    
import CardMedia from "@mui/material/CardMedia";
import "./userdash.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CardActionArea from "@mui/material/CardActionArea"; // Import CardActionArea
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import khuhsi from "./img/khushi.jpeg";
import dayjs from "dayjs";
import fingImage from "./image/fing.png";
import CardContent from "@mui/material/CardContent";

// In your CSS file (e.g., userdash.css)
import "font-awesome/css/font-awesome.min.css";
import { Button } from "bootstrap";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function ActionAreaCard() {
  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showAttendancePopup, setShowAttendancePopup] = useState(false); // Initialize showAttendancePopup

  const toggleInfoPopup = () => {
    setShowInfoPopup(!showInfoPopup);
  };

  const toggleAttendancePopup = () => {
    setShowAttendancePopup(!showAttendancePopup);
  };

  const handleCardClick = () => {
    toggleInfoPopup();
  };

  const handleAttendanceClick = () => {
    toggleAttendancePopup();
    
  };

  return (
    
    <div className="bo">
      
      {/* //box1 */}
      <div>
        <div className="img1">
          <div className="container-img">
            <img src={khuhsi} alt="logo" className="logo" />
          </div>
        </div>
      </div>

      <div className="box-row">
        <a href="profile" style={{textDecoration:"none"}} >
        <Card sx={{ height: "120px" }} className="card">
          <CardActionArea>
            <CardContent>
              <div className="icon-container">
                <i className="fa fa-user fa-3x" aria-hidden="true"></i>
              </div>
              <div className="p1">
                <p className="font">
                  <b>Profile</b>
                </p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        </a>
        {/* //box2 */}
        <a href="history"  style={{textDecoration:"none"}}>
        <Card sx={{ height: "120px" }} className="card">
          <CardActionArea>
            <CardContent>
              <div className="icon-container">
                <i class="fa fa-building-o fa-3x" aria-hidden="true"></i>
              </div>
              <div className="p1">
              <p className="font">
                  <b>Request Leave</b>
                </p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        </a>
        {/* //box3 */}
        <Card sx={{ height: "120px" }} className="card">
          <CardActionArea>
            <CardContent>
              <div className="icon-container">
                <i class="fa fa-briefcase fa-3x" aria-hidden="true"></i>
              </div>
              <div className="p1">
                <p className="font">
                  <b>Add bussiness</b>
                </p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      {/* //box4 */}
      <div className="box-row">
        <a href="attendance" style={{textDecoration:"none"}}>
        <Card sx={{ height: "120px" }} className="card">
          <CardActionArea>
            <CardContent>
              <div className="icon-container">
                <i class="fa fa-calendar-minus-o fa-3x" aria-hidden="true"></i>
              </div>
              <div className="p1">
                <p className="font">
                  <b>view attendance </b>
                </p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        </a>
        {/* //box5     */}
       <a href="notes" style={{textDecoration:"none"}}>
        <Card sx={{ height: "120px" }} className="card">
          <CardActionArea>
            <CardContent>
              <div className="icon-container">
                <i class="fa fa-book fa-3x" aria-hidden="true"></i>
              </div>
              <div className="p1">
                <p className="font">
                  <b>Notes </b>
                </p>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        </a>
       
       
        {/* //box6 */}
        
        <Card sx={{ height: "120px" }} className="card">
          <a href="document" style={{ textDecoration:"none"}}>
          <CardActionArea>
            <CardContent>
              <div className="icon-container">
                <i class="fa fa-file fa-3x" aria-hidden="true"></i>
              </div>
              <div className="p1">
                <p className="font">
                  <b>my document </b>
                </p>
              </div>
            </CardContent>
          </CardActionArea>
          </a>
        </Card>
      
      </div>
      {/* box-7 */}
      {/* Add 3 more boxes in the next line */}

      <div className="card2">
        <div className="alarm">
          <div onClick={() => handleCardClick()} style={{ cursor: "pointer" }}>
            <Card sx={{ height: "120px" }} className="card">
              <CardActionArea>
                <CardContent>
                  <div className="icon-container">
                    <i class="fa fa-clock-o fa-3x" aria-hidden="true"></i>
                  </div>
                  <div className="p1">
                    <p className="font">
                      <b>Set Alarm</b>
                    </p>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <Popup
            open={showInfoPopup}
            closeOnDocumentClick
            onClose={toggleInfoPopup}
            modal
            nested
            contentStyle={{
              position: "absolute",
              bottom: showInfoPopup ? "0" : "-100%", // Slide in from the bottom
              left: "0",
              right: "0",
              height: "40%", // Adjust the height as needed
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
              transition: "bottom 0.3s ease-in-out",
            }}
          >
            {/* Popup content */}
            <p className="setalarm">Alarm</p>
<p>You can set multiple alarms</p>
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={["TimePicker", "TimePicker"]} style={{ display: 'flex', flexDirection: 'column' }}>
    <TimePicker
      label="punchin Alarm"
      defaultValue={dayjs("2022-04-17T15:30")}
      className="custom-timepicker" // Apply a custom CSS class
    />
    <TimePicker
      label="punchout Alarm"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      className="custom-timepicker" // Apply a custom CSS class
    />
  </DemoContainer>
</LocalizationProvider>
          </Popup>
        </div>

        <div className="card0">
          <Card sx={{ height: "120px" }} className="card">
          <a href="holidaylist" style={{ textDecoration:"none"}}>
            <CardActionArea>
              <CardContent>
                <div className="icon-container">
                  <i class="fa fa-list-alt fa-3x" aria-hidden="true"></i>
                </div>
                <div className="p1">
                  <p className="font">
                    <b>Holiday List </b>
                  </p>
                </div>
              </CardContent>
            </CardActionArea>
            </a>
          </Card>
        </div>

        <div className="card1">
          <Card sx={{ height: "120px" }} className="card">
            <CardActionArea onClick={() => handleAttendanceClick()}>
              <CardContent>
                <div className="icon-container">
                  <i class="fa fa-bell-o fa-3x" aria-hidden="true"></i>
                </div>
                <div className="p1">
                  <p className="font">
                    <b>AttendanceReminder</b>
                  </p>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
          <Popup
            open={showAttendancePopup}
            closeOnDocumentClick
            onClose={toggleAttendancePopup}
            modal
            nested
            contentStyle={{
              position: "absolute",
              bottom: showAttendancePopup ? "0" : "-100%", // Slide in from the bottom
              left: "0",
              right: "0",
              height: "40%", // Adjust the height as needed
              width: "90%",
              backgroundColor: "white",
              boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
              transition: "bottom 0.3s ease-in-out",
            }}
          >
            <p className="setalarm">Attendance <br/>Reminder</p>
            <br />
            <div className="punch">
            <div className="punch1">
            <p>Punch in Reminder</p>
            </div>
            <div className="switch">
              <Switch {...label} defaultChecked />
              </div>
            </div>

            <div className="punch">
            <div className="punch1">
            <p>Punch out Reminder</p>
            </div>
            <div className="switch">
              <Switch {...label} defaultChecked />
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}
