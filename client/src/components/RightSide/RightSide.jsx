import React, { useState } from "react";

import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";

import "./RightSide.css";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="/home">
          <img src={Home} alt="Home" width={24} height={24} />
        </Link>
        <UilSetting />
        <img src={Noti} alt="Notic" />
        <Link to="/chat">
          <img src={Comment} alt="Comment" />
        </Link>
      </div>
      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
