import React, { useState, useEffect } from 'react';
import './AnnouncementPopup.css';

const priorityConfig = {
  urgent: { label: '🔴 URGENT NOTICE', color: '#ef4444', bg: '#fef2f2' },
  important: { label: '🟡 IMPORTANT NOTICE', color: '#f59e0b', bg: '#fffbeb' },
  normal: { label: '🔵 NOTICE', color: '#0ea5e9', bg: '#f0f9ff' }
};

export default function AnnouncementPopup() {
  const [announcement, setAnnouncement] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(data => {
        const popup = data.find(a => a.type === 'popup' || a.type === 'both');
        if (popup) {
          const dismissedId = sessionStorage.getItem('stellar-popup-dismissed-id');
          if (dismissedId === String(popup.id)) return;

          setAnnouncement(popup);
          setTimeout(() => setVisible(true), 800);
        }
      })
      .catch(() => {});
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (announcement) {
      sessionStorage.setItem('stellar-popup-dismissed-id', String(announcement.id));
    }
    setTimeout(() => setAnnouncement(null), 300);
  };

  if (!announcement) return null;

  const config = priorityConfig[announcement.priority] || priorityConfig.normal;

  return (
    <div className={`popup-overlay ${visible ? 'popup-visible' : ''}`} onClick={dismiss}>
      <div className={`popup-card ${visible ? 'popup-card-visible' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="popup-stripe" style={{ background: config.color }} />
        <button className="popup-close" onClick={dismiss} aria-label="Close">✕</button>

        <div className="popup-header" style={{ background: config.bg }}>
          <span className="popup-priority-label" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>

        {announcement.image_url && (
          <div className="popup-image">
            <img src={announcement.image_url} alt="Announcement" />
          </div>
        )}

        <div className="popup-body">
          <h2 className="popup-title">📢 {announcement.title}</h2>
          {announcement.body && <p className="popup-text">{announcement.body}</p>}
        </div>

        <div className="popup-actions">
          {announcement.link_url && (
            <a href={announcement.link_url} target="_blank" rel="noreferrer" className="btn btn-primary popup-cta">
              {announcement.link_text || 'Learn More'} →
            </a>
          )}
          <button onClick={dismiss} className="btn btn-secondary popup-dismiss">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
