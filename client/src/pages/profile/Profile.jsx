import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Feedprofile from "../../components/feedProfile/Feedprofile";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user.id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://localhost:5001/api/users/pfl/" + username
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:5001/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:5001/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + `person/${user.coverPicture}`
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + `person/${user.profilePicture}`
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {user.username ? user.username : "user not found"}
              </h4>
              {user.username !== currentUser.username && (
                <button className="profileFollowButton" onClick={handleFollow}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <RemoveIcon /> : <AddIcon />}
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            {user.username ? <Feedprofile username={username} /> : ""}
            {user.username ? <Rightbar user={user} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
}
