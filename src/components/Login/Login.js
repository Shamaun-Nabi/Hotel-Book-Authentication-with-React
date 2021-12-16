import React, { useContext } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/auth";
import firebase from "firebase/app";
import { UserContext } from "../../App";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

// import { getAuth, signInWithPopup } from "firebase/auth";

initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  var provider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email: email };
        console.log(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={googleSignIn}>Sign In</button>
    </div>
  );
};

export default Login;
