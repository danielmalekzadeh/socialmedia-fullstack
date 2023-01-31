import React, { useState } from "react";

import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePosts } from "../../api/PostApi";

const Post = ({ data, id }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePosts(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <div className="Post" key={id}>
      {data?.image && (
        <img
          src={
            data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
          }
          alt="img"
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
        />
      )}
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt="Like"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="Comment" />
        <img src={Share} alt="Share" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} Likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
