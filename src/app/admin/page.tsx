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
    // Force light theme when admin page mounts
    forceLightTheme();
    
    // Create observer to prevent dark theme from being applied
    const observer = createThemeObserver();
    
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) {
          router.push('/admin/dashboard');
        }
      })
      .catch(() => {});
    
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

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      <Toaster position="top-right" />
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-primary">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-black rounded-sm overflow-hidden shadow-lg" style={{ width: '180px', height: '50px' }}>
              <img 
                src="/client/logo.jpg" 
                alt="Mark Line" 
                className="h-full w-full object-cover object-center"
                style={{ 
                  transform: 'scale(1.4)',
                  objectPosition: 'center center'
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase font-heading tracking-wide">
            Admin <span className="text-primary">Portal</span>
          </h1>
          <p className="text-gray-600">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="email@markline.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
            className="w-full bg-primary text-white py-4 font-bold hover:bg-secondary hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-lg"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 p-5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-l-4 border-primary">
          <p className="text-sm text-gray-700 text-center">
            <strong className="text-primary uppercase tracking-wide">Default Credentials:</strong>
            <br />
            <span className="font-semibold">Email:</span> admin@markline.sa
            <br />
            <span className="font-semibold">Password:</span> Admin@123
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-primary hover:text-secondary font-bold uppercase tracking-wide transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}

