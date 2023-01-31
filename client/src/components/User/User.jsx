import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction.js";

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "img3.png"
          }
          alt={person.name}
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          {/* <span style={{ fontSize: "14px" }}>{person.username}</span> */}
        </div>
      </div>
      <button
        type="button"
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        style={{ cursor: "pointer" }}
        onClick={handleFollow}
      >
        {following ? "Un follow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
