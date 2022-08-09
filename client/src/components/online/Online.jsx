import "./online.css";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImgContainer"
          src={PF + user.profilePicture}
          alt=""
        />
      </div>
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
