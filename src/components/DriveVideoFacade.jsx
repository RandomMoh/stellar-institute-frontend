import React, { useState } from 'react';

const DriveVideoFacade = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // sz=w800 grabs a reasonably sized thumbnail without being too heavy
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${videoId}&sz=w800`;
  
  // Autoplay=1 starts the video instantly when the facade is clicked
  const iframeUrl = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1`;

  return (
    <div className="drive-video-facade" onClick={() => setIsLoaded(true)}>
      {!isLoaded ? (
        <>
          <img 
            src={thumbnailUrl} 
            alt={title || 'Student Video Review'} 
            className="facade-thumbnail" 
            loading="lazy" 
          />
          <div className="play-button-overlay">
            <div className="play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <iframe 
          src={iframeUrl} 
          title={title || 'Student Video Review'}
          allow="autoplay"
          allowFullScreen 
          className="facade-iframe"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
};

export default DriveVideoFacade;
