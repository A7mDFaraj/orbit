'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

// Force light theme and LTR for admin pages
const forceLightTheme = () => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.style.direction = 'ltr';
  }
};

// Create a MutationObserver to prevent dark theme and RTL from being applied
const createThemeObserver = () => {
  if (typeof window === 'undefined') return null;
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'class' && document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        }
        if (mutation.attributeName === 'dir' && document.documentElement.getAttribute('dir') !== 'ltr') {
          document.documentElement.setAttribute('dir', 'ltr');
          document.body.style.direction = 'ltr';
        }
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'dir'],
  });
  
  return observer;
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Force light theme and check if already logged in
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Force light theme when admin page mounts
    forceLightTheme();
    
    // Create observer to prevent dark theme from being applied
    const observer = createThemeObserver();
    
    fetch('/api/auth/me')
      .then(async (res) => {
        if (res.ok) {
          try {
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              await res.json();
              router.push('/admin/dashboard');
            }
          } catch (error) {
            // Ignore JSON parse errors, user is not logged in
          }
        }
      })
      .catch(() => {
        // Ignore errors, user is not logged in
      });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        toast.error('Server returned an invalid response. Please check the server logs.');
        setLoading(false);
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        toast.error('Invalid response from server. Please try again.');
        setLoading(false);
        return;
      }

      if (res.ok) {
        toast.success('Login successful!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        // Show more specific error messages
        if (res.status === 401) {
          toast.error(data.error || 'Invalid email or password');
        } else if (res.status === 403) {
          toast.error(data.error || 'Admin access required');
        } else if (res.status === 500) {
          toast.error(data.error || 'Server error. Please check if the database is connected.');
        } else {
          toast.error(data.error || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-white to-primary/5">
      <Toaster position="top-right" />
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-primary">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center">
              <div className="text-5xl font-heading font-bold text-primary tracking-tight">
                ORBIT
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Admin <span className="text-primary">Portal</span>
          </h1>
          <p className="text-gray-600 ">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-heading font-semibold text-gray-700 mb-2 uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all "
              placeholder="admin@orbit.com.sa"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-heading font-semibold text-gray-700 mb-2 uppercase tracking-wide"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all "
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 font-heading font-bold hover:bg-primary/90 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-lg"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral/20">
          <p className="text-xs text-gray-500 text-center mb-3 ">
            Don't have an admin account?
          </p>
          <a
            href="/admin/setup"
            className="block w-full text-center bg-secondary text-primary py-3 px-4 rounded-lg font-heading font-semibold hover:bg-secondary/80 transition-colors uppercase tracking-wide text-sm mb-3"
          >
            Create Admin Account
          </a>
          <p className="text-xs text-gray-400 text-center ">
            Or use API: POST /api/auth/create-admin
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-primary hover:text-primary/80 font-heading font-bold uppercase tracking-wide transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}

