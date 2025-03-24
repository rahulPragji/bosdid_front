import React from 'react';

interface Beneficiary {
  id: string;
  name: string;
  surname: string;
  identityNumber: string;
  university: string;
  accumulatedTotal: number;
  yearOfCompletion: number;
  taxNumber: string;
}

interface BeneficiaryModalProps {
  beneficiary: Beneficiary;
  onClose: () => void;
  onMakeEligible: (id: string) => Promise<void>;
}

const BeneficiaryModal: React.FC<BeneficiaryModalProps> = ({
  beneficiary,
  onClose,
  onMakeEligible,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleMakeEligible = async () => {
    setIsLoading(true);
    try {
      await onMakeEligible(beneficiary.id);
      onClose();
    } catch (error) {
      console.error('Failed to make beneficiary eligible:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Beneficiary Details</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
            ×
          </button>
        </div>

        <div className="mb-3">
          <strong>Name:</strong> {beneficiary.name} {beneficiary.surname}
        </div>
        <div className="mb-3">
          <strong>Identity Number:</strong> {beneficiary.identityNumber}
        </div>
        <div className="mb-3">
          <strong>University:</strong> {beneficiary.university}
        </div>
        <div className="mb-3">
          <strong>Accumulated Total:</strong> BWP {beneficiary.accumulatedTotal.toLocaleString()}
        </div>
        <div className="mb-3">
          <strong>Year of Completion:</strong> {beneficiary.yearOfCompletion}
        </div>
        <div className="mb-3">
          <strong>Tax Number:</strong> {beneficiary.taxNumber}
        </div>

        <button
          onClick={handleMakeEligible}
          disabled={isLoading}
          className="w-100"
        >
          {isLoading ? 'Processing...' : 'Make Eligible to Pay'}
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryModal; 