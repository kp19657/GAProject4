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
  const [followers, setFollowers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  //get all profiles that the logged in user is following
  useEffect(() => {
    const getFriends = async () => {
      try {
        console.log("tis user is " + user._id);

        const friendList = await axios.get(
          "http://localhost:5001/api/users/friends/" + user._id
        );
        console.log("friendList", friendList);
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

  //get all followers of the logged in user
  useEffect(() => {
    const getFollowers = async () => {
      try {
        console.log("tis user is " + user._id);

        const followersList = await axios.get(
          "http://localhost:5001/api/users/followers/" + user._id
        );
        console.log("followersList", followersList);
        followersList.data.map((follower) => {
          console.log(follower);
        });
        setFollowers(followersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
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
          <h4 className="rightbarTitle">Your Followers:</h4>
          <ul className="rightbarFriendList">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <li className="rightbarFriend">
                  <div className="rightbarProfileImgContainer">
                    <img
                      className="rightbarProfileImg"
                      src={
                        friend.profilePicture
                          ? PF + `person/${friend.profilePicture}`
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <span className="rightbarUsername">{friend.username}</span>
                </li>
              </Link>
            ))}
          </ul>

          <h4 className="rightbarTitle">You Are Following:</h4>
          <ul className="rightbarFriendList">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <li className="rightbarFriend">
                  <div className="rightbarProfileImgContainer">
                    <img
                      className="rightbarProfileImg"
                      src={
                        friend.profilePicture
                          ? PF + `person/${friend.profilePicture}`
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <span className="rightbarUsername">{friend.username}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
