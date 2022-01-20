import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { useDispatch } from "react-redux";
//import { login } from "../actions/auth";
import { loginTry} from "../features/auth/loginSlice"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, message } = props;

  const checkBtn = useRef();
  const loginForm = useRef();

  const dispatch = useDispatch();

  const onChangeUsername = e => {
    setUsername(e.target.value)
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const handleLogin = e => {
    e.preventDefault();

    setLoading(true);
    setFcmToken("Test");//TODO FCM 토큰을 받아와야 함
    //this.form.validateAll(); //TODO 구현필요

    dispatch(loginTry({username, password, fcmToken}))
      .then(() => {
        window.history.replaceState('page2', 'Title', '/profile');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form
          onSubmit={handleLogin}
          ref={loginForm}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={checkBtn}
          />
        </Form>
      </div>
    </div>
  );
}

/*
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}
*/

//export default connect(mapStateToProps)(Login);
export default Login;