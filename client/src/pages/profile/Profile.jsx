import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Feedprofile from "../../components/feedProfile/Feedprofile";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://localhost:5001/api/users/pfl/" + username
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(
  //       `http://localhost:5001/api/users/${post.userId}`
  //     );
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

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
