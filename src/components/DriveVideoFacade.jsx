import React, { useState } from 'react';

const DriveVideoFacade = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // sz=w800 grabs a reasonably sized thumbnail without being too heavy
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${videoId}&sz=w800`;
  
  // Raw streaming URL bypassing the Drive UI (works for files under 100MB)
  const videoStreamUrl = `https://drive.usercontent.google.com/download?id=${videoId}&export=download`;

  return (
    <div className="drive-video-facade" onClick={() => !isLoaded && setIsLoaded(true)}>
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
        <video 
          src={videoStreamUrl}
          autoPlay
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="facade-iframe"
          style={{ width: '100%', height: '100%', background: '#000', outline: 'none' }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default DriveVideoFacade;
