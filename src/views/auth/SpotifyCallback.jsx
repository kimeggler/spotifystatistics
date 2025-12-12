import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { handleSignInCallback } from '../../helper/authenticationhelper';

import './style.css';

function SpotifyCallback() {
  const history = useHistory();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleSignInCallback();
        history.push('/overview');
      } catch (error) {
        console.error('Error processing callback:', error);
        history.push('/');
      }
    };

    processCallback();
  }, [history]);

  return (
    <div className="callback-container">
      <div className="callback-spinner"></div>
      <p>Completing sign in...</p>
    </div>
  );
}

export default SpotifyCallback;
