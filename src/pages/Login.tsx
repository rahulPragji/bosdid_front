import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/png/logo-color.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/beneficiaries');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <div className="text-center mb-4">
          <img 
            src={logo} 
            alt="DTEF Logo" 
            style={{ 
              width: '200px', 
              height: 'auto',
              marginBottom: '2rem'
            }} 
          />
          <h1>DTEF Login</h1>
        </div>
        
        {error && (
          <div className="mb-3" style={{ 
            color: 'var(--color-brown)',
            backgroundColor: 'rgba(133, 72, 54, 0.1)',
            padding: 'var(--spacing-sm)',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="mb-2" style={{ 
              display: 'block',
              color: 'var(--color-brown)',
              fontWeight: '500'
            }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-100"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="mb-2" style={{ 
              display: 'block',
              color: 'var(--color-brown)',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-100"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-100"
            disabled={isLoading}
            style={{
              padding: 'var(--spacing-md)',
              fontSize: '1.1rem'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 