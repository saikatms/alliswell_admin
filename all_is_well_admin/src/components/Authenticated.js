import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";

const Authenticated = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  if (props.nonAuthenticated) {
    if (loggedIn == null) {
      return "Loading...";
    } else if (!loggedIn) {
      return props.children;
    } else if (loggedIn) {
      return <Redirect to="/" />;
    }
  } else {
    if (loggedIn == null) {
      return "Loading...";
    } else if (loggedIn) {
      return props.children;
    } else if (!loggedIn) {
      return <Redirect to="/login" />;
    }
  }
};

export default Authenticated;
