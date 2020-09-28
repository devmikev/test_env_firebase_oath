import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Email from "./Email";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
});

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://mail.google.com/");

const auth = firebase.auth();

function Auth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  auth.onAuthStateChanged((user) => {
    // console.log("USER_object: ", user);
    // console.log("AuthStateChange: ", !!user);
    setIsSignedIn(!!user);
  });

  async function signIn() {
    const result = await auth.signInWithPopup(provider);
    console.log("result", result);
    setAccessToken(result.credential.accessToken);
  }

  return (
    <div>
      {isSignedIn ? (
        <div>
          <p>Signed in!</p>
          <button onClick={() => auth.signOut()}>Sign out!</button>
          <h1>Welcome {auth.currentUser.displayName}</h1>
          <Email accessToken={accessToken} auth={auth} />
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
}

export default Auth;
