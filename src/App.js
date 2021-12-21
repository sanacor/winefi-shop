import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';
import SignIn from './containers/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Profile from './containers/Profile';


function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser({ "ID" : "user", "PWD" : "TEST" });

  return (
    <div style={{ padding: '30px' }}>
    <BrowserRouter>
      <header>
        <h1>Wine-Fi 가맹점 페이지</h1>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </header>
      <hr />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<SignIn />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route path="/*" component={NotFound} />
        </Routes>
      </main>
    </BrowserRouter>
    </div>

    
  );
}
export default App;
