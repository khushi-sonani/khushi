import React from 'react';
import './bank.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

class bank extends React.Component {
  constructor() {
    
    super();
    this.state = {
      fields: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  }

  async submituserRegistrationForm (e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {
        bankName: '',
        holdername: '',
        ifsccode: '',
        accountNumber: '',
      };
      this.setState({ fields });

      // Prepare the data to send in the POST request
      const postData = {
        bankName: this.state.fields.bankName,
        holdername: this.state.fields.holdername,
        ifsccode: this.state.fields.ifsccode,
        accountNumber: this.state.fields.accountNumber,
      };

      try {
      
        const response = await axios.post('https://attendance-backend-five.vercel.app/empbankdetail/bank', postData);

        // Handle the API response data here
        console.log('API Response:', response.data);
        alert('Form submitted successfully'); // You can replace this with your own logic
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form'+error);
      }
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields['bankName']) {
      formIsValid = false;
      errors['bankName'] = '*Please enter your Bank name.';
    }

    if (!fields['holdername']) {
      formIsValid = false;
      errors['holdername'] = '*Please enter holder name.';
    }

    if (!fields['ifsccode']) {
      formIsValid = false;
      errors['ifsccode'] = '*Please enter ifsc code.';
    }

    if (!fields['accountNumber']) {
      formIsValid = false;
      errors['accountNumber'] = '*Please enter your account number.';
    }

    this.setState({
      errors,
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
      <div id="main-registration-container">
        <div id="register">
          <h1>Bank details</h1>
          <form
            method="post"
            name="userRegistrationForm"
            onSubmit={this.submituserRegistrationForm}
          
          >
            <label className="lb">Bank Name</label>
            <input
              type="text"
              className="in"
              name="bankName"
              value={this.state.fields.bankName}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.bankName}</div>

            <label className="lb">Holder Name</label>
            <input
              type="text"
              name="holdername"
              className="in"
              value={this.state.fields.holdername}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.holdername}</div>

            <label className="lb">Ifsc code</label>
            <input
              type="number"
              name="ifsccode"
              className="in"
              value={this.state.fields.ifsccode}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.ifsccode}</div>

            <label className="lb">Account Number</label>
            <input
              type="number"
              name="accountNumber"
              className="in"
              value={this.state.fields.accountNumber}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.accountNumber}</div>

            <div className="footer">
              <Link to="/">
                <Button variant="contained" size="large">
                  cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="btnn"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default bank;
