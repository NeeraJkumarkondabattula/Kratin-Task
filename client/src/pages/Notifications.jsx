import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      await axios
        .post("http://localhost:3433/api/user/notifications", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          setNotifications(res.data.notifications);
        });
    }
    getData();
  }, [notifications]);

  const handleNotification = async (id) => {
    await axios
      .post(`http://localhost:3433/api/user/readNotification/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setNotifications(res.data.notifications);
      });
  };

  return (
    <Container>
      {notifications &&
        notifications.map((notification, index) => {
          return (
            <div key={index} className="bar">
              <p
                className="id"
                onClick={() => navigate(`/doctor/${notification}`)}>
                {index + 1} &nbsp; {notification}
              </p>
              <div className="role">
                <FaUserDoctor />
                <p>Application for Doctor Role</p>
              </div>
              <MdOutlineMarkChatRead
                onClick={() => handleNotification(notification)}
              />
            </div>
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .bar {
    padding: 0.7rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #233142;
    color: white;
    font-size: 1rem;
    font-weight: 400;
    .id {
      width: 30%;
    }
    .role {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`;

export default Notifications;
