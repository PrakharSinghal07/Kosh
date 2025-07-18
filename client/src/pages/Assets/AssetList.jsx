import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../user/Books.css'; 
import Loader from '../../components/common/Loader';

const AssetList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user, isAdmin } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editedAsset, setEditedAsset] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [actionMenuState, setActionMenuState] = useState({ openId: null, direction: 'down' });
  const [userEmail, setUserEmail] = useState('');
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [repairRemarks, setRepairRemarks] = useState('');
  const [currentAction, setCurrentAction] = useState(''); 
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/asset/assets`, { withCredentials: true });
      setAssets(response?.data?.assets);
      const uniqueCategories = [...new Set(response?.data?.assets?.map(asset => asset.assetCategory))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError('Failed to fetch assets.');
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = assets;
    if (selectedCategory) {
      filtered = filtered.filter(asset => asset?.assetCategory === selectedCategory);
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(asset =>
        (asset.assetName && asset.assetName.toLowerCase().includes(lowercasedQuery)) ||
        (asset.serialNumber && asset.serialNumber.toLowerCase().includes(lowercasedQuery))
      );
    }
    setFilteredAssets(filtered);
  }, [searchQuery, selectedCategory, assets]);

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.actions-dropdown-container')) {
        setActionMenuState({ openId: null, direction: 'down' });
      }
    };
    if (actionMenuState.openId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [actionMenuState.openId]);

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredAssets(assets); 
    } else {
      const filtered = assets.filter(asset => asset?.assetCategory === selectedCategory);
      setFilteredAssets(filtered);
    }
  }, [selectedCategory, assets]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleShowDetailsModal = (asset) => {
    setSelectedAsset(asset);
    setShowDetailsModal(true);
  };

  const handleShowEditModal = (asset) => {
    setSelectedAsset(asset);
    setEditedAsset({ ...asset }); 
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAsset({ ...editedAsset, [name]: value });
  };

  const handleUpdateAsset = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/asset/assets/${editedAsset?._id}`,
        editedAsset,
        { withCredentials: true }
      );
      setAssets(assets.map(asset => 
        asset?._id === editedAsset?._id ? response?.data?.data : asset
      ));
      setShowEditModal(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update asset.');
    }
  };

  const handleDeleteAsset = async () => {
    try {
      await axios.delete(
        `${apiUrl}/api/v1/asset/assets/${selectedAsset?._id}`,
        { withCredentials: true }
      );
      setAssets(assets.filter(asset => asset?._id !== selectedAsset?._id));
      setShowDeleteConfirm(false);
      setShowEditModal(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete asset.');
    }
  };

  const handleShowAssignModal = (asset) => {
    setSelectedAsset(asset);
    setShowAssignModal(true);
    setUserEmail(''); 
    setError(''); 
  };

  const handleAssignAsset = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/assignAsset/recordAssetAssignment/${selectedAsset.serialNumber}`,
        { email: userEmail },
        { withCredentials: true }
      );
      setAssets(assets.map(asset => 
        asset?._id === selectedAsset?._id ? response?.data?.data : asset
      ));
      setShowAssignModal(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to assign asset.');
    }
  };

  const handleAddAsset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/v1/asset/assets`, newAsset, { withCredentials: true });
      setShowAddModal(false);
      fetchAssets(); 
      setNewAsset({});
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add asset. Check console.');
    }
  };

  const handleActionMenuToggle = (event, assetId) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 150; 
    const direction = spaceBelow < dropdownHeight ? 'up' : 'down';
    if (actionMenuState.openId === assetId) {
      setActionMenuState({ openId: null, direction: 'down' }); 
    } else {
      setActionMenuState({ openId: assetId, direction: direction }); 
    }
  };

  const handleShowRepairModal = (action, asset) => {
    setCurrentAction(action);
    setSelectedAsset(asset);
    setRepairRemarks(''); 
    setShowRepairModal(true);
    setActionMenuState({ openId: null, direction: 'down' }); 
  };

  const handleRepairSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      const serialNumber = selectedAsset.serialNumber;
      switch (currentAction) {
        case 'repair':
          endpoint = `${apiUrl}/api/v1/assignAsset/recordAssetRepair/${serialNumber}`;
          break;
        case 'available':
          endpoint = `${apiUrl}/api/v1/assignAsset/recordAssetRepaired/${serialNumber}`;
          break;
        default:
          return;
      }
      const response = await axios.post(endpoint, { remarks: repairRemarks }, { withCredentials: true });
      setAssets(assets.map(asset => 
        asset?._id === selectedAsset?._id ? response?.data?.data : asset
      ));
      setShowRepairModal(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to update asset.`);
    }
  };

  const handleAction = async (action, asset) => {
    try {
      let response;
      switch (action) {
        case 'retire':
          response = await axios.put(
            `${apiUrl}/api/v1/asset/update/${asset?._id}`,
            { status: 'Retired', retiredDate: new Date().toISOString() },
            { withCredentials: true }
          );
          break;
        case 'return':
          response = await axios.put(
            `${apiUrl}/api/v1/asset/update/${asset?._id}`,
            { 
              status: 'Available',
              assignedTo: null,
              lastAssignedDate: null
            },
            { withCredentials: true }
          );
          break;
        default:
          break;
      }
      setAssets(assets.map(a => 
        a?._id === asset?._id ? response?.data?.data : a
      ));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action} asset.`);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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
          <h2>Assets Collection</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Search by name or serial number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select value={selectedCategory} onChange={handleCategoryChange} className="category-filter">
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {isAdmin(user) && (
              <button onClick={() => setShowAddModal(true)} className="add-book-btn">Add New Asset</button>
            )}
          </div>
        </header>
        <section className="books-section">
          <div className="table-container">
            {showConfirmModal && (
              <div className="modal-backdrop">
                <div className="modal-content">
                  <h2>Confirm Action</h2>
                  <p>{confirmMessage}</p>
                  <div className="modal-actions">
                    <button onClick={() => setShowConfirmModal(false)} className="btn-cancel">Cancel</button>
                    <button onClick={() => { confirmAction(); setShowConfirmModal(false); }} className="btn-confirm">Confirm</button>
                  </div>
                </div>
              </div>
            )}
            {showRepairModal && (
              <div className="modal-backdrop">
                <div className="modal-content">
                  <h2>{currentAction === 'repair' ? 'Send for Repair' : 'Mark as Repaired'}</h2>
                  <p>Asset: <strong>{selectedAsset?.assetName}</strong></p>
                  <form onSubmit={handleRepairSubmit}>
                    <div className="form-group">
                      <label htmlFor="remarks">Remarks</label>
                      <textarea
                        id="remarks"
                        value={repairRemarks}
                        onChange={(e) => setRepairRemarks(e.target.value)}
                        placeholder="Add any relevant notes or details..."
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="modal-actions">
                      <button type="button" onClick={() => setShowRepairModal(false)} className="btn-cancel">Cancel</button>
                      <button type="submit" className="btn-confirm">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <table className="books-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Serial No.</th>
                  <th>Status</th>
                  <th>Purchase Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset._id}>
                    <td onClick={() => handleShowDetailsModal(asset)} className="asset-name-clickable">
                      {asset?.assetName}
                    </td>
                    <td>{asset?.assetCategory}</td>
                    <td>{asset?.serialNumber}</td>
                    <td>
                      <span className={`status-badge ${asset?.status === 'Available' ? 'active' : asset?.status === 'Assigned' ? 'assigned' : 'overdue'}`}>
                        {asset?.status}
                      </span>
                    </td>
                    <td>{new Date(asset?.purchaseDate).toLocaleDateString()}</td>
                    <td className="books-actions">
                      <button onClick={() => handleShowEditModal(asset)} className="details-btn">Update</button>
                      <div className="actions-dropdown-container">
                        <button onClick={(e) => handleActionMenuToggle(e, asset._id)} className="actions-btn">
                          Actions ▼
                        </button>
                        {actionMenuState.openId === asset._id && (
                          <div className={`actions-dropdown-menu ${actionMenuState.direction === 'up' ? 'up' : ''}`}>
                            {asset?.status === 'Available' && (
                              <>
                                <button onClick={() => { handleShowAssignModal(asset); setActionMenuState({ openId: null, direction: 'down' }); }}>Assign</button>
                                <button onClick={() => handleShowRepairModal('repair', asset)}>Send for Repair</button>
                                <button onClick={() => handleAction('retire', asset)}>Retire</button>
                              </>
                            )}
                            {asset?.status === 'Under Maintenance' && (
                              <button onClick={() => handleShowRepairModal('available', asset)}>Mark as Repaired</button>
                            )}
                            {asset?.status === 'Assigned' && (
                              <>
                                <button onClick={() => handleAction('return', asset)}>Return</button>
                                <button onClick={() => handleShowRepairModal('repair', asset)}>Send for Repair</button>
                                <button onClick={() => handleAction('retire', asset)}>Retire</button>
                              </>
                            )}
                            {asset?.status === 'Retired' && (
                              <p>No actions available</p>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {showAddModal && (
          <div className="books-modal-overlay">
            <div className="books-modal">
              <h3>Add New Asset</h3>
              <form onSubmit={handleAddAsset}>
                <input type="text" name="assetName" required placeholder="Asset Name" onChange={handleInputChange} />
                <input type="text" name="assetCategory" required placeholder="Category (e.g., Laptop)" onChange={handleInputChange} />
                <input type="text" name="serialNumber" required placeholder="Serial Number" onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" onChange={handleInputChange}></textarea>
                <input type="date" name="purchaseDate" required onChange={handleInputChange} />
                <input type="date" name="warrantyExpiry" onChange={handleInputChange} />
                <input type="number" name="cost" placeholder="Cost" onChange={handleInputChange} />
                {error && <p className="error">{error}</p>}
                <div className="books-modal-buttons">
                  <button type="submit">Create Asset</button>
                  <button type="button" className="cancel" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showEditModal && editedAsset && (
          <div className="books-modal-overlay">
            <div className="books-modal edit-asset-modal">
              <h3>Edit Asset</h3>
              <form onSubmit={handleUpdateAsset}>
                <div className="form-body">
                  <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Asset Name</label>
                    <input type="text" name="assetName" value={editedAsset.assetName} onChange={handleEditInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" name="assetCategory" value={editedAsset.assetCategory} onChange={handleEditInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Cost (₹)</label>
                    <input type="number" name="cost" value={editedAsset.cost || ''} onChange={handleEditInputChange} placeholder="e.g., 50000" />
                  </div>
                  <div className="form-group">
                    <label>Purchase Date</label>
                    <input type="date" name="purchaseDate" value={new Date(editedAsset.purchaseDate).toISOString().split('T')[0]} onChange={handleEditInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Warranty Expiry</label>
                    <input type="date" name="warrantyExpiry" value={editedAsset.warrantyExpiry ? new Date(editedAsset.warrantyExpiry).toISOString().split('T')[0] : ''} onChange={handleEditInputChange} />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea name="assetDescription" value={editedAsset.assetDescription || ''} onChange={handleEditInputChange} rows="3"></textarea>
                  </div>
                </div>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="modal-footer">
                  <button type="button" className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
                  <div className="footer-actions">
                    <button type="button" className="cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDetailsModal && selectedAsset && (
          <div className="books-modal-overlay">
            <div className="books-modal details-modal">
              <h3>{selectedAsset?.assetName}</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{selectedAsset?.assetCategory}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Serial Number</span>
                  <span className="detail-value">{selectedAsset?.serialNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`status-badge ${selectedAsset?.status === 'Available' ? 'active' : selectedAsset?.status === 'Assigned' ? 'assigned' : 'overdue'}`}>{selectedAsset?.status}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Cost</span>
                  <span className="detail-value">₹{selectedAsset?.cost || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Purchase Date</span>
                  <span className="detail-value">{new Date(selectedAsset?.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Warranty Expiry</span>
                  <span className="detail-value">{selectedAsset?.warrantyExpiry ? new Date(selectedAsset?.warrantyExpiry).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Description</span>
                  <p className="detail-description">{selectedAsset?.assetDescription || 'No description provided.'}</p>
                </div>
              </div>
              <div className="modal-footer">
                 <button type="button" className="cancel" onClick={() => setShowDetailsModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="books-modal-overlay">
            <div className="books-modal confirmation-modal">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this asset? This action cannot be undone.</p>
              <div className="books-modal-buttons">
                <button type="button" className="delete-btn-confirm" onClick={handleDeleteAsset}>Yes, Delete</button>
                <button type="button" className="cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {showAssignModal && selectedAsset && (
          <div className="books-modal-overlay">
            <div className="books-modal">
              <h3>Assign Asset</h3>
              <p>Assigning: <strong>{selectedAsset?.assetName}</strong></p>
              <form onSubmit={handleAssignAsset}>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="User's Email Address" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)} 
                />
                {error && <p className="error">{error}</p>}
                <div className="books-modal-buttons">
                  <button type="submit">Assign</button>
                  <button type="button" className="cancel" onClick={() => setShowAssignModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssetList;