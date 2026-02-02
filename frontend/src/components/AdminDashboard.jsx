import { useState, useEffect, useCallback } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [siteVisits, setSiteVisits] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, enquiriesRes, visitsRes, subsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`),
        fetch(`${API_URL}/api/admin/enquiries`),
        fetch(`${API_URL}/api/admin/site-visits`),
        fetch(`${API_URL}/api/admin/newsletter`),
      ]);

      const statsData = await statsRes.json();
      const enquiriesData = await enquiriesRes.json();
      const visitsData = await visitsRes.json();
      const subsData = await subsRes.json();

      if (statsData.success) setStats(statsData.data);
      if (enquiriesData.success) setEnquiries(enquiriesData.data);
      if (visitsData.success) setSiteVisits(visitsData.data);
      if (subsData.success) setSubscribers(subsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const updateEnquiryStatus = async (id, status, notes = '') => {
    try {
      const response = await fetch(`${API_URL}/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAllData();
      }
    } catch (error) {
      console.error('Error updating enquiry:', error);
    }
  };

  const updateVisitStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/site-visits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAllData();
      }
    } catch (error) {
      console.error('Error updating visit:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      new: '#2196f3',
      contacted: '#ff9800',
      converted: '#4caf50',
      closed: '#9e9e9e',
      pending: '#ff9800',
      confirmed: '#2196f3',
      completed: '#4caf50',
      cancelled: '#f44336',
    };
    return (
      <span className="status-badge" style={{ background: colors[status] || '#9e9e9e' }}>
        {status}
      </span>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>🏠 Homesca</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={activeTab === 'enquiries' ? 'active' : ''}
            onClick={() => setActiveTab('enquiries')}
          >
            📩 Enquiries
          </button>
          <button
            className={activeTab === 'visits' ? 'active' : ''}
            onClick={() => setActiveTab('visits')}
          >
            🗓️ Site Visits
          </button>
          <button
            className={activeTab === 'subscribers' ? 'active' : ''}
            onClick={() => setActiveTab('subscribers')}
          >
            📧 Newsletter
          </button>
        </nav>

        <div className="admin-user">
          <p>👤 {admin?.name || 'Admin'}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'enquiries' && 'All Enquiries'}
            {activeTab === 'visits' && 'Site Visit Requests'}
            {activeTab === 'subscribers' && 'Newsletter Subscribers'}
          </h1>
          <button onClick={fetchAllData} className="refresh-btn">
            🔄 Refresh
          </button>
        </header>

        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : (
          <div className="admin-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="overview-grid">
                <div className="stat-card">
                  <div className="stat-icon">📩</div>
                  <div className="stat-info">
                    <h3>{stats.totalEnquiries}</h3>
                    <p>Total Enquiries</p>
                  </div>
                </div>
                <div className="stat-card highlight">
                  <div className="stat-icon">🆕</div>
                  <div className="stat-info">
                    <h3>{stats.newEnquiries}</h3>
                    <p>New Enquiries</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🗓️</div>
                  <div className="stat-info">
                    <h3>{stats.totalSiteVisits}</h3>
                    <p>Site Visits</p>
                  </div>
                </div>
                <div className="stat-card highlight">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <h3>{stats.pendingVisits}</h3>
                    <p>Pending Visits</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📧</div>
                  <div className="stat-info">
                    <h3>{stats.totalSubscribers}</h3>
                    <p>Subscribers</p>
                  </div>
                </div>
              </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === 'enquiries' && (
              <div className="data-table-container">
                {enquiries.length === 0 ? (
                  <p className="no-data">No enquiries yet</p>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((enq) => (
                        <tr key={enq.id}>
                          <td>{enq.id}</td>
                          <td>{enq.name}</td>
                          <td>
                            <a href={`mailto:${enq.email}`}>{enq.email}</a>
                          </td>
                          <td>
                            <a href={`tel:${enq.phone}`}>{enq.phone}</a>
                          </td>
                          <td className="message-cell">{enq.message || '-'}</td>
                          <td>{enq.enquiry_type}</td>
                          <td>{getStatusBadge(enq.status)}</td>
                          <td>{formatDate(enq.created_at)}</td>
                          <td>
                            <select
                              value={enq.status}
                              onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Site Visits Tab */}
            {activeTab === 'visits' && (
              <div className="data-table-container">
                {siteVisits.length === 0 ? (
                  <p className="no-data">No site visit requests yet</p>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Preferred Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Requested On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteVisits.map((visit) => (
                        <tr key={visit.id}>
                          <td>{visit.id}</td>
                          <td>{visit.name}</td>
                          <td>
                            <a href={`mailto:${visit.email}`}>{visit.email || '-'}</a>
                          </td>
                          <td>
                            <a href={`tel:${visit.phone}`}>{visit.phone}</a>
                          </td>
                          <td>{visit.preferred_date ? new Date(visit.preferred_date).toLocaleDateString('en-IN') : '-'}</td>
                          <td>{visit.preferred_time || '-'}</td>
                          <td>{getStatusBadge(visit.status)}</td>
                          <td>{formatDate(visit.created_at)}</td>
                          <td>
                            <select
                              value={visit.status}
                              onChange={(e) => updateVisitStatus(visit.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Newsletter Subscribers Tab */}
            {activeTab === 'subscribers' && (
              <div className="data-table-container">
                {subscribers.length === 0 ? (
                  <p className="no-data">No subscribers yet</p>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Subscribed On</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub) => (
                        <tr key={sub.id}>
                          <td>{sub.id}</td>
                          <td>
                            <a href={`mailto:${sub.email}`}>{sub.email}</a>
                          </td>
                          <td>{formatDate(sub.subscribed_at)}</td>
                          <td>
                            <span className={`status-badge ${sub.is_active ? 'active' : 'inactive'}`}>
                              {sub.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
