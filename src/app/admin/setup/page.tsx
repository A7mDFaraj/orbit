'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminSetup() {
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Check if admin exists on mount
  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const res = await fetch('/api/auth/create-admin');
      if (res.ok) {
        const data = await res.json();
        setAdminExists(data.exists);
      }
    } catch (error) {
      console.error('Error checking admin:', error);
    } finally {
      setChecking(false);
    }
  };

  const seedDatabase = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        toast.error('Server returned an invalid response. Please check the server logs.');
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success('Database seeded successfully!');
        toast.success(`Admin Email: ${data.admin.email}`, { duration: 5000 });
        toast.success(`Admin Password: ${data.admin.password}`, { duration: 5000 });
        toast('Please save these credentials and change the password after first login', {
          duration: 8000,
          icon: '⚠️',
        });
        setAdminExists(true);
      } else {
        toast.error(data.error || 'Failed to seed database');
        if (data.details) {
          toast.error(data.details, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Seed database error:', error);
      toast.error('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        toast.error('Server returned an invalid response. Please check the server logs.');
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        if (data.exists) {
          toast.success('Admin user already exists!');
          setAdminExists(true);
        } else {
          toast.success('Admin user created successfully!');
          toast.success(`Email: ${data.email}`, { duration: 5000 });
          toast.success(`Password: ${data.password}`, { duration: 5000 });
          toast('Please save these credentials and change the password after first login', {
            duration: 8000,
            icon: '⚠️',
          });
          setAdminExists(true);
        }
      } else {
        toast.error(data.error || 'Failed to create admin user');
      }
    } catch (error) {
      console.error('Create admin error:', error);
      toast.error('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-white to-primary/5">
        <div className="text-xl font-heading text-gray-600">Checking admin status...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-white to-primary/5 p-4">
      <Toaster position="top-right" />
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-primary">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="text-5xl font-heading font-bold text-primary tracking-tight">
              ORBIT
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Admin <span className="text-primary">Setup</span>
          </h1>
          <p className="text-gray-600 font-gotham">Create your admin account</p>
        </div>

        {adminExists ? (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-heading font-bold text-green-800">Admin User Exists</h3>
              </div>
              <p className="text-gray-700 font-gotham mb-4">
                An admin user has already been created. You can now log in to the admin panel.
              </p>
              <div className="bg-white p-4 rounded border border-green-200">
                <p className="text-sm font-heading font-semibold text-gray-700 mb-2">Default Credentials:</p>
                <p className="text-sm font-gotham text-gray-600 mb-1">
                  <span className="font-semibold">Email:</span> admin@orbit.com.sa
                </p>
                <p className="text-sm font-gotham text-gray-600">
                  <span className="font-semibold">Password:</span> Abd123#Abd
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin')}
              className="w-full bg-primary text-white py-4 font-heading font-bold hover:bg-primary/90 hover:shadow-xl transition-all uppercase tracking-wider text-lg rounded-lg"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-heading font-bold text-yellow-800">No Admin User Found</h3>
              </div>
              <p className="text-gray-700 font-gotham mb-4">
                You need to seed the database first. This will create the admin user and populate initial data (testimonials, FAQs, clients).
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={seedDatabase}
                disabled={loading}
                className="w-full bg-primary text-white py-4 font-heading font-bold hover:bg-primary/90 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-lg rounded-lg"
              >
                {loading ? 'Seeding Database...' : '🌱 Seed Database (Recommended)'}
              </button>
              <p className="text-xs text-gray-500 text-center font-gotham">OR</p>
              <button
                onClick={createAdmin}
                disabled={loading}
                className="w-full bg-secondary text-primary py-3 font-heading font-semibold hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide rounded-lg"
              >
                {loading ? 'Creating...' : 'Create Admin Only'}
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-neutral/20">
          <p className="text-xs text-gray-500 text-center font-gotham mb-3">
            Make sure your MongoDB connection is configured in <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/')}
              className="flex-1 text-primary hover:text-primary/80 font-heading font-bold uppercase tracking-wide transition-colors text-sm"
            >
              ← Back to Website
            </button>
            {adminExists && (
              <button
                onClick={() => router.push('/admin')}
                className="flex-1 text-primary hover:text-primary/80 font-heading font-bold uppercase tracking-wide transition-colors text-sm"
              >
                Login →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

