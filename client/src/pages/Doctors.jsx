import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { WiTime11 } from "react-icons/wi";
import { RiShieldStarLine } from "react-icons/ri";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState();
  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:3433/api/user/doctorapplications")
        .then((res) => setDoctors(res.data.doctors));
    }
    getData();
  }, [doctors]);

  const handleApprove = async (id) => {
    await axios.post(`http://localhost:3433/api/user/approvedoctor/${id}`);
  };

  return (
    <Container>
      {doctors &&
        doctors.map((doctor, index) => {
          return (
            <div key={index}>
              <h3 onClick={() => navigate(`/doctor/${doctor._id}`)}>
                {doctor.firstName + " " + doctor.lastName}
              </h3>
              <h4>
                <RiShieldStarLine />
                {doctor.specialization}
              </h4>
              <br />
              <p>
                <MdAlternateEmail />
                {doctor.email}
              </p>
              <p>
                <FaPhone />
                {doctor.phone}
              </p>
              <p>
                <WiTime11 />
                {doctor.fromTime} - {doctor.toTime}
              </p>
              <br />
              <button onClick={() => handleApprove(doctor._id)}>
                {doctor.doctorStatus ? "Dismiss" : "Approve"}
              </button>
            </div>
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  /* background-color: red; */

  div {
    padding: 1rem;
    background-color: #e7eaf6;
    display: flex;
    flex-direction: column;

    p,
    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    button {
      padding: 5px 20px;
      color: white;
      background-color: #2a2438;
      outline: none;
      border: none;
      font-weight: 600;
    }
  }
`;

export default Doctors;
