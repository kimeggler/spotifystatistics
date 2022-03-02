import React, { useState, useEffect } from 'react';
import { fetchMyProfile } from '../../services/spotifyservice';
import { DefaultErrorMessage, Spinner } from '../common';
import './style.css';
import useDataHook from '../../hooks/useDataHook';

function User() {
  let background = {};
  const [userRequest, setUserRequest] = useState(() => () => fetchMyProfile());
  const { data: user, isLoading, hasError } = useDataHook(userRequest);

  if (user && user.images[0]) {
    background = {
      backgroundImage: `url(${user.images[0].url})`,
    };
  }

  useEffect(() => {
    setUserRequest(() => () => fetchMyProfile());
  }, []);

  if (hasError) return <DefaultErrorMessage />;
  if (!user && isLoading !== false) return <Spinner />;

  return (
    <div className="user">
      <h1 className="site-title">About you!</h1>
      <div className="user-image-box">
        <div style={background} className="user-image"></div>
      </div>
      <div className="location">
        <div className="circle-box">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
          <div className="circle c4"></div>
        </div>
        <p>{user?.country}</p>
      </div>
    </div>
  );
}

export default User;
