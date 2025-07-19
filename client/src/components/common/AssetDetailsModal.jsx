import React from 'react';
import './AssetDetailsModal.css';

const AssetDetailsModal = ({ selectedAsset, setActiveModal }) => {
  if (!selectedAsset) return null;

  return (
    <div className="books-modal-overlay">
      <div className="books-modal details-modal">
        <h3 className="modal-title">{selectedAsset.assetName}</h3>

        <div className="details-grid">
          <Detail label="Category" value={selectedAsset.assetCategory} color="purple" />
          <Detail label="Serial Number" value={selectedAsset.serialNumber} color="blue" />
          <Detail label="Status" value={selectedAsset.status} color="green" />
          {selectedAsset.status === 'Assigned' && selectedAsset.assignedTo && (
            <Detail label="Assigned To" value={selectedAsset.assignedTo.name} color="blue" />
          )}
          <Detail label="Cost" value={selectedAsset.cost ? `₹${selectedAsset.cost}` : 'N/A'} color="teal" />
          <Detail label="Purchase Date" value={formatDate(selectedAsset.purchaseDate)} color="orange" />
          <Detail label="Warranty Expiry" value={formatDate(selectedAsset.warrantyExpiry)} color="red" />
          <div className="detail-item full-width">
            <span className="detail-label">Description</span>
            <p className="detail-description">{selectedAsset.assetDescription || 'No description provided.'}</p>
          </div>
        </div>


        <div className="modal-footer">
          <button className="close-btn" onClick={() => setActiveModal(null)}>Close</button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, color }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span className={`detail-value color-${color}`}>{value}</span>
  </div>
);

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

export default AssetDetailsModal;
