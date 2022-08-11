import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5001/api/users/${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // setting res to the user that wrote the post, identified by post.userId
  //     const res = await axios.get(
  //       `http://localhost:5001/api/users/userId=${post.userId}`
  //     );
  //     setUser(res.data);
  //   };
  //   fetchUser();
  //   console.log(user);
  // }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:5001/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = () => {
    try {
      axios.delete("http://localhost:5001/api/posts/delete/" + post._id, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const openEditHandler = () => {
    console.log("edit clicked");
    setIsEditing(isEditing ? false : true);
  };

  const submitChange = async () => {
    console.log("change submited");
    const editedPost = { desc: editRef.current.value };
    try {
      await axios.put(
        "http://localhost:5001/api/posts/update/" + post._id,
        editedPost
      );
    } catch (err) {
      console.log(err);
    }
    console.log(editedPost);
    setIsEditing(isEditing ? false : true);
    window.location.reload();
  };

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link
                to={`profile/${user.username}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? PF + `person/${user.profilePicture}`
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="postUsername">{user.username}</span>
              </Link>
              <span className="postDate">posted {format(post.createdAt)}</span>
              <h4>{post._id}</h4>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
            </div>
          </div>
          <div className="postCenter">
            {isEditing ? (
              <div>
                <input
                  className="submitChangeInput"
                  defaultValue={post?.desc}
                  ref={editRef}
                />
                <button className="submitChangeButton" onClick={submitChange}>
                  Submit Change
                </button>
              </div>
            ) : (
              <span className="postText">{post?.desc}</span>
            )}
            <img className="postImg" src={PF + post.img} alt="" />
          </div>
          <div className="postBottom"></div>
          <div className="postBottom">
            {/* contain like icon and counters */}
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={`${PF}like.png`}
                onClick={likeHandler}
                alt=""
              />
              <img
                className="likeIcon"
                src={`${PF}heart.png`}
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">
                {like} people like this post
              </span>
            </div>
            {/* contain comments */}
            {/* <div className="postBottomRight">
              <span className="deletePost" onClick={deleteHandler}>
                DELETE
              </span>
              <span className="postCommentText"> 9 comments</span>
            </div> */}
            {currentUser._id === post.userId ? (
              <span className="editPost" onClick={openEditHandler}>
                EDIT
              </span>
            ) : (
              <span></span>
            )}
            {currentUser._id === post.userId ? (
              <span className="deletePost" onClick={deleteHandler}>
                DELETE
              </span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
