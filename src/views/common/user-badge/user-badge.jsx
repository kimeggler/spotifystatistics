import React from 'react';

import { user_icon } from '../../../assets';

import './style.css';
import { logout } from '../../../helper/authenticationhelper';

function user_badge(user) {
  if (user.user === undefined) {
    return null;
  }

  return (
    <div className='user_badge'>
      <img alt={user.img_alt} src={user.user.images[0] === undefined ? user_icon : user.user.images[0].url} className='user_image' />
      <div className='user_information'>
        <p className='user_name'>{user.user.display_name}</p>
        <p className='logout_button' onClick={() => logout()}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default user_badge;
