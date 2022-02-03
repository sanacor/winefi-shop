import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './containers/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector } from "react-redux";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from './helpers/history';


import { useDispatch } from "react-redux";
import { setFcmToken } from "./features/auth/loginSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";

function App(props) {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user } = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();

  useEffect(()=>{
    //무슨코드지??
    EventBus.on("logout", () => {
      this.logOut();
    });
    setShowModeratorBoard(true);
    setShowAdminBoard(true);
    return EventBus.remove("logout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const firebaseConfig = {
    apiKey: "AIzaSyDLiZs17HJ2eOQWfiiwuyCXIHW3qJTaGb8",
    authDomain: "winecode-e8f6f.firebaseapp.com",
    projectId: "winecode-e8f6f",
    storageBucket: "winecode-e8f6f.appspot.com",
    messagingSenderId: "441215028866",
    appId: "1:441215028866:web:2ae7755c70a3abfb60ae9b",
    measurementId: "G-CB87P1432X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

  const messaging = getMessaging();//권한 요청

  //토큰 받아오기
  getToken(messaging, { vapidKey: 'BPhtEFWY3qL_As0dwKTWaYSFLYUo4kjz8hlCL7DVD9W9Vnl2v9isqD15th9K4cNWudup0WdUtkeJHs_VomR8Iso' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("currentToken : ", currentToken);
      dispatch(setFcmToken(currentToken));
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

  //포그라운드
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    toast.info(payload.notification.body , {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  });

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {user ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  USER NAME!!
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link">
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        </div>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;