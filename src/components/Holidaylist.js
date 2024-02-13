import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHolidaysData = async () => {
    try {
      const response = await fetch('https://attendance-backend-five.vercel.app/holiday/holidays');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Sort holidays by date in ascending order
      result.holidays.sort((a, b) => new Date(a.date) - new Date(b.date));

      setHolidays(result.holidays);
    } catch (error) {
      setError('An error occurred while fetching holiday records.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHolidaysData();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1, width: 600, backgroundColor: '#e0f2f1' }}>
        <AppBar position="static" style={{ backgroundColor: '#e0f2f1' }}>
          <Toolbar>
            <button style={{ backgroundColor: '#e0f2f1', border: 'none', color: 'black' }}>
              <a href='userdash'  >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  style={{ color: 'black', backgroundColor:'#e0f2f1' }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </a>
            </button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color:'black'}}>
              Holiday List
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* <h2 style={{ textAlign:'center'}}>Holidays</h2> */}
          <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
            <Table style={{ width:'90%', textAlign:"center" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Holiday Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holidays.map((holiday) => (
                  <TableRow key={holiday._id}>
                    <TableCell>{holiday.date}</TableCell>
                    <TableCell>{holiday.holidaytype}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default HolidayList;
