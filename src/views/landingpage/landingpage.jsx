import React from "react";
import "./style.css";
import { authorizeUser } from "../../services/fetchservice";

function Landingpage() {
  return (
    <div className="overview">
      <div className="login-area">
        <h1>Do you really know what music you listen to?</h1>
        <p>
          With our website you can see what your most listened artist and tracks
          are.
        </p>
        <p>
          You can also create playlists with your favourite tracks directly from
          Statify
        </p>
        <button
          onClick={() => {
            window.location.replace(authorizeUser());
          }}
        >
          Login with Spotify
        </button>
      </div>
      <div className="login-image-area">
        <p>image</p>
      </div>
    </div>
  );
}

export default Landingpage;
