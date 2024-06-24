import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms_condition: false,
    profilecreatedby: "",
    name: "",
    gender: "",

    dateofbirth: "",
    mobile_code: "+91",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const {
      email,
      phone,
      password,
      confirmPassword,
      name,
      gender,
      dateofbirth,
      terms_condition,
    } = formData;
    if (
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !name ||
      !gender ||
      !dateofbirth
    ) {
      return "All fields are required.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (!terms_condition) {
      return "You must agree to the terms and conditions.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://13.50.172.202:3001/v0/registrationForWeb",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOtpSent(true);
      alert("Your One Time Password (OTP) : " + response.data.data);
    } catch (err) {
      setError("An error occurred during registration.");
      console.error(err);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.50.172.202:3001/v0/checkOtpVerificationForWeb",
        {
          email: formData.email,
          email_otp: otp,
        }
      );
      if (response.data.status) {
        alert("Registration and OTP verification successful.");
        setOtpSent(false);
        window.location.pathname = "/";
      } else {
        setError("OTP verification failed.");
      }
    } catch (err) {
      setError("An error occurred during OTP verification.");
    }
  };

  return (
    <div className="registration-form-container">
      {!otpSent ? (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="terms_condition"
                checked={formData.terms_condition}
                onChange={handleChange}
              />
              I agree to the terms and conditions
            </label>
          </div>
          <div>
            <label>Profile Created By:</label>
            <input
              type="text"
              name="profilecreatedby"
              value={formData.profilecreatedby}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="otp-form">
          <h2>Verify OTP</h2>
          <div>
            <label>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
