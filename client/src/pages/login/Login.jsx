import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? "Loading" : "Log In"}
            </button>
            <div className="orDivider">OR</div>
          </form>
          <div className="loginRegisterButton">
            <a href="http://localhost:3000/register/">
              <button className="loginRegisterButton">
                Create New Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
