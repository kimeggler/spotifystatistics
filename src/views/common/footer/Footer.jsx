import React from 'react';

import creatorItems from './creator-items';

import './_style.css';

const Footer = () => {
  const mapCreators = creators => {
    return creators.map(creator => {
      return (
        <div className="creator-area">
          <div className="creator-info">
            <img src={creator.image} alt={creator.name} className="creator-image" />
            <p>{creator.name}</p>
          </div>
          {creator.links.map(link => {
            return (
              <a href={link.href} className="footer-link">
                <div className="creator-link">
                  <img
                    src={link.image}
                    alt={`${creator.name} ${link.name}`}
                    className="creator-link-image"
                  />
                  <p className="creator-link-label">{link.name}</p>
                </div>
              </a>
            );
          })}
        </div>
      );
    });
  };

  return <div className="footer">{mapCreators(creatorItems)}</div>;
};

export default Footer;
