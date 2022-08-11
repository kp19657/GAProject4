import "./share.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LabelIcon from "@mui/icons-material/Label";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      username: user.username,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:5001/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("http://localhost:5001/api/posts/create", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + `person/${user.profilePicture}`
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder="What's your magic moment?"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <AddAPhotoIcon className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            {/* <div className="shareOption">
              <AddLocationAltIcon className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div> */}
            <div className="shareOption">
              <AddReactionIcon className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
