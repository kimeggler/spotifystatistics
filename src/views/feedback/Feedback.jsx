import React, { useState } from 'react';
import './style.css';

import { stars } from '../../assets';
import saveFeedback from '../../services/firebaseService';
import { ShowAt } from '../common';

function Feedback() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <div className="landingpage">
      <div className="landingpage-image" style={{ backgroundImage: `url(${stars})` }}></div>
      <div className="roadmap-area">
        <h3
          className="logo"
          onClick={() => {
            window.location.replace('/');
          }}
        >
          STATFY
        </h3>
        <h1 className="landing-page-title">
          YOUR <span className="landing-page-title-span">FEEDBACK</span>
        </h1>
        <ShowAt breakpoint="smallAndAbove">
          <p className="paragraph">
            What do we need to know? What do you want in the next version of Statfy?
          </p>
        </ShowAt>

        <label>
          Enter email if you want to be updated when the new version of Statfy is online.
        </label>
        <input
          onChange={e => setEmail(e.target.value)}
          type={'text'}
          placeholder="Your email address..."
        ></input>
        <label>Let us know what you like and/or dislike about Statfy in its current state.</label>
        <textarea
          onChange={e => setFeedback(e.target.value)}
          type={'text'}
          style={{ resize: 'vertical' }}
          placeholder="Your feedback..."
        ></textarea>

        <div className="button-group">
          <button
            className="button-primary roadmap-button"
            disabled={feedback.length === 0}
            onClick={async () => {
              await saveFeedback({ email, feedback, creation_date: new Date() });
              window.location.replace('/');
            }}
          >
            Send feedback
          </button>
          <button
            className="button-secondary roadmap-button"
            onClick={() => {
              window.location.replace('/');
            }}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
