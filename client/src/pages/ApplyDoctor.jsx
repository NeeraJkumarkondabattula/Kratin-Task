import React, { useState, useEffect } from "react";
import styled from "styled-components";
import medicate from "../assets/Medicate-logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoader, showLoader } from "../redux/alertReducer";

const ApplyDoctor = () => {
  const [user, setUser] = useState();
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fromTime, setWorkingfrom] = useState("");
  const [toTime, setWorkingtoo] = useState("");
  const [lastWorked, setLastworked] = useState("");
  const [feePerConsultation, setFeeperconsultation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post("http://localhost:3433/api/user/applydoctor", {
          experience,
          firstName,
          lastName,
          address,
          lastWorked,
          email,
          feePerConsultation,
          fromTime,
          toTime,
          qualification,
          specialization,
          phone,
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          console.log(res.data);
          setFirstname("");
          setAddress("");
          setEmail("");
          setExperience("");
          setFeeperconsultation("");
          setLastname("");
          setLastworked("");
          setPhone("");
          setQualification("");
          setSpecialization("");
          setWorkingfrom("");
          setWorkingtoo("");
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Application for Doctor Role</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label for="firstName">First Name</label>
          <input
            type="text"
            placeholder="Enter your First Name..."
            value={firstName}
            id="firstName"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Enter your Last Name..."
            value={lastName}
            id="lastName"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="email">Email</label>
          <input
            type="text"
            placeholder="Enter your Email..."
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="firstName">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your Phone Number..."
            value={phone}
            id="phoneNumber"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="firstName">Address</label>
          <input
            type="text"
            placeholder="Enter your Address..."
            value={address}
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="qualification">Qualification</label>
          <input
            type="text"
            placeholder="Enter your Qualification..."
            value={qualification}
            id="qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="experience">Experience</label>
          <input
            type="text"
            placeholder="Enter your experience..."
            value={experience}
            id="experience"
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="specialization">Specialization</label>
          <input
            type="text"
            placeholder="Enter your Specialization..."
            value={specialization}
            id="specialization"
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="lastworked">Last Worked</label>
          <input
            type="text"
            placeholder="Enter your Last Worked..."
            value={lastWorked}
            id="lastworked"
            onChange={(e) => setLastworked(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="feePerConsultation">Fee Per Consultation</label>
          <input
            type="text"
            placeholder="Enter your Fee Per Consultation..."
            value={feePerConsultation}
            id="feePerConsultation"
            onChange={(e) => setFeeperconsultation(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="workfrom">Working Time From</label>
          <input
            type="text"
            placeholder="Enter your Working Time From..."
            value={fromTime}
            id="workfrom"
            onChange={(e) => setWorkingfrom(e.target.value)}
          />
        </div>
        <div className="input">
          <label for="workToo">Working Time Too</label>
          <input
            type="text"
            placeholder="Enter your Working Time Too..."
            value={toTime}
            id="workToo"
            onChange={(e) => setWorkingtoo(e.target.value)}
          />
        </div>

        <button>Apply</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  /* background-color: pink; */
  form {
    display: grid;
    grid-template-columns: 1fr 2fr 3fr 4fr;
    align-items: end;
    gap: 2.4rem;
    input {
      width: 15rem;
      padding: 0.2rem 0.8rem;
    }
    button {
      height: 30px;
      background-color: #2a2438;
      color: white;
    }
  }
`;

export default ApplyDoctor;
