import React from "react";

import "./TrendCard.css";
import { TrendData } from "../../data/TrendData";

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>
      {TrendData.map((trend, idx) => (
        <div className="trend" key={idx}>
          <span>#{trend.name}</span>
          <span>{trend.shares}K shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
