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
      const res = await axios.get(
        "http://localhost:5001/api/posts/profile/" + username
      );
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
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
