import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { WiTime11 } from "react-icons/wi";
import { RiShieldStarLine } from "react-icons/ri";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:3433/api/user/users")
        .then((res) => setUsers(res.data.users));
    }
    getData();
  }, []);
  return (
    <Container>
      {users &&
        users.map((user, index) => {
          return (
            <div key={index}>
              <h3 onClick={() => navigate(`/user/${user._id}`)}>{user.name}</h3>
              <h4>
                <RiShieldStarLine />
                {(user.isAdmin && "Admin") ||
                  (user.isUser && "User") ||
                  (user.isDoctor && "Doctor")}
              </h4>
              <br />
              <p>
                <MdAlternateEmail />
                {user.email}
              </p>
              <p>
                <FaPhone />
                {user.phone}
              </p>
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

export default Users;
