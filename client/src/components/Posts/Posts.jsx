import React from "react";

import Post from "../Post/Post";

import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postAction.js";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts) return "no posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, idx) => <Post data={post} id={idx} key={idx} />)}
    </div>
  );
};

export default Posts;
