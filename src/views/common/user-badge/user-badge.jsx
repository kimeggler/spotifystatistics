import React from 'react';

function user_badge(user) {
  if (user.user === undefined) {
    return null;
  }
  return (
    <div className='user_badge'>
      <p className='user-name'>{user.user.display_name}</p>
      <img alt={user.img_alt} src={user.img} className='user-image' />
    </div>
  );
}

export default user_badge;
