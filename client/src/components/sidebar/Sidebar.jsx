import "./sidebar.css";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Event from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profiles, setProfiles] = useState([]);

  //get all profiles
  useEffect(() => {
    const getAllProfiles = async () => {
      try {
        const profileList = await axios.get(
          "http://localhost:5001/api/users/all/profiles"
        );
        setProfiles(profileList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProfiles();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events </span>
          </li>
        </ul>

        <hr className="sidebarHr" />

        <h4 className="rightbarTitle">All Users:</h4>
        <ul className="rightbarFriendList">
          {profiles.map((profile) => (
            <Link
              to={"/profile/" + profile.username}
              style={{ textDecoration: "none" }}
            >
              <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img
                    className="rightbarProfileImg"
                    src={
                      profile.profilePicture
                        ? PF + `person/${profile.profilePicture}`
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                </div>
                <span className="rightbarUsername">{profile.username}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
