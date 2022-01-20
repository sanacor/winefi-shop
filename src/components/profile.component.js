import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

function Profile(props) {
  //TODO 현재 state를 제대로 가져오지 못하고 있음. createSlice를 하는 경우에 Immer가 동작하지 않는지 확인 필요.
  console.log("TEST1");
  const { isSignedIn, user } = useSelector((state) => state.loginSlice );
  console.log("TEST2");

  useEffect( () =>{
    console.log("TEST3", isSignedIn);
    console.log("TEST4", user);
  },[]);

  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div className="container">
      <p>
          <strong>Token:</strong> {user.access_token.substring(0, 20)} ...{" "}
          {user.access_token.substr(user.access_token.length - 20)}
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