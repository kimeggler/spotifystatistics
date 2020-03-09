import React from "react";
import "./style.css";
import { authorizeUser } from "../../services/fetchservice";

function overview() {
  return (
    <div className="overview">
      <h1>Los geht's mit deinen Favoriten</h1>
      <button
        onClick={() => {
          window.location.replace(authorizeUser());
        }}
      >
        Authorize
      </button>
    </div>
  );
}

export default overview;
