'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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

interface MenuSection {
  title: string;
  titleAr: string;
  items: MenuItem[];
}

interface MenuItem {
  name: string;
  nameAr: string;
  href: string;
  icon: string;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string>('main');
  const router = useRouter();
  const pathname = usePathname();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-heading text-gray-700">Loading Admin Panel...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuSections: MenuSection[] = [
    {
      title: 'Dashboard',
      titleAr: 'لوحة التحكم',
      items: [
        { name: 'Overview', nameAr: 'نظرة عامة', href: '/admin/dashboard', icon: '📊' },
      ]
    },
    {
      title: 'Main Page',
      titleAr: 'الصفحة الرئيسية',
      items: [
        { name: 'Main Content', nameAr: 'المحتوى الرئيسي', href: '/admin/main-page', icon: '🏠' },
        { name: 'Success Partners', nameAr: 'شركاء النجاح', href: '/admin/clients', icon: '🤝' },
      ]
    },
    {
      title: 'Solutions',
      titleAr: 'الحلول',
      items: [
        { name: 'All Solutions', nameAr: 'جميع الحلول', href: '/admin/solutions', icon: '💡' },
      ]
    },
    {
      title: 'Pages',
      titleAr: 'الصفحات',
      items: [
        { name: 'News', nameAr: 'الأخبار', href: '/admin/news', icon: '📰' },
        { name: 'Offers', nameAr: 'العروض', href: '/admin/offers', icon: '🎁' },
        { name: 'Packages', nameAr: 'الباقات', href: '/admin/packages', icon: '📦' },
      ]
    },
    {
      title: 'Contact',
      titleAr: 'التواصل',
      items: [
        { name: 'Inquiries', nameAr: 'الاستفسارات', href: '/admin/inquiries', icon: '📧' },
      ]
    },
    {
      title: 'Settings',
      titleAr: 'الإعدادات',
      items: [
        { name: 'Setup', nameAr: 'الإعداد', href: '/admin/setup', icon: '⚙️' },
      ]
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-secondary/20 to-white" dir="rtl">
      <Toaster position="top-left" />

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary text-white p-3 rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar - RIGHT SIDE (first in RTL) */}
      <aside
        className={`fixed lg:relative inset-y-0 right-0 z-40 bg-gradient-to-b from-primary via-[#8a2a3d] to-primary text-white transition-all duration-300 h-screen ${
          sidebarOpen ? 'w-72 lg:w-80' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} shadow-2xl overflow-y-auto flex-shrink-0`}
      >
        {/* Logo Header */}
        <div className="sticky top-0 bg-primary/95 backdrop-blur-sm z-10 border-b border-white/10">
          <div className="p-4 flex items-center justify-between">
            {sidebarOpen ? (
              <Link href="/" className="group flex-1">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-secondary/50 transition-all duration-300 p-2" style={{ width: '180px', height: '50px' }}>
                  <img 
                    src="/client/logo.jpg" 
                    alt="ORBIT" 
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </Link>
            ) : (
              <Link href="/" className="text-secondary text-2xl font-heading font-bold">
                O
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-2">
              {sidebarOpen && (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-somar font-bold text-secondary/70 hover:text-secondary uppercase tracking-wider transition-colors"
                >
                  <span>{section.titleAr}</span>
                  <span className={`transition-transform duration-200 ${expandedSection === section.title ? 'rotate-90' : ''}`}>
                    ◀
                  </span>
                </button>
              )}
              <div className={`space-y-1 ${sidebarOpen && expandedSection !== section.title ? 'hidden' : ''}`}>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive(item.href)
                        ? 'bg-secondary text-primary shadow-lg shadow-secondary/30'
                        : 'hover:bg-white/10 hover:-translate-x-1'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="font-somar font-medium">{item.nameAr}</span>
                    )}
                    {isActive(item.href) && sidebarOpen && (
                      <span className="mr-auto w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="sticky bottom-0 bg-primary/95 backdrop-blur-sm border-t border-white/10 p-4">
            <Link 
              href="/" 
              target="_blank"
              className="block text-center bg-secondary hover:bg-secondary/90 text-primary font-somar font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg"
            >
              🌐 عرض الموقع
            </Link>
          </div>
        )}
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm shadow-md border-b-4 border-primary">
          <div className="px-4 lg:px-8 py-4 lg:py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 lg:gap-3 flex-wrap mr-12 lg:mr-0">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-somar font-semibold text-sm"
                title="تسجيل خروج"
              >
                <span className="text-base lg:text-lg">🚪</span>
                <span className="hidden lg:inline text-xs lg:text-sm">خروج</span>
              </button>

              {/* User Info - Hidden on small screens */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-heading font-bold text-lg shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-600">مرحباً</p>
                  <p className="font-somar font-bold text-sm text-gray-900">{user.name}</p>
                </div>
              </div>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/90 transition-colors text-primary font-somar font-semibold text-sm"
              >
                <span className="text-base lg:text-lg">🌐</span>
                <span className="text-xs lg:text-sm">{isArabic ? 'EN' : 'AR'}</span>
              </button>
            </div>
            
            <div className="flex-1 min-w-0 text-right">
              <h2 className="text-xl lg:text-3xl font-heading font-bold text-primary uppercase tracking-wide truncate">
                لوحة تحكم ORBIT
              </h2>
              <p className="text-xs lg:text-sm text-gray-500 mt-1 font-somar">نظام إدارة المحتوى</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

