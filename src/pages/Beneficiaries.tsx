import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BeneficiaryModal from '../components/BeneficiaryModal';

interface Beneficiary {
  id: string;
  name: string;
  surname: string;
  university: string;
  accumulatedTotal: number;
  yearOfCompletion: number;
  identityNumber: string;
  taxNumber: string;
}

const ITEMS_PER_PAGE = 10;

const Beneficiaries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'granted' | 'eligible'>('granted');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Dummy data for demonstration
  const dummyData: Beneficiary[] = [
    {
      id: '1',
      name: 'John',
      surname: 'Doe',
      university: 'University of Botswana',
      accumulatedTotal: 50000,
      yearOfCompletion: 2022,
      identityNumber: '123456789',
      taxNumber: 'TAX123456',
    },
    // Add more dummy data as needed
  ];

  useEffect(() => {
    // Simulate API call
    const fetchBeneficiaries = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await axios.get('/v1/dtef/beneficiaries');
        // setBeneficiaries(response.data);
        
        // Use dummy data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBeneficiaries(dummyData);
      } catch (error) {
        console.error('Failed to fetch beneficiaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMakeEligible = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      // await axios.post(`/v1/dtef/initiate-repayment/${id}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setBeneficiaries(prev =>
        prev.map(ben =>
          ben.id === id
            ? { ...ben, status: 'eligible' }
            : ben
        )
      );
    } catch (error) {
      console.error('Failed to make beneficiary eligible:', error);
      throw error;
    }
  };

  const filteredBeneficiaries = beneficiaries.filter(ben =>
    `${ben.name} ${ben.surname} ${ben.university}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBeneficiaries.length / ITEMS_PER_PAGE);
  const paginatedBeneficiaries = filteredBeneficiaries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>DTEF Beneficiaries</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="card mb-4">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('granted')}
            style={{
              background: activeTab === 'granted' ? 'var(--color-dark-grey)' : 'var(--color-grey)',
            }}
          >
            Granted Accounts
          </button>
          <button
            onClick={() => setActiveTab('eligible')}
            style={{
              background: activeTab === 'eligible' ? 'var(--color-dark-grey)' : 'var(--color-grey)',
            }}
          >
            Eligible to Pay
          </button>
        </div>

        <input
          type="text"
          placeholder="Search beneficiaries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 mb-3"
        />

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {paginatedBeneficiaries.map(beneficiary => (
                <div key={beneficiary.id} className="card">
                  <h3>{beneficiary.name} {beneficiary.surname}</h3>
                  <p>University: {beneficiary.university}</p>
                  <p>Total: BWP {beneficiary.accumulatedTotal.toLocaleString()}</p>
                  <button onClick={() => setSelectedBeneficiary(beneficiary)}>
                    More Details
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedBeneficiary && (
        <BeneficiaryModal
          beneficiary={selectedBeneficiary}
          onClose={() => setSelectedBeneficiary(null)}
          onMakeEligible={handleMakeEligible}
        />
      )}
    </div>
  );
};

export default Beneficiaries; 