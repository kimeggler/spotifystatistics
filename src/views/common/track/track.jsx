import React from "react";

function track(img_alt, img, artist_name, track_name) {
  return (
    <div className="track">
      <img alt={img_alt} src={img} className="card-image" />
      <p className="image-description bold track-name">{track_name}</p>
      <p className="image-description artist-name">{artist_name}</p>
    </div>
  );
}

export default track;
