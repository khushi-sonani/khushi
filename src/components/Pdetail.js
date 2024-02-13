import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './pdetail.css';

function Pdetail() {
  const { collapseSidebar } = useProSidebar();
  const [rows, setRows] = useState([
    { name: 'khushi', email: 'khushi@gmail.com', mobileno:"9874555444",address:'sbi',editing: false },
    { name: 'dhruvi',email: 'khushi@gmail.com',  mobileno:"9874555444", address:'sbi',editing: false },
    { name: 'krisha',email: 'khushi@gmail.com',  mobileno:"9874555444",address:'sbi', editing: false },
    { name: 'mansi', email: 'khushi@gmail.com', mobileno:"9874555444",address:'sbi', editing: false },
   
  ]);

  const editRow = (row) => {
    const updatedRows = rows.map((r) => {
      if (r === row) {
        return { ...r, editing: true };
      }
      return r;
    });
    setRows(updatedRows);
  };

  const saveRow = (row) => {
    const updatedRows = rows.map((r) => {
      if (r === row) {
        return { ...r, editing: false };
      }
      return r;
    });
    setRows(updatedRows);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const addRow = () => {
    const newRows = [...rows, { name: '', email: '', mobilno: '', address: '', editing: true }];
    setRows(newRows);
  };
  const [showInfoPopup, setShowInfoPopup] = useState(false); // State to control the popup
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee

  const toggleInfoPopup = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
    setShowInfoPopup(!showInfoPopup); // Toggle the state to open/close the popup
  };



  return (
    <div>
       <div className="sidebar">
    <div id="app" style={({ height: "20px" }, { display: "flex" })}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>

          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
       
        
          <SubMenu icon={<PeopleOutlinedIcon />} label="Details">
          <MenuItem icon={<PeopleOutlinedIcon />}>
              <Link to="/Pdetail" style={{ color: "black", textDecoration: "none" }}>Personal Details</Link>
            </MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>
              <Link to="/bankdetail" style={{ color: "black", textDecoration: "none" }}>Bank Details</Link>
            </MenuItem>
            
        </SubMenu>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>
          <Link to="/Profile" style={{ color: "black", textDecoration: "none" }}>Profile</Link>
          </MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
          <div className="container">
            <h1>Personal Details</h1>
            <table className='tbl'>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>  
                  <th>Mobile</th>
                  <th>Address</th>
                  {rows.some(row => row.editing) && (
  <>
    <th>Gender</th>
    <th>PAN Card</th>
  </>
)}

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                      <td>
                      {/* Show Info button with popup */}
                      <button className="show-info-button" onClick={() => toggleInfoPopup(row)}>Show Info</button>
                      {/* Popup component */}
                      {showInfoPopup && selectedEmployee === row && (
                        <Popup style={{width:'100px'}}
                          open={showInfoPopup}
                          closeOnDocumentClick
                          onClose={() => toggleInfoPopup(null)} // Close the popup when clicking outside
                        >
                          {/* Popup content */}
                          <div className="popup-content">
                           <h2>{row.name}'s Details</h2>
                            <p>Email: {row.email}</p>
                            <p>Mobile: {row.mobileno}</p>
                            <p>Address: {row.address}</p>
                            <p>Gender: {row.gender}</p>
                            <p>PAN Card: {row.panCard}</p>
                            <button onClick={() => toggleInfoPopup(null)}>Close</button>
                          </div>
                        </Popup>
                      )}
                    </td>
                    <td>
                      {!row.editing && <span>{row.name}</span>}
                      {row.editing && <input type="text" value={row.name} onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].name = e.target.value;
                        setRows(updatedRows);
                      }} />}
                    </td>
                    <td>
                      {!row.editing && <span>{row.email}</span>}
                      {row.editing && <input type="text" value={row.email} onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].email = e.target.value;
                        setRows(updatedRows);
                      }} />}
                    </td>
                    <td>
                      {!row.editing && <span>{row.mobileno}</span>}
                      {row.editing && <input type="text" value={row.mobileno} onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].mobilno = e.target.value;
                        setRows(updatedRows);
                      }} />}
                    </td>
                    <td>
                      {!row.editing && <span>{row.address}</span>}
                      {row.editing && <input type="text" value={row.address} onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].address = e.target.value;
                        setRows(updatedRows);
                      }} />}
                    </td>
                    

                    {row.editing ? (
  <>
    <td>
      {!row.editing && <span>{row.gender}</span>}
      {row.editing && <input type="text" value={row.gender} onChange={(e) => {
        const updatedRows = [...rows];
        updatedRows[index].gender = e.target.value;
        setRows(updatedRows);
      }} />}
    </td>
    <td>
      {!row.editing && <span>{row.panCard}</span>}
      {row.editing && <input type="text" value={row.panCard} onChange={(e) => {
        const updatedRows = [...rows];
        updatedRows[index].panCard = e.target.value;
        setRows(updatedRows);
      }} />}
    </td>
  </>
) : (
  <>
    <td style={{ display: 'none' }}>{row.gender}</td>
    <td style={{ display: 'none' }}>{row.panCard}</td>
  </>
)}
                    <td>
                      {!row.editing && <button className="edit-button" onClick={() => editRow(row)}>Edit</button>}
                      {row.editing && <button className="save-button" onClick={() => saveRow(row)}>Save</button>}
                    </td>
                    <td>
                      <button className="delete-button" onClick={() => deleteRow(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-button" onClick={addRow}>Add Row</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pdetail;
