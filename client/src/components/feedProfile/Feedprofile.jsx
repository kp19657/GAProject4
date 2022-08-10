import "./feedprofile.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // getting posts for the feed
  useEffect(() => {
    const fetchPosts = async () => {
      const res =
        // username
        //   ?
        await axios.get("http://localhost:5001/api/posts/profile/" + username);
      // :await axios.get("http://localhost:5001/api/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <h2>{user.username}</h2>
      <h2>{user.email}</h2>
      <h2>{user._id}</h2>
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {/* <Share /> */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
