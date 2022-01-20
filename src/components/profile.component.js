import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import parseJwt from "../helpers/JWTParser";

function Profile(props) {
  const { user } = useSelector((state) => state.loginSlice );
  const [info1, info2] = parseJwt(user.access_token);
  console.log(info1, info2);

  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div className="container">
      <p>
          <strong>Access Token:</strong> {user.access_token}
          <br/>
          {JSON.stringify(info1)}
          <br/>
          {JSON.stringify(info2)}
          <br/>
          <strong>Refresh Token:</strong> {user.refresh_token} 
        </p>
    </div>
  );
  /*
  return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.access_token.substring(0, 20)} ...{" "}
          {currentUser.access_token.substr(currentUser.access_token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
    */
}

export default Profile;