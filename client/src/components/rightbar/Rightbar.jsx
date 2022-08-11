import "./rightbar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);

  //get all profiles that the logged in user is following
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:5001/api/users/friends/" + user._id
        );
        // friendList.data.map((friend) => {
        //   console.log(friend);
        // });
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  //get all followers of the logged in user
  useEffect(() => {
    const getFollowers = async () => {
      try {
        console.log("tis user is " + user._id);

        const followersList = await axios.get(
          "http://localhost:5001/api/users/followers/" + user._id
        );
        // followersList.data.map((follower) => {
        //   console.log(follower);
        // });
        setFollowers(followersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
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
          <h4 className="rightbarTitle">Followers:</h4>
          <ul className="rightbarFriendList">
            {followers.map((follower) => (
              <Link
                to={"/profile/" + follower.username}
                style={{ textDecoration: "none" }}
              >
                <li className="rightbarFriend">
                  <div className="rightbarProfileImgContainer">
                    <img
                      className="rightbarProfileImg"
                      src={
                        follower.profilePicture
                          ? PF + `person/${follower.profilePicture}`
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <span className="rightbarUsername">{follower.username}</span>
                </li>
              </Link>
            ))}
          </ul>

          <h4 className="rightbarTitle">Is Following:</h4>
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
