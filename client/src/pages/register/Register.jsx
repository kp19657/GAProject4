import "./register.css";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      console.log(password.current.value);
      console.log(passwordAgain.current.value);
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      console.log("passwords match");
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        const res = await axios.post(
          "http://localhost:5001/api/auth/register",
          user
        );
        console.log(res);

        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MagicSocial</h3>
          <span className="loginDesc">
            Share your magic moments with the world!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              type="password"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>

            <div className="orDivider">OR</div>
          </form>
          <div className="loginRegisterButton">
            <a href="http://localhost:3000/login/">
              <button className="loginRegisterButton">
                Log Into An Existing Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
