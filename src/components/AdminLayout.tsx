'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { AdminLanguageProvider, useAdminLanguage } from '@/contexts/AdminLanguageContext';

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

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLanguageProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminLanguageProvider>
  );
}

function AdminLayoutInner({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const { t, toggleLanguage, isArabic } = useAdminLanguage();

  useEffect(() => {
    // Force light theme when admin layout mounts
    forceLightTheme();
    checkAuth();
    
    // Create observer to prevent dark theme from being applied
    const observer = createThemeObserver();
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { name: t.dashboard, href: '/admin/dashboard', icon: '📊' },
    { name: t.heroSection, href: '/admin/hero', icon: '🌟' },
    { name: t.aboutUs, href: '/admin/about', icon: '👋' },
    { name: t.uniqueFeatures, href: '/admin/unique-features', icon: '✨' },
    { name: t.services, href: '/admin/services', icon: '💼' },
    { name: t.portfolio, href: '/admin/clients', icon: '🎨' },
    { name: t.testimonials, href: '/admin/testimonials', icon: '⭐' },
    { name: t.faqs, href: '/admin/faqs', icon: '❓' },
    { name: t.video, href: '/admin/video', icon: '🎬' },
    { name: t.packages, href: '/admin/packages', icon: '📦' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`relative bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } shadow-2xl overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen ? (
              <Link href="/" className="group">
                <div className="relative bg-black rounded-sm overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300" style={{ width: '160px', height: '45px' }}>
                  <img 
                    src="/client/logo.jpg" 
                    alt="Mark Line" 
                    className="h-full w-full object-cover object-center"
                    style={{ 
                      transform: 'scale(1.4)',
                      objectPosition: 'center center'
                    }}
                  />
                  <div className="absolute inset-0 border-2 border-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            ) : (
              <Link href="/" className="text-primary text-2xl font-bold">
                ML
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors ml-2"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                {sidebarOpen && (
                  <span className="font-semibold tracking-wide">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md border-b-4 border-primary">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide" dir={isArabic ? 'rtl' : 'ltr'}>
                {t.adminDashboard}
              </h2>
              <p className="text-sm text-gray-500 mt-1" dir={isArabic ? 'rtl' : 'ltr'}>{t.controlPanel}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 transition-colors text-white font-semibold"
                title={isArabic ? t.english : t.arabic}
              >
                <span className="text-lg">🌐</span>
                <span className="text-sm">{isArabic ? 'EN' : 'AR'}</span>
              </button>

              {/* User Info */}
              <div className="text-right" dir={isArabic ? 'rtl' : 'ltr'}>
                <p className="text-sm text-gray-600">{t.welcome}</p>
                <p className="font-bold text-gray-900">{user.name}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user.name.charAt(0)}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold"
                title={t.logout}
              >
                <span className="text-lg">🚪</span>
                <span className="text-sm">{t.logout}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

