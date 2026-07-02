import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const DriveVideoFacade = ({ videoId, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    // We use Google Drive's undocumented thumbnail endpoint
    // It returns a high-res thumbnail of the video instantly without CORS issues
    const thumbUrl = `https://drive.google.com/thumbnail?id=${videoId}&sz=w1280-h720`;
    setThumbnailUrl(thumbUrl);
  }, [videoId]);

  // The Google Drive preview iframe URL
  const iframeUrl = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1`;

  const handlePlay = () => setIsPlaying(true);
  const handleClose = () => setIsPlaying(false);

  // Close on escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsPlaying(false);
    };
    if (isPlaying) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isPlaying]);

  return (
    <>
      <div className="drive-video-facade" onClick={handlePlay}>
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={`Thumbnail for ${title}`} 
            className="facade-thumbnail"
            loading="lazy"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b' }}>
            <span style={{ color: '#94a3b8' }}>Loading...</span>
          </div>
        )}
        
        <div className="play-button-overlay">
          <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {isPlaying && createPortal(
        <div className="video-lightbox-overlay" onClick={handleClose}>
          <div className="video-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="video-lightbox-close" onClick={handleClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="video-lightbox-iframe-wrapper">
              <iframe 
                src={iframeUrl} 
                title={title || 'Student Video Review'}
                allow="autoplay; fullscreen"
                allowFullScreen 
                className="facade-iframe"
                frameBorder="0"
              ></iframe>
              {/* Security Overlay: Blocks clicks on the top Google Drive buttons */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '60px',
                  background: 'transparent',
                  zIndex: 10
                }}
                title="External links disabled"
              ></div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default DriveVideoFacade;
