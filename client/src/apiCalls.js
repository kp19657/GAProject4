import axios from "axios";

export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:5001/api/auth/login",
      userCredentials
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FALIURE", payload: err });
  }
};
