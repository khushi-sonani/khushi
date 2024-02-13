import React, { useState, useEffect } from 'react';

const AttendanceDetails = () => {
  const [data, setData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `https://attendance-backend-five.vercel.app/punching/attendance/${mobileNumber}/${fromDate}/${toDate}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error:', error.message);
      // Display error directly in the component if needed
      alert('Error fetching data: ' + error.message);
    }
  };
  

  useEffect(() => {
    // Fetch data when component mounts
    handleFetchData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      setMobileNumber(value);
    } else if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch data when the form is submitted
    handleFetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Mobile Number:
          <input type="text" name="mobileNumber" value={mobileNumber} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          From Date:
          <input type="date" name="fromDate" value={fromDate} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          To Date:
          <input type="date" name="toDate" value={toDate} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Fetch Data</button>
      </form>

      {data ? (
        <div>
          {/* Display your data here */}
          <p>Total Time: {data.total}</p>
          <p>Number of Days: {data.numberOfDays}</p>
          {/* Loop through dailyTimeDifferences array and display information */}
          {data.dailyTimeDifferences.map((item) => (
            <div key={item.date}>
              <p>Date: {item.date}</p>
              <p>Time Difference: {item.difference}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttendanceDetails;
