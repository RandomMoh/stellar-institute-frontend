import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { itCourses, beautyCourses } from '../data/courses';
import './StellarAdmin.css';

const API = import.meta.env.VITE_API_URL || '/api';
const emptyAnn = {
  title: '', body: '', type: 'popup', priority: 'normal',
  link_url: '', link_text: '', image_url: '',
  is_active: true, start_date: '', end_date: ''
};
const emptyImg = {
  placeholder_key: '', image_url: ''
};

export default function StellarAdmin() {
  const [token, setToken] = useState(sessionStorage.getItem('stellar-admin-token') || '');
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('announcements'); // 'announcements' | 'images'
  const [loading, setLoading] = useState(false);

  // Announcements State
  const [anns, setAnns] = useState([]);
  const [showAnnForm, setShowAnnForm] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [annForm, setAnnForm] = useState(emptyAnn);

  // Images State
  const [websiteImages, setWebsiteImages] = useState([]);
  const [showImgForm, setShowImgForm] = useState(false);
  const [imgForm, setImgForm] = useState(emptyImg);

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }), [token]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [rAnns, rImgs] = await Promise.all([
        fetch(`${API}/admin-announcements`, { headers: headers() }),
        fetch(`${API}/admin-images`, { headers: headers() })
      ]);
      if (rAnns.status === 401) { logout(); return; }
      
      if (rAnns.ok) setAnns(await rAnns.json());
      if (rImgs.ok) setWebsiteImages(await rImgs.json());
    } catch {}
    setLoading(false);
  }, [token, headers]);

  useEffect(() => {
    if (token) {
      const s = sessionStorage.getItem('stellar-admin-user');
      if (s) setUser(JSON.parse(s));
      fetchData();
    }
  }, [token, fetchData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const r = await fetch(`${API}/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const d = await r.json();
      if (d.success) {
        setToken(d.token);
        setUser(d.user);
        sessionStorage.setItem('stellar-admin-token', d.token);
        sessionStorage.setItem('stellar-admin-user', JSON.stringify(d.user));
      } else {
        setLoginError(d.error || 'Login failed');
      }
    } catch {
      setLoginError('Network error');
    }
    setLoginLoading(false);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    sessionStorage.removeItem('stellar-admin-token');
    sessionStorage.removeItem('stellar-admin-user');
  };

  // --- ANNOUNCEMENTS LOGIC ---
  const handleSaveAnn = async (e) => {
    e.preventDefault();
    const method = editingAnn ? 'PUT' : 'POST';
    const payload = editingAnn ? { ...annForm, id: editingAnn.id } : annForm;
    try {
      const r = await fetch(`${API}/admin-announcements`, {
        method, headers: headers(), body: JSON.stringify(payload)
      });
      if (r.ok) {
        setShowAnnForm(false);
        setEditingAnn(null);
        setAnnForm(emptyAnn);
        fetchData();
      } else {
        const d = await r.json();
        alert('Failed to save: ' + (d.error || 'Server error'));
      }
    } catch {
      alert('Network error.');
    }
  };

  const handleDeleteAnn = async (id) => {
    try {
      await fetch(`${API}/admin-announcements`, {
        method: 'DELETE', headers: headers(), body: JSON.stringify({ id })
      });
      setDeleteTarget(null);
      fetchData();
    } catch {}
  };

  const toggleActiveAnn = async (a) => {
    try {
      await fetch(`${API}/admin-announcements`, {
        method: 'PUT', headers: headers(), body: JSON.stringify({ ...a, is_active: !a.is_active })
      });
      fetchData();
    } catch {}
  };

  const openEditAnn = (a) => {
    setAnnForm({
      title: a.title, body: a.body || '', type: a.type, priority: a.priority,
      link_url: a.link_url || '', link_text: a.link_text || '',
      image_url: a.image_url || '', is_active: a.is_active,
      start_date: a.start_date ? a.start_date.split('T')[0] : '',
      end_date: a.end_date ? a.end_date.split('T')[0] : ''
    });
    setEditingAnn(a);
    setShowAnnForm(true);
  };

  // --- IMAGES LOGIC ---
  const handleSaveImg = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API}/admin-images`, {
        method: 'POST', headers: headers(), body: JSON.stringify(imgForm)
      });
      if (r.ok) {
        setShowImgForm(false);
        setImgForm(emptyImg);
        fetchData();
      } else {
        const d = await r.json();
        alert('Failed to save image: ' + (d.error || 'Server error'));
      }
    } catch {
      alert('Network error.');
    }
  };

  const handleDeleteImg = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const r = await fetch(`${API}/admin-images`, {
        method: 'DELETE', headers: headers(), body: JSON.stringify({ id })
      });
      if (r.ok) fetchData();
    } catch {}
  };

  const openEditImg = (i) => {
    setImgForm({ placeholder_key: i.placeholder_key, image_url: i.image_url });
    setShowImgForm(true);
  };

  const handleImageUploadBase64 = (e, formSetter, currentForm) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Max 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        const MAX = 1600; // Increased resolution limit for web backgrounds
        if (w > h && w > MAX) { h *= MAX / w; w = MAX; }
        else if (h > MAX) { w *= MAX / h; h = MAX; }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        formSetter({ ...currentForm, image_url: canvas.toDataURL('image/jpeg', 0.85) });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (!token) return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/stellar_logo.png" alt="Stellar" className="admin-logo" />
          <h2>Admin Panel</h2>
          <p>Sign in to manage Stellar Institute</p>
        </div>
        <form onSubmit={handleLogin}>
          {loginError && <div className="admin-error">{loginError}</div>}
          <div className="admin-field">
            <label>Username</label>
            <input type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} required autoFocus />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
          </div>
          <button type="submit" className="admin-login-btn" disabled={loginLoading}>
            {loginLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="admin-wrapper">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <img src="/stellar_logo.png" alt="Stellar" className="admin-topbar-logo" />
          <div className="admin-tabs">
            <button className={`admin-tab-btn ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>Announcements</button>
            <button className={`admin-tab-btn ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Website Images</button>
          </div>
        </div>
        <div className="admin-topbar-right">
          <Link to="/" className="admin-back-link">← Back to Site</Link>
          <span className="admin-user-name">{user?.name || user?.username}</span>
          <button onClick={logout} className="admin-logout-btn">Log out</button>
        </div>
      </div>

      <div className="admin-content">
        {loading && <div className="admin-loading">Loading…</div>}

        {/* --- ANNOUNCEMENTS TAB --- */}
        {!loading && activeTab === 'announcements' && (
          <>
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-number">{anns.length}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-card stat-active">
                <div className="stat-number">{anns.filter(a => a.is_active).length}</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat-card stat-urgent">
                <div className="stat-number">{anns.filter(a => a.priority === 'urgent' && a.is_active).length}</div>
                <div className="stat-label">Urgent</div>
              </div>
            </div>

            <div className="admin-actions-bar">
              <h2>All Announcements</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={fetchData} className="admin-logout-btn" title="Refresh">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </button>
                <button onClick={() => { setAnnForm(emptyAnn); setEditingAnn(null); setShowAnnForm(true); }} className="admin-add-btn">
                  + New Announcement
                </button>
              </div>
            </div>

            {anns.length === 0 ? (
              <div className="admin-empty">No announcements yet.</div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Priority</th>
                      <th>Schedule</th>
                      <th>Active</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {anns.map(a => (
                      <tr key={a.id} className={!a.is_active ? 'row-inactive' : ''}>
                        <td className="td-title">
                          <strong>{a.title}</strong>
                          {a.body && <span className="td-body-preview">{a.body.substring(0, 60)}{a.body.length > 60 && '…'}</span>}
                        </td>
                        <td><span className={`badge badge-type-${a.type}`}>{a.type}</span></td>
                        <td><span className={`badge badge-priority-${a.priority}`}>{a.priority}</span></td>
                        <td className="td-date">
                          {a.start_date ? new Date(a.start_date).toLocaleDateString('en-PK') : '—'}
                          {' → '}
                          {a.end_date ? new Date(a.end_date).toLocaleDateString('en-PK') : '∞'}
                        </td>
                        <td>
                          <button className={`toggle-btn ${a.is_active ? 'toggle-on' : 'toggle-off'}`} onClick={() => toggleActiveAnn(a)}>
                            <span className="toggle-thumb" />
                          </button>
                        </td>
                        <td className="td-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <button onClick={() => openEditAnn(a)} className="action-btn action-edit" title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button onClick={() => setDeleteTarget(a)} className="action-btn action-delete" title="Delete" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* --- IMAGES TAB --- */}
        {!loading && activeTab === 'images' && (
          <>
            <div className="admin-actions-bar" style={{ marginTop: '20px' }}>
              <div>
                <h2>Website Images</h2>
                <p style={{ color: 'var(--admin-muted)', fontSize: '13px', margin: '4px 0 0 0' }}>Upload high-resolution images. They will be automatically cropped and fitted to placeholders on the website.</p>
              </div>
              <button onClick={() => { setImgForm(emptyImg); setShowImgForm(true); }} className="admin-add-btn">
                + Upload Image
              </button>
            </div>

            <div className="image-grid">
              {websiteImages.length === 0 ? (
                <div className="admin-empty">No website images uploaded yet.</div>
              ) : (
                websiteImages.map(img => (
                  <div key={img.id} className="image-card">
                    <div className="image-card-preview">
                      <img src={img.image_url} alt={img.placeholder_key} />
                    </div>
                    <div className="image-card-info">
                      <div className="image-card-key" title={img.placeholder_key}>{img.placeholder_key}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => openEditImg(img)} className="action-btn action-edit" title="Replace" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => handleDeleteImg(img.id)} className="action-btn action-delete" title="Delete" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* --- ANNOUNCEMENT MODAL --- */}
      {showAnnForm && (
        <div className="admin-modal-overlay" onClick={() => setShowAnnForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingAnn ? 'Edit Announcement' : 'New Announcement'}</h3>
              <button onClick={() => setShowAnnForm(false)} className="admin-modal-close">✕</button>
            </div>
            <form onSubmit={handleSaveAnn} className="admin-modal-form">
              <div className="admin-field">
                <label>Title *</label>
                <input type="text" value={annForm.title} onChange={e => setAnnForm({ ...annForm, title: e.target.value })} required />
              </div>
              <div className="admin-field">
                <label>Body</label>
                <textarea value={annForm.body} onChange={e => setAnnForm({ ...annForm, body: e.target.value })} rows={3} />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Type</label>
                  <select value={annForm.type} onChange={e => setAnnForm({ ...annForm, type: e.target.value })}>
                    <option value="popup">Popup</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label>Priority</label>
                  <select value={annForm.priority} onChange={e => setAnnForm({ ...annForm, priority: e.target.value })}>
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Link URL</label>
                  <input type="url" value={annForm.link_url} onChange={e => setAnnForm({ ...annForm, link_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="admin-field">
                  <label>Link Text</label>
                  <input type="text" value={annForm.link_text} onChange={e => setAnnForm({ ...annForm, link_text: e.target.value })} placeholder="Apply Now" />
                </div>
              </div>
              <div className="admin-field">
                <label>Image (up to 10MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUploadBase64(e, setAnnForm, annForm)} />
                {annForm.image_url && (
                  <div style={{ marginTop: 8, position: 'relative', display: 'inline-block' }}>
                    <img src={annForm.image_url} alt="Preview" style={{ height: 64, borderRadius: 4, border: '1px solid var(--admin-border)' }} />
                    <button type="button" onClick={() => setAnnForm({ ...annForm, image_url: '' })} style={{ position: 'absolute', top: -6, right: -6, background: '#171717', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>
                )}
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Start Date</label>
                  <input type="date" value={annForm.start_date} onChange={e => setAnnForm({ ...annForm, start_date: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>End Date</label>
                  <input type="date" value={annForm.end_date} onChange={e => setAnnForm({ ...annForm, end_date: e.target.value })} />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-checkbox-label">
                  <input type="checkbox" checked={annForm.is_active} onChange={e => setAnnForm({ ...annForm, is_active: e.target.checked })} />
                  Active
                </label>
              </div>
              <div className="admin-modal-actions">
                <button type="button" onClick={() => setShowAnnForm(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">{editingAnn ? 'Save' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- IMAGE UPLOAD MODAL --- */}
      {showImgForm && (
        <div className="admin-modal-overlay" onClick={() => setShowImgForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Upload Website Image</h3>
              <button onClick={() => setShowImgForm(false)} className="admin-modal-close">✕</button>
            </div>
            <form onSubmit={handleSaveImg} className="admin-modal-form">
              <div className="admin-field">
                <label>Placeholder Key *</label>
                <input 
                  type="text" 
                  value={imgForm.placeholder_key} 
                  onChange={e => setImgForm({ ...imgForm, placeholder_key: e.target.value })} 
                  required 
                  placeholder="e.g. Campus Photo, Students Photo" 
                  list="placeholder-suggestions"
                  autoComplete="off"
                />
                <datalist id="placeholder-suggestions">
                  <option value="Hero Slide 1" />
                  <option value="Hero Slide 2" />
                  <option value="Hero Slide 3" />
                  <option value="Campus Photo" />
                  {[...itCourses, ...beautyCourses].map(c => (
                    <option key={c.title} value={c.title} />
                  ))}
                </datalist>
                <p style={{ fontSize: '11px', color: 'var(--admin-muted)', margin: '6px 0 0 0', lineHeight: '1.4' }}>
                  Click the box to select from a list of known placeholders (like <strong>Courses</strong> or <strong>Hero Slides</strong>), or type a custom one.
                </p>
              </div>
              <div className="admin-field">
                <label>Image (up to 10MB)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUploadBase64(e, setImgForm, imgForm)} required={!imgForm.image_url} />
                {imgForm.image_url && (
                  <div style={{ marginTop: 12, position: 'relative', display: 'inline-block', width: '100%' }}>
                    <img src={imgForm.image_url} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                  </div>
                )}
              </div>
              <div className="admin-modal-actions">
                <button type="button" onClick={() => setShowImgForm(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Image</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE ANNOUNCEMENT MODAL --- */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Delete Announcement</h3>
            </div>
            <div className="admin-modal-body">
              <p>Delete "<strong>{deleteTarget.title}</strong>"?</p>
              <p style={{ color: 'var(--admin-muted)', fontSize: 13 }}>This cannot be undone.</p>
            </div>
            <div className="admin-modal-actions">
              <button onClick={() => setDeleteTarget(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => handleDeleteAnn(deleteTarget.id)} className="admin-delete-confirm-btn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
