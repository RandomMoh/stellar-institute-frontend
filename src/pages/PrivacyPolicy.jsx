import React, { useState, useEffect } from 'react';
import './Pages.css';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || '/api';
    fetch(`${API}/pages?slug=privacy-policy`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setContent(data.content || '');
        setLoading(false);
      })
      .catch(() => {
        setContent('');
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container page-content-container">
      <div className="container">
        <h1 className="page-title text-center">Privacy Policy</h1>
        <div className="page-content-box">
          {loading ? (
            <p className="text-center">Loading Privacy Policy...</p>
          ) : content ? (
            <div 
              className="rich-text-content" 
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          ) : (
            <div className="empty-policy-state text-center">
              <p>The Privacy Policy is currently being updated. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
