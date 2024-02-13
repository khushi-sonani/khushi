import logo from './logo.svg';
import './App.css';
import Login from '../src/components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Location from './components/Location';
import Front from './components/Front';
import Modal from './components/Modal';
import Profile from './components/Profile';
import Bank from './components/Bank';
import Side from './components/Side'
import  Pdetail from './components/Pdetail'
import Bankdetail from './components/Bankdetail'
import Punchin from './components/Punchin'
import Attendance from './components/Attendance'
import History from './components/History'
import Document from './components/Document'
import Userdash from './components/Userdash';
import Notes from './components/Notes';
import Chat from './components/Chat';
import Fotter from './components/Fotter'
import Holidaylist from './components/Holidaylist'
import Profile1 from './components/Profile1';



function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/location" element={<Location/>} />
        <Route path="/front" element={<Front />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/side" element={<Side/>} />
        <Route path="/pdetail" element={<Pdetail/>} />
        <Route path="/bankdetail" element={<Bankdetail/>} />
        <Route path="/punchin" element={<Punchin/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/document" element={<Document/>} />
        <Route path="/userdash" element={<Userdash/>} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/fotter" element={<Fotter/>} />
        <Route path="/holidaylist" element={<Holidaylist/>} />
        <Route path="/profile1" element={<Profile1/>} />
        
       
        
                
      </Routes>
  </BrowserRouter>
  );
}

export default App;
