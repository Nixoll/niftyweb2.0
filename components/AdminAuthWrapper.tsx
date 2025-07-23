'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; loginTime: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    try {
      const session = localStorage.getItem('adminSession');
      if (session) {
        const sessionData = JSON.parse(session);
        const now = new Date();
        const expires = new Date(sessionData.expires);

        if (now < expires) {
          setIsAuthenticated(true);
          setUser({
            username: sessionData.username,
            loginTime: sessionData.loginTime
          });
        } else {
          // Session expired
          localStorage.removeItem('adminSession');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Auth Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-admin-line text-red-600"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">
                Welcome back, {user?.username}
              </div>
              <div className="text-xs text-gray-500" suppressHydrationWarning={true}>
                Logged in since {user?.loginTime ? new Date(user.loginTime).toLocaleString() : ''}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
          >
            <i className="ri-logout-circle-line"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-0">
        {children}
      </div>
    </div>
  );
}