import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileModal from "../ProfileModal/ProfileModal";
import { UilPen } from "@iconscout/react-unicons";
import { useEffect } from "react";

import "./InfoCard.css";

import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction.js";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogout = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const userProfile = await UserApi.getUser(profileUserId);
        setProfileUser(userProfile);
      }
    };
    fetchProfileUser();
  }, [user]);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId && (
          <>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </>
        )}
      </div>
      <div className="info">
        <span>
          <b>status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
