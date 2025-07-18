import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../user/Books.css';
import './Assignments.css';
import Loader from '../../components/common/Loader';
import AssignmentDetailsModal from '../../components/common/AssignmentDetailsModal';
const Assignments = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchAssignments();
  }, []);
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = assignments.filter(item => {
      return (
        item?.assetId?.assetName?.toLowerCase().includes(lowercasedFilter) ||
        item?.assetId?.serialNumber?.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredAssignments(filteredData);
  }, [searchTerm, assignments]);
  const fetchAssignments = () => {
    setLoading(true);
    axios.get(`${apiUrl}/api/v1/assignAsset/getAllAssignments`, { withCredentials: true })
      .then(res => {
        setAssignments(res?.data?.assignments || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching assignments:", err);
        setError('Failed to fetch assignments.');
        setLoading(false);
      });
  };
  const handleReturnAsset = (serialNumber) => {
    axios.post(`${apiUrl}/api/v1/assignAsset/recordAssetReturn/${serialNumber}`, {}, { withCredentials: true })
      .then(res => {
        fetchAssignments();
        setShowDetailsModal(false);
      })
      .catch(err => {
        console.error("Error returning asset:", err);
        setError(err.response?.data?.message || 'Failed to return asset.');
      });
  };
  const handleShowDetailsModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };
  if (loading) {
    return (
      <div className="books-container">
        <Sidebar />
        <main className="books-main-content">
          <Loader />
        </main>
      </div>
    );
  }
  return (
    <div className="books-container">
      <Sidebar />
      <main className="books-main-content">
        <header className="books-header">
          <h2>Asset Assignments</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Search by Asset Name or S/No.."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        {error && <p className="error">{error}</p>}
        <section className="assignments-section">
          {filteredAssignments.length > 0 ? (
            <div className="assignments-grid">
              {filteredAssignments.map((item) => (
                <div key={item._id} className="assignment-card" onClick={() => handleShowDetailsModal(item)}>
                  <div className="card-header">
                    <h4 className="asset-name">{item.assetId.assetName}</h4>
                  </div>
                  <div className="card-body">
                    <p className="user-info">Assigned to: <strong>{item.userId.name}</strong></p>
                    <p className="date-info">On: {new Date(item.assignedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-assignments-message">No assignments found matching your search.</p>
          )}
        </section>
        {showDetailsModal && selectedAssignment && (
          <AssignmentDetailsModal
            selectedAssignment={selectedAssignment}
            onClose={() => setShowDetailsModal(false)}
            onMarkReturned={handleReturnAsset}
          />
        )}

      </main>
    </div>
  );
};
export default Assignments;