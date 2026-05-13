import React, { useState, useEffect } from 'react';
import './AnnouncementTicker.css';

const priorityDot = {
  urgent: '🔴',
  important: '🟡',
  normal: '🔵'
};

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(data => {
        const tickerItems = data.filter(a => a.type === 'ticker' || a.type === 'both');
        setAnnouncements(tickerItems);
      })
      .catch(() => {});
  }, []);

  if (announcements.length === 0) return null;

  const items = [...announcements, ...announcements];

  return (
    <div className="ticker-strip">
      <div className="ticker-label">
        <span>📢</span>
      </div>
      <div className="ticker-track">
        <div className="ticker-content">
          {items.map((a, i) => (
            <span key={i} className="ticker-item">
              {a.link_url ? (
                <a href={a.link_url} target="_blank" rel="noreferrer">
                  {priorityDot[a.priority] || '🔵'} {a.title}
                </a>
              ) : (
                <span>{priorityDot[a.priority] || '🔵'} {a.title}</span>
              )}
              <span className="ticker-separator">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
