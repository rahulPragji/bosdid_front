import React from 'react';

interface Beneficiary {
  id: string;
  name: string;
  surname: string;
  identityNumber: string;
  university: string;
  accumulatedTotal: number;
  yearOfCompletion: number;
  taxNumber: string | null;
  imageUrl: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface BeneficiaryModalProps {
  beneficiary: Beneficiary;
  onClose: () => void;
  onContact: () => void;
}

const BeneficiaryModal: React.FC<BeneficiaryModalProps> = ({
  beneficiary,
  onClose,
  onContact,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 'var(--spacing-lg)',
          borderBottom: '2px solid var(--color-brown)',
          paddingBottom: 'var(--spacing-md)'
        }}>
          <h2 style={{ margin: 0, color: 'var(--color-brown)' }}>Beneficiary Details</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.5rem', 
              cursor: 'pointer',
              color: 'var(--color-brown)',
              padding: 'var(--spacing-xs)',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-lg)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'rgba(133, 72, 54, 0.05)',
          borderRadius: '8px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid var(--color-orange)'
          }}>
            <img 
              src={beneficiary.imageUrl} 
              alt={`${beneficiary.name} ${beneficiary.surname}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              color: 'var(--color-brown)',
              marginBottom: 'var(--spacing-sm)',
              fontSize: '1.5rem'
            }}>
              {beneficiary.name} {beneficiary.surname}
            </h3>
            <p style={{ 
              color: 'var(--color-black)',
              fontSize: '1.1rem',
              marginBottom: 'var(--spacing-xs)'
            }}>
              {beneficiary.university}
            </p>
            <p style={{ 
              color: 'var(--color-orange)',
              fontWeight: '600',
              fontSize: '1.2rem'
            }}>
              BWP {beneficiary.accumulatedTotal.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mb-3">
          <strong style={{ color: 'var(--color-brown)' }}>Identity Number:</strong>{' '}
          <span style={{ color: 'var(--color-black)' }}>{beneficiary.identityNumber}</span>
        </div>
        <div className="mb-3">
          <strong style={{ color: 'var(--color-brown)' }}>Year of Completion:</strong>{' '}
          <span style={{ color: 'var(--color-black)' }}>{beneficiary.yearOfCompletion}</span>
        </div>
        <div className="mb-3">
          <strong style={{ color: 'var(--color-brown)' }}>Tax Number:</strong>{' '}
          <span style={{ color: 'var(--color-black)' }}>
            {beneficiary.taxNumber || 'Not yet assigned'}
          </span>
        </div>
        <div className="mb-3">
          <strong style={{ color: 'var(--color-brown)' }}>Email:</strong>{' '}
          <span style={{ color: 'var(--color-black)' }}>{beneficiary.email}</span>
        </div>

        <div className="mb-3">
          <strong style={{ color: 'var(--color-brown)' }}>Address:</strong>{' '}
          <div style={{ color: 'var(--color-black)', marginLeft: 'var(--spacing-md)' }}>
            <div>{beneficiary.address.street}</div>
            <div>{beneficiary.address.city}, {beneficiary.address.postalCode}</div>
            <div>{beneficiary.address.country}</div>
          </div>
        </div>

        <button
          onClick={onContact}
          className="w-100"
          style={{
            marginTop: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)',
            fontSize: '1.1rem',
            backgroundColor: 'var(--color-orange)'
          }}
        >
          Contact Beneficiary
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryModal; 