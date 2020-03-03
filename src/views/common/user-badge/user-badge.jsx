import React from "react";
import "_style.css";

function user_badge(img_alt, img, user_name) {
  return (
    <div className="user_badge">
      <p className="user-name">{user_name}</p>
      <img alt={img_alt} src={img} className="user-image" />
    </div>
  );
}

export default user_badge;
