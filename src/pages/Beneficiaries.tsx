import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BeneficiaryModal from '../components/BeneficiaryModal';
import logo from '../assets/png/logo-color.png';

interface Beneficiary {
  id: string;
  name: string;
  surname: string;
  university: string;
  accumulatedTotal: number;
  yearOfCompletion: number;
  identityNumber: string;
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
    // Eligible to Pay beneficiaries (with tax numbers)
    {
      id: '1',
      name: 'John',
      surname: 'Doe',
      university: 'University of Botswana',
      accumulatedTotal: 50000,
      yearOfCompletion: 2022,
      identityNumber: '123456789',
      taxNumber: 'TAX123456',
      imageUrl: 'https://via.placeholder.com/150',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main Street',
        city: 'Gaborone',
        postalCode: '12345',
        country: 'Botswana'
      }
    },
    {
      id: '2',
      name: 'Jane',
      surname: 'Smith',
      university: 'Botswana International University of Science & Technology',
      accumulatedTotal: 75000,
      yearOfCompletion: 2023,
      identityNumber: '987654321',
      taxNumber: 'TAX654321',
      imageUrl: 'https://via.placeholder.com/150',
      email: 'jane.smith@example.com',
      address: {
        street: '456 University Road',
        city: 'Palapye',
        postalCode: '67890',
        country: 'Botswana'
      }
    },
    // Granted beneficiaries (without tax numbers)
    {
      id: '3',
      name: 'Thabo',
      surname: 'Mokgweetsi',
      university: 'University of Botswana',
      accumulatedTotal: 45000,
      yearOfCompletion: 2023,
      identityNumber: '456789123',
      taxNumber: null,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'thabo.mokgweetsi@example.com',
      address: {
        street: '789 Kgale Road',
        city: 'Gaborone',
        postalCode: '23456',
        country: 'Botswana'
      }
    },
    {
      id: '4',
      name: 'Lerato',
      surname: 'Moloko',
      university: 'Botswana International University of Science & Technology',
      accumulatedTotal: 60000,
      yearOfCompletion: 2023,
      identityNumber: '789123456',
      taxNumber: null,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'lerato.moloko@example.com',
      address: {
        street: '321 Station Road',
        city: 'Palapye',
        postalCode: '34567',
        country: 'Botswana'
      }
    },
    {
      id: '5',
      name: 'Kagiso',
      surname: 'Tsholofelo',
      university: 'University of Botswana',
      accumulatedTotal: 55000,
      yearOfCompletion: 2022,
      identityNumber: '321654987',
      taxNumber: null,
      imageUrl: 'https://via.placeholder.com/150',
      email: 'kagiso.tsholofelo@example.com',
      address: {
        street: '567 Riverwalk',
        city: 'Gaborone',
        postalCode: '45678',
        country: 'Botswana'
      }
    }
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

  const handleContactBeneficiary = (email: string) => {
    // Open default email client
    window.location.href = `mailto:${email}`;
  };

  const filteredBeneficiaries = beneficiaries.filter(ben => {
    const matchesSearch = `${ben.name} ${ben.surname} ${ben.university}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    // Filter based on active tab
    if (activeTab === 'granted') {
      return matchesSearch && !ben.taxNumber;
    } else {
      return matchesSearch && ben.taxNumber;
    }
  });

  const totalPages = Math.ceil(filteredBeneficiaries.length / ITEMS_PER_PAGE);
  const paginatedBeneficiaries = filteredBeneficiaries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container">
      <header>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: 'var(--spacing-md) 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <img 
              src={logo} 
              alt="DTEF Logo" 
              style={{ 
                width: '40px', 
                height: 'auto'
              }} 
            />
            <h1 style={{ margin: 0 }}>DTEF Beneficiaries</h1>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              fontSize: '0.9rem'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="card mb-4">
        <div className="tab-nav">
          <button
            className={`tab-button ${activeTab === 'granted' ? 'active' : ''}`}
            onClick={() => setActiveTab('granted')}
          >
            Granted Accounts
          </button>
          <button
            className={`tab-button ${activeTab === 'eligible' ? 'active' : ''}`}
            onClick={() => setActiveTab('eligible')}
          >
            Eligible to Pay
          </button>
        </div>

        <input
          type="text"
          placeholder="Search beneficiaries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div style={{ 
              display: 'grid', 
              gap: 'var(--spacing-md)', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
            }}>
              {paginatedBeneficiaries.map(beneficiary => (
                <div key={beneficiary.id} className="card">
                  <div style={{ 
                    display: 'flex', 
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0
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
                        marginBottom: 'var(--spacing-xs)'
                      }}>
                        {beneficiary.name} {beneficiary.surname}
                      </h3>
                      <p style={{ 
                        color: 'var(--color-black)',
                        fontSize: '0.9rem'
                      }}>
                        {beneficiary.university}
                      </p>
                    </div>
                  </div>
                  <p style={{ 
                    color: 'var(--color-orange)',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    Total: BWP {beneficiary.accumulatedTotal.toLocaleString()}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button 
                      onClick={() => setSelectedBeneficiary(beneficiary)}
                      style={{
                        flex: 1
                      }}
                    >
                      More Details
                    </button>
                    {activeTab === 'eligible' && (
                      <button
                        onClick={() => handleContactBeneficiary(beneficiary.email)}
                        style={{
                          flex: 1,
                          backgroundColor: 'var(--color-orange)'
                        }}
                      >
                        Contact
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span style={{ color: 'var(--color-brown)' }}>
                  Page {currentPage} of {totalPages}
                </span>
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
          onContact={() => handleContactBeneficiary(selectedBeneficiary.email)}
        />
      )}
    </div>
  );
};

export default Beneficiaries; 