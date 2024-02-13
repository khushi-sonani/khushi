import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom"; 

function Side() {
  const { collapseSidebar } = useProSidebar();

  return (
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
      <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          React-Pro-Sidebar
        </h1>
      </main>
    </div>
    </div>
  );
}
  
  
  export default Side;
