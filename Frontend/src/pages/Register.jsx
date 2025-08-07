import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await userAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage({ type: 'success', text: 'Registration successful!' });

      // Redirect to login page after short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Registration failed!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Create a password"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/"
            className="text-purple-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
