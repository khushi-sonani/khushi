// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns } from '@mui/lab/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// const AttendanceComponent = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         `https://attendance-backend-five.vercel.app/punching/attandance/${mobileNumber}/${fromDate}/${toDate}`
//       );

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setData(result.data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchData();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           select
//           label="Mobile Number"
//           value={mobileNumber}
//           onChange={(e) => setMobileNumber(e.target.value)}
//           variant="outlined"
//           style={{ marginBottom: '20px', width: '200px' }}
//         >
//           {/* Replace this with your actual mobile number options */}
//           <MenuItem value="mobileNumber1">9879065254</MenuItem>
//           <MenuItem value="mobileNumber2">Mobile Number 2</MenuItem>
//           {/* Add more MenuItem elements as needed */}
//         </TextField>
//         <br />
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="From Date"
//             value={fromDate}
//             onChange={(newValue) => setFromDate(newValue)}
//             renderInput={(params) => <TextField {...params} variant="outlined" />}
//             style={{ marginBottom: '20px', width: '200px' }}
//           />
//           <DatePicker
//             label="To Date"
//             value={toDate}
//             onChange={(newValue) => setToDate(newValue)}
//             renderInput={(params) => <TextField {...params} variant="outlined" />}
//             style={{ marginBottom: '20px', width: '200px' }}
//           />
//         </LocalizationProvider>
//         <br />
//         <Button type="submit" variant="contained" color="primary">
//           Fetch Data
//         </Button>
//       </form>

//       {error && <div>Error: {error}</div>}
//       {!data ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <h2>Total Times</h2>
//           <p>Total Hours: {data.totalHours}</p>
//           <p>Total Days: {data.totalDays}</p>
//           <h3>Individual Totals</h3>
//           <ul>
//             {Object.entries(data.individualTotals).map(([date, time]) => (
//               <li key={date}>{`${date}: ${time}`}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttendanceComponent;



import React, { useState } from 'react';

const YourComponent = () => {
  const [adddocument, setAddDocument] = useState('');
  const [error, setError] = useState(null);

  const handleAddDocument = async () => {
    try {
      const response = await fetch('https://attendance-backend-five.vercel.app/document/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adddocument }),
      });

      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      // Optionally, you can handle the response if needed
      const data = await response.json();
      console.log('Document added successfully:', data);

      // Clear the input field after successful submission
      setAddDocument('');
    } catch (error) {
      setError(error.message || 'An error occurred while adding the document');
    }
  };

  return (
    <div>
      <h1>Add Document</h1>
      <div>
        <label htmlFor="adddocument">Document Content:</label>
        <input
          type="file"
          id="adddocument"
          value={adddocument}
          onChange={(e) => setAddDocument(e.target.value)}
        />
      </div>
      <button onClick={handleAddDocument}>Add Document</button>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default YourComponent;
