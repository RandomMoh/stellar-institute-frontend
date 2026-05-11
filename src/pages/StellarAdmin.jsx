import React, { useState, useEffect, useCallback } from 'react';
import './StellarAdmin.css';

const API = '/api';
const empty = { title:'',body:'',type:'both',priority:'normal',link_url:'',link_text:'',is_active:true,start_date:'',end_date:'' };

export default function StellarAdmin() {
  const [token,setToken]=useState(sessionStorage.getItem('stellar-admin-token')||'');
  const [user,setUser]=useState(null);
  const [lf,setLf]=useState({username:'',password:''});
  const [le,setLe]=useState('');
  const [ll,setLl]=useState(false);
  const [anns,setAnns]=useState([]);
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [delC,setDelC]=useState(null);
  const [form,setForm]=useState(empty);

  const hdrs=useCallback(()=>({'Content-Type':'application/json','Authorization':`Bearer ${token}`}),[token]);

  const fetchAnns=useCallback(async()=>{
    if(!token)return;setLoading(true);
    try{const r=await fetch(`${API}/admin-announcements`,{headers:hdrs()});if(r.status===401){logout();return;}setAnns(await r.json());}catch{}
    setLoading(false);
  },[token,hdrs]);

  useEffect(()=>{if(token){const s=sessionStorage.getItem('stellar-admin-user');if(s)setUser(JSON.parse(s));fetchAnns();}},[token,fetchAnns]);

  const handleLogin=async(e)=>{
    e.preventDefault();setLl(true);setLe('');
    try{const r=await fetch(`${API}/admin-login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lf)});
    const d=await r.json();
    if(d.success){setToken(d.token);setUser(d.user);sessionStorage.setItem('stellar-admin-token',d.token);sessionStorage.setItem('stellar-admin-user',JSON.stringify(d.user));}
    else setLe(d.error||'Login failed');}catch{setLe('Network error');}setLl(false);
  };

  const logout=()=>{setToken('');setUser(null);sessionStorage.removeItem('stellar-admin-token');sessionStorage.removeItem('stellar-admin-user');};

  const handleSave=async(e)=>{
    e.preventDefault();const m=editing?'PUT':'POST';const p=editing?{...form,id:editing.id}:form;
    try{const r=await fetch(`${API}/admin-announcements`,{method:m,headers:hdrs(),body:JSON.stringify(p)});
    if(r.ok){setShowForm(false);setEditing(null);setForm(empty);fetchAnns();}}catch{}
  };

  const handleDelete=async(id)=>{try{await fetch(`${API}/admin-announcements`,{method:'DELETE',headers:hdrs(),body:JSON.stringify({id})});setDelC(null);fetchAnns();}catch{}};

  const toggleActive=async(a)=>{try{await fetch(`${API}/admin-announcements`,{method:'PUT',headers:hdrs(),body:JSON.stringify({...a,is_active:!a.is_active})});fetchAnns();}catch{}};

  const openEdit=(a)=>{setForm({title:a.title,body:a.body||'',type:a.type,priority:a.priority,link_url:a.link_url||'',link_text:a.link_text||'',is_active:a.is_active,start_date:a.start_date?a.start_date.split('T')[0]:'',end_date:a.end_date?a.end_date.split('T')[0]:''});setEditing(a);setShowForm(true);};

  const tc=anns.length, ac=anns.filter(a=>a.is_active).length, uc=anns.filter(a=>a.priority==='urgent'&&a.is_active).length;

  if(!token)return(
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header"><img src="/stellar_logo.png" alt="Stellar" className="admin-logo"/><h2>Admin Panel</h2><p>Sign in to manage announcements</p></div>
        <form onSubmit={handleLogin}>
          {le&&<div className="admin-error">{le}</div>}
          <div className="admin-field"><label>Username</label><input type="text" value={lf.username} onChange={e=>setLf({...lf,username:e.target.value})} required autoFocus/></div>
          <div className="admin-field"><label>Password</label><input type="password" value={lf.password} onChange={e=>setLf({...lf,password:e.target.value})} required/></div>
          <button type="submit" className="admin-login-btn" disabled={ll}>{ll?'Signing in...':'Sign In'}</button>
        </form>
      </div>
    </div>
  );

  return(
    <div className="admin-wrapper">
      <div className="admin-topbar"><div className="admin-topbar-left"><img src="/stellar_logo.png" alt="Stellar" className="admin-topbar-logo"/><span className="admin-topbar-title">Announcement Manager</span></div><div className="admin-topbar-right"><span className="admin-user-name">👤 {user?.name||user?.username}</span><button onClick={logout} className="admin-logout-btn">Logout</button></div></div>

      <div className="admin-content">
        <div className="admin-stats"><div className="stat-card"><div className="stat-number">{tc}</div><div className="stat-label">Total</div></div><div className="stat-card stat-active"><div className="stat-number">{ac}</div><div className="stat-label">Active</div></div><div className="stat-card stat-urgent"><div className="stat-number">{uc}</div><div className="stat-label">Urgent</div></div></div>

        <div className="admin-actions-bar"><h2>Announcements</h2><button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} className="admin-add-btn">+ New Announcement</button></div>

        {loading?<div className="admin-loading">Loading...</div>:anns.length===0?<div className="admin-empty"><p>No announcements yet. Create your first one!</p></div>:(
          <div className="admin-table-wrapper"><table className="admin-table"><thead><tr><th>Title</th><th>Type</th><th>Priority</th><th>Date Range</th><th>Active</th><th>Actions</th></tr></thead><tbody>
            {anns.map(a=>(
              <tr key={a.id} className={!a.is_active?'row-inactive':''}>
                <td className="td-title"><strong>{a.title}</strong>{a.body&&<span className="td-body-preview">{a.body.substring(0,60)}...</span>}</td>
                <td><span className={`badge badge-type-${a.type}`}>{a.type}</span></td>
                <td><span className={`badge badge-priority-${a.priority}`}>{a.priority}</span></td>
                <td className="td-date">{a.start_date?new Date(a.start_date).toLocaleDateString('en-PK'):'—'}{' → '}{a.end_date?new Date(a.end_date).toLocaleDateString('en-PK'):'∞'}</td>
                <td><button className={`toggle-btn ${a.is_active?'toggle-on':'toggle-off'}`} onClick={()=>toggleActive(a)}><span className="toggle-thumb"/></button></td>
                <td className="td-actions"><button onClick={()=>openEdit(a)} className="action-btn action-edit" title="Edit">✏️</button><button onClick={()=>setDelC(a)} className="action-btn action-delete" title="Delete">🗑️</button></td>
              </tr>
            ))}
          </tbody></table></div>
        )}
      </div>

      {showForm&&(<div className="admin-modal-overlay" onClick={()=>setShowForm(false)}><div className="admin-modal" onClick={e=>e.stopPropagation()}>
        <div className="admin-modal-header"><h3>{editing?'Edit Announcement':'New Announcement'}</h3><button onClick={()=>setShowForm(false)} className="admin-modal-close">✕</button></div>
        <form onSubmit={handleSave} className="admin-modal-form">
          <div className="admin-field"><label>Title *</label><input type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></div>
          <div className="admin-field"><label>Body</label><textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} rows={3}/></div>
          <div className="admin-field-row">
            <div className="admin-field"><label>Type</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="both">Both</option><option value="popup">Popup Only</option><option value="ticker">Ticker Only</option></select></div>
            <div className="admin-field"><label>Priority</label><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option value="normal">🔵 Normal</option><option value="important">🟡 Important</option><option value="urgent">🔴 Urgent</option></select></div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field"><label>Link URL</label><input type="url" value={form.link_url} onChange={e=>setForm({...form,link_url:e.target.value})} placeholder="https://..."/></div>
            <div className="admin-field"><label>Link Text</label><input type="text" value={form.link_text} onChange={e=>setForm({...form,link_text:e.target.value})} placeholder="Apply Now"/></div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field"><label>Start Date</label><input type="date" value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})}/></div>
            <div className="admin-field"><label>End Date</label><input type="date" value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})}/></div>
          </div>
          <div className="admin-field"><label className="admin-checkbox-label"><input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})}/>Active (visible to public)</label></div>
          <div className="admin-modal-actions"><button type="button" onClick={()=>setShowForm(false)} className="btn btn-secondary">Cancel</button><button type="submit" className="btn btn-primary">{editing?'Save Changes':'Create'}</button></div>
        </form>
      </div></div>)}

      {delC&&(<div className="admin-modal-overlay" onClick={()=>setDelC(null)}><div className="admin-modal admin-modal-sm" onClick={e=>e.stopPropagation()}>
        <div className="admin-modal-header"><h3>Delete Announcement</h3></div>
        <div className="admin-modal-body"><p>Delete "<strong>{delC.title}</strong>"?</p><p style={{color:'#999',fontSize:'13px'}}>This cannot be undone.</p></div>
        <div className="admin-modal-actions"><button onClick={()=>setDelC(null)} className="btn btn-secondary">Cancel</button><button onClick={()=>handleDelete(delC.id)} className="admin-delete-confirm-btn">Delete</button></div>
      </div></div>)}
    </div>
  );
}
