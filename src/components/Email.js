import React from "react";
// import auth from "./Auth";

function Email(props) {
  console.log(props);
  async function sendMail(e) {
    e.preventDefault();
    if (!formData.jwt) {
      formData.jwt = await props.auth.currentUser.refreshToken;
    }

    const url = "//localhost:1234/test";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ...formData,
        accessToken: props.accessToken,
        from: props.auth.currentUser.email,
      }),
    });
    const json = await res.json();
    console.log(json);
  }
  let formData = {};

  function changeHandler(e) {
    formData[e.target.name] = e.target.value;
  }

  return (
    <div>
      <form action="" onSubmit={sendMail}>
        <input type="text" name="to" onChange={changeHandler} />
        <input type="text" name="subject" onChange={changeHandler} />
        <input type="text" name="message" onChange={changeHandler} />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default Email;
