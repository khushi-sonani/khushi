import React ,{ useState } from 'react'
import  ReactDOM  from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom"; 
import './pdetail.css'



function Pdetail() {
    const { collapseSidebar } = useProSidebar();
    const [rows, setRows] = useState([
        { name: 'khuhsi', accountnumber: '79844565', ifsccode:'4511',bankname:'sbi',editing: false },
        { name: 'dhruvi',accountnumber: '79844565', ifsccode:'4511', bankname:'sbi',editing: false },
        { name: 'krisha', accountnumber: '79844565', ifsccode:'4511',bankname:'sbi', editing: false },
        { name: 'mansi', accountnumber: '79844565',ifsccode:'4511',bankname:'sbi', editing: false },
       
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
        const newRows = [...rows, { name: '', accountnumber: '',ifsccode:'', bankname:'',editing: true }];
        setRows(newRows);
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
      
       
   
   <div className='containe'>
                <h1>Bank Details</h1>
                    <table>
                        <thead>
                            <tr>
                           
                                <th>Name</th>
                                <th>accountnumber</th>
                                <th>ifsccode</th>
                                <th>bankname</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                 
                                    {!row.editing && <td>{row.name}</td>}
                                    {!row.editing && <td>{row.accountnumber}</td>}
                                    {!row.editing && <td>{row.ifsccode}</td>}
                                    {!row.editing && <td>{row.bankname}</td>}
                                    
                                    {row.editing && <td><input type="text" value={row.name} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].name = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                    {row.editing && <td><input type="text" value={row.accountnumber} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].accountnumber = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                      {row.editing && <td><input type="number" value={row.ifsccode} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].ifsccode = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                    {row.editing && <td><input type="text" value={row.bankname} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].bankname = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                    
                                    <td>
                                        {!row.editing && <button className="edit-button" onClick={() => editRow(row)}>Edit</button>}
                                        {row.editing && <button className="save-button" onClick={() => saveRow(row)}>Save</button>}
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
  )
 
}

export default Pdetail;
