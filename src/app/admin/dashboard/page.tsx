'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    clients: 0,
    clientInquiries: 0,
  });

  useEffect(() => {
    // Fetch stats
    Promise.all([
      fetch('/api/services').then((r) => r.json()),
      fetch('/api/clients').then((r) => r.json()),
      fetch('/api/client-inquiries').then((r) => r.json()),
    ]).then(([services, clients, inquiries]) => {
      setStats({
        services: services.services?.length || 0,
        clients: clients.clients?.length || 0,
        clientInquiries: inquiries.inquiries?.length || 0,
      });
    });
  }, []);

  const cards = [
    {
      title: 'الصفحة الرئيسية',
      icon: '🏠',
      href: '/admin/main-page',
      color: 'from-primary to-primary/80',
      description: 'Hero, About, Why ORBIT',
    },
    {
      title: 'الحلول',
      icon: '💡',
      href: '/admin/solutions',
      color: 'from-blue-500 to-blue-600',
      description: 'جميع الحلول والباقات',
    },
    {
      title: 'شركاء النجاح',
      count: stats.clients,
      icon: '🤝',
      href: '/admin/clients',
      color: 'from-green-500 to-green-600',
      description: 'الشركاء الموثوقون',
    },
    {
      title: 'الأخبار والعروض',
      icon: '📰',
      href: '/admin/news',
      color: 'from-purple-500 to-purple-600',
      description: 'آخر التحديثات',
    },
    {
      title: 'الاستفسارات',
      count: stats.clientInquiries,
      icon: '📧',
      href: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600',
      description: 'رسائل التواصل',
    },
    {
      title: 'الباقات',
      icon: '📦',
      href: '/admin/packages',
      color: 'from-pink-500 to-pink-600',
      description: 'إدارة الباقات',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-12" dir="rtl">
        <h1 className="text-4xl font-heading font-bold text-primary mb-3 uppercase text-right">
          لوحة تحكم <span className="text-gray-900">ORBIT</span>
        </h1>
        <p className="text-lg text-gray-600 font-ibm-plex-arabic text-right">
          إدارة محتوى موقعك بكفاءة من مكان واحد
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div
              className={`bg-gradient-to-br ${card.color} text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 cursor-pointer relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-6xl drop-shadow-lg">{card.icon}</span>
                  {card.count !== undefined && (
                    <span className="text-4xl font-heading font-bold bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                      {card.count}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-white/80 ">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary" dir="rtl">
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            <span className="font-ibm-plex-arabic">إجراءات سريعة</span>
          </h3>
          <div className="space-y-3">
              <Link
              href="/admin/main-page"
              className="block p-4 bg-gradient-to-l from-primary/10 to-primary/5 rounded-lg hover:from-primary/20 hover:to-primary/10 transition-all border-r-4 border-primary"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <span className="font-ibm-plex-arabic font-semibold text-gray-900 block">تحرير الصفحة الرئيسية</span>
                  <span className="text-xs text-gray-500 font-ibm-plex-arabic">Hero, About, Why ORBIT</span>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/solutions"
              className="block p-4 bg-gradient-to-l from-blue-50 to-blue-25 rounded-lg hover:from-blue-100 hover:to-blue-50 transition-all border-r-4 border-blue-500"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <span className="font-ibm-plex-arabic font-semibold text-gray-900 block">إدارة الحلول</span>
                  <span className="text-xs text-gray-500 font-ibm-plex-arabic">إضافة أو تعديل الحلول</span>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/news"
              className="block p-4 bg-gradient-to-l from-purple-50 to-purple-25 rounded-lg hover:from-purple-100 hover:to-purple-50 transition-all border-r-4 border-purple-500"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📰</span>
                <div>
                  <span className="font-ibm-plex-arabic font-semibold text-gray-900 block">إضافة خبر</span>
                  <span className="text-xs text-gray-500 font-ibm-plex-arabic">إنشاء مقال جديد</span>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/offers"
              className="block p-4 bg-gradient-to-l from-orange-50 to-orange-25 rounded-lg hover:from-orange-100 hover:to-orange-50 transition-all border-r-4 border-orange-500"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <span className="font-ibm-plex-arabic font-semibold text-gray-900 block">إضافة عرض</span>
                  <span className="text-xs text-gray-500 font-ibm-plex-arabic">إنشاء عرض خاص جديد</span>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/clients"
              className="block p-4 bg-gradient-to-l from-green-50 to-green-25 rounded-lg hover:from-green-100 hover:to-green-50 transition-all border-r-4 border-green-500"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <span className="font-ibm-plex-arabic font-semibold text-gray-900 block">إضافة شريك</span>
                  <span className="text-xs text-gray-500 font-ibm-plex-arabic">إضافة شريك نجاح</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-2xl shadow-lg" dir="rtl">
          <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">📊</span>
            <span className="font-ibm-plex-arabic">نظرة عامة على النظام</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <span className="font-ibm-plex-arabic">حالة قاعدة البيانات</span>
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-ibm-plex-arabic font-semibold">
                ✓ متصل
              </span>
            </div>
            <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <span className="font-ibm-plex-arabic">شركاء النجاح</span>
              <span className="font-heading font-bold text-2xl">
                {stats.clients || 0}
              </span>
            </div>
            <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <span className="font-ibm-plex-arabic">الاستفسارات الجديدة</span>
              <span className="font-heading font-bold text-2xl">
                {stats.clientInquiries || 0}
              </span>
            </div>
            <div className="flex justify-between items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <span className="font-ibm-plex-arabic">آخر تحديث</span>
              <span className="font-ibm-plex-arabic">
                {new Date().toLocaleDateString('ar-SA')}
              </span>
            </div>
            <div className="pt-4 border-t border-white/20">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-primary py-4 rounded-lg font-ibm-plex-arabic font-bold hover:bg-secondary hover:shadow-xl transition-all"
              >
                🌐 عرض الموقع المباشر ←
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

