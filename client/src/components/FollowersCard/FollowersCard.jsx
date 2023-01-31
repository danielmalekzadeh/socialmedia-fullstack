import React from "react";

import "./FollowersCard.css";
import { Followers } from "../../data/FollowersData";
import User from "../User/User";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../api/UserRequest.js";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUsers();
      setPersons(data.users);
    };
    fetchPerson();
  }, []);
  return (
    <div className="FollowerCard" style={{ width: "100%" }}>
      <h3>People my you know</h3>
      {persons?.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
