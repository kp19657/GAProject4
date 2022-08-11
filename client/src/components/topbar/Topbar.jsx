import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { logoutCall } from "../../apiCalls";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleClick = () => {
    logoutCall(dispatch);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MagicSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friends, posts or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
          </div>
        </div>
        <Link
          to={`/profile/${user.username}`}
          style={{ textDecoration: "none" }}
        >
          <div className="profileBlock">
            <img
              src={
                user.profilePicture
                  ? PF + `person/${user.profilePicture}`
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
            {user.username}
          </div>
        </Link>
        <span className="topbarLogout" onClick={handleClick}>
          Sign Out
        </span>
      </div>
    </div>
  );
}
