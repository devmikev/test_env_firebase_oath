import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
});

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://mail.google.com/");

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  auth.onAuthStateChanged((user) => {
    setIsSignedIn(!!user);
  });

  async function sendMail(e) {
    e.preventDefault();
    if (!formData.jwt) {
      formData.jwt = await auth.currentUser.refreshToken;
    }

    const url = "//localhost:1234/test";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ...formData,
        accessToken,
        from: auth.currentUser.email,
      }),
    });
    const json = await res.json();
    console.log(json);
  }
  let formData = {};

  function changeHandler(e) {
    formData[e.target.name] = e.target.value;
  }

  async function signIn() {
    const result = await auth.signInWithPopup(provider);
    console.log("result", result);
    setAccessToken(result.credential.accessToken);
  }

  return (
    <div className="App">
      {isSignedIn ? (
        <div>
          <p>Signed in!</p>
          <button onClick={() => auth.signOut()}>Sign out!</button>
          <h1>Welcome {auth.currentUser.displayName}</h1>
          <form action="" onSubmit={sendMail}>
            <input type="text" name="to" onChange={changeHandler} />
            <input type="text" name="subject" onChange={changeHandler} />
            <input type="text" name="message" onChange={changeHandler} />
            <button type="submit">Send Email</button>
          </form>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
}

export default App;
