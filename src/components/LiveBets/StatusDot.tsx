import React from 'react';

interface StatusProps {
  status: boolean;
}

const StatusDot: React.FC<StatusProps> = ({ status }) => {
  return (
    <div className="status-dot-container">
      <div className={!status ? 'status-dot-offline' : 'status-dot'} />
    </div>
  );
};
export default StatusDot;
