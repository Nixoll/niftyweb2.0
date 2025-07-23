'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Default admin credentials (you can change these)
      const defaultCredentials = {
        username: 'admin',
        password: 'admin123'
      };

      // Check stored credentials or use defaults
      const storedCredentials = localStorage.getItem('adminCredentials');
      const validCredentials = storedCredentials ? JSON.parse(storedCredentials) : defaultCredentials;

      if (credentials.username === validCredentials.username && credentials.password === validCredentials.password) {
        // Create session
        const session = {
          username: credentials.username,
          loginTime: new Date().toISOString(),
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        };

        localStorage.setItem('adminSession', JSON.stringify(session));
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-admin-line text-red-600 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 mr-2"></i>
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  <i className="ri-login-circle-line mr-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <div className="font-medium mb-1">Default Credentials:</div>
              <div>Username: admin</div>
              <div>Password: admin123</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <i className="ri-arrow-left-line mr-1"></i>
              Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}