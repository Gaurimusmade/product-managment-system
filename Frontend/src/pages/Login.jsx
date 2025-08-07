import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await userAPI.login({
        name,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setMessage({ type: 'success', text: 'Login successful!' });
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Login failed!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
