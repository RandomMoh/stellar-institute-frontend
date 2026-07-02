import React from 'react';
import './Pages.css';
import './PrivacyPolicy.css';
import { privacyPolicyHtml } from '../data/privacyPolicyHtml';

export default function PrivacyPolicy() {
  return (
    <div className="page-container page-content-container">
      <div className="container">
        <h1 className="page-title text-center">Privacy Policy</h1>
        <div className="page-content-box" style={{ padding: '0', overflow: 'hidden' }}>
          <div
            className="rich-text-content google-doc-container"
            dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
            style={{ 
              maxWidth: '100%', 
              overflowX: 'auto',
              backgroundColor: '#fff',
              color: '#000',
              padding: '20px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
