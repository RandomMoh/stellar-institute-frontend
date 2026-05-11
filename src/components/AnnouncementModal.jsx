import React from 'react';
import './AnnouncementModal.css';

const priorityConfig = {
  urgent: { label: '🔴 URGENT NOTICE', color: '#ef4444', bg: '#fef2f2' },
  important: { label: '🟡 IMPORTANT NOTICE', color: '#f59e0b', bg: '#fffbeb' },
  normal: { label: '🔵 NOTICE', color: '#0ea5e9', bg: '#f0f9ff' }
};

export default function AnnouncementModal({ announcement, onClose }) {
  if (!announcement) return null;

  const config = priorityConfig[announcement.priority] || priorityConfig.normal;

  return (
    <div className="notice-modal-overlay" onClick={onClose}>
      <div className="notice-modal-card" onClick={e => e.stopPropagation()}>
        <div className="notice-modal-stripe" style={{ background: config.color }} />
        <button className="notice-modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="notice-modal-header" style={{ background: config.bg }}>
          <span className="notice-modal-priority" style={{ color: config.color }}>
            {config.label}
          </span>
          <span className="notice-modal-date">
            {new Date(announcement.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {announcement.image_url && (
          <div className="notice-modal-image">
            <img src={announcement.image_url} alt="Announcement Attachment" />
          </div>
        )}

        <div className="notice-modal-body">
          <h2 className="notice-modal-title">{announcement.title}</h2>
          {announcement.body && (
            <div className="notice-modal-text">
              {announcement.body.split('\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}
        </div>

        <div className="notice-modal-actions">
          {announcement.link_url && (
            <a href={announcement.link_url} target="_blank" rel="noreferrer" className="btn btn-primary notice-modal-cta">
              {announcement.link_text || 'View Full Details'} →
            </a>
          )}
          <button onClick={onClose} className="btn btn-secondary notice-modal-dismiss">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
