import { useState, useEffect } from 'react';
import './AnnouncementPopup.css';

export default function AnnouncementPopup() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(data => {
        // Show popups for type popup or both
        const popupItems = data.filter(a => a.type === 'popup' || a.type === 'both');
        // Check sessionStorage for dismissed ones
        const stored = JSON.parse(sessionStorage.getItem('dismissed-popups') || '[]');
        setDismissed(stored);
        setAnnouncements(popupItems);
      })
      .catch(() => {});
  }, []);

  const dismiss = (id) => {
    const updated = [...dismissed, id];
    setDismissed(updated);
    sessionStorage.setItem('dismissed-popups', JSON.stringify(updated));
  };

  // Only show announcements that haven't been dismissed
  const visible = announcements.filter(a => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  // Show the top priority one as a banner popup
  const announcement = visible[0];

  const handleClick = () => {
    if (announcement.link_url) {
      window.open(announcement.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  const priorityColors = {
    urgent: { bg: '#dc2626', border: '#b91c1c' },
    important: { bg: '#d97706', border: '#b45309' },
    normal: { bg: 'var(--primary)', border: 'var(--primary-light)' }
  };

  const colors = priorityColors[announcement.priority] || priorityColors.normal;

  return (
    <div className="popup-banner-overlay">
      <div 
        className={`popup-banner ${announcement.link_url ? 'popup-banner-clickable' : ''}`}
        style={{ '--popup-bg': colors.bg, '--popup-border': colors.border }}
        onClick={announcement.link_url ? handleClick : undefined}
        role={announcement.link_url ? 'link' : undefined}
      >
        {/* Close button */}
        <button 
          className="popup-banner-close" 
          onClick={(e) => { e.stopPropagation(); dismiss(announcement.id); }}
          aria-label="Dismiss"
        >
          ✕
        </button>

        {/* Image if present */}
        {announcement.image_url && (
          <div className="popup-banner-image">
            <img src={announcement.image_url} alt="" />
          </div>
        )}

        <div className="popup-banner-content">
          {/* Priority badge */}
          {announcement.priority !== 'normal' && (
            <span className="popup-banner-badge">
              {announcement.priority === 'urgent' ? '🔴 Urgent' : '🟡 Important'}
            </span>
          )}

          <h3 className="popup-banner-title">{announcement.title}</h3>

          {announcement.body && (
            <p className="popup-banner-body">{announcement.body}</p>
          )}

          {announcement.link_url && (
            <span className="popup-banner-link">
              {announcement.link_text || 'Learn More'} →
            </span>
          )}
        </div>

        {/* If there are more announcements, show count */}
        {visible.length > 1 && (
          <div className="popup-banner-more">
            +{visible.length - 1} more
          </div>
        )}
      </div>
    </div>
  );
}
