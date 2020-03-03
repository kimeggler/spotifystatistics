import React from "react";
import "./style.css";
import { authorizeUser } from "../../services";

function landingpage() {
  return (
    <div className="overview">
      <h1>Los geht's mit deinen Favoriten</h1>
      <button onClick={authorizeUser}></button>
    </div>
  );
}

export default landingpage;
