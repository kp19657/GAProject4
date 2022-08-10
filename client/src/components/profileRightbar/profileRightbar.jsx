import "./rightbar.css";
import axios from "axios";
import Online from "../online/Online";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  console.log("currentUser is");
  console.log(currentUser.username);

  console.log("user.username is");
  console.log(user.username);

  useEffect(() => {
    const getFriends = async () => {
      try {
        console.log("tis user is " + user._id);

        const friendList = await axios.get(
          "http://localhost:5001/api/users/friends/" + user._id
        );
        friendList.data.map((friend) => {
          console.log(friend);
        });
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    // console.log(friends);
  }, [user]);

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
            <span className="birthdayText">
              <b>Margaret Chan</b> and <b>2 other friends</b> have birthdays
              today
            </span>
          </div>
          <h4 className="rightbarTitle">Followers</h4>
          <ul className="rightbarFriendList">
            <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img
                  className="rightbarProfileImg"
                  src={`${PF}person/3.jpg`}
                  alt=" "
                />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">John Lai</span>
            </li>
          </ul>
          <h4 className="rightbarTitle">Your Friends</h4>
          <div className="rightbarFollowing">
            {friends.map((friend) => {
              <div className="rightbarFollowingUser">
                <img
                  src={
                    friend.profilePicture
                      ? PF + `person/${friend.profilePicture}`
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
