'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    testimonials: 0,
    faqs: 0,
    packages: 0,
    clientInquiries: 0,
  });

  useEffect(() => {
    // Fetch stats for ORBIT content
    Promise.all([
      fetch('/api/clients').then((r) => r.json()).catch(() => ({ clients: [] })),
      fetch('/api/testimonials').then((r) => r.json()).catch(() => ({ testimonials: [] })),
      fetch('/api/faqs').then((r) => r.json()).catch(() => ({ faqs: [] })),
      fetch('/api/packages').then((r) => r.json()).catch(() => ({ packages: [] })),
      fetch('/api/client-inquiries').then((r) => r.json()).catch(() => ({ inquiries: [] })),
    ]).then(([clients, testimonials, faqs, packages, inquiries]) => {
      setStats({
        clients: clients.clients?.length || 0,
        testimonials: testimonials.testimonials?.length || 0,
        faqs: faqs.faqs?.length || 0,
        packages: packages.packages?.length || 0,
        clientInquiries: inquiries.inquiries?.length || 0,
      });
    });
  }, []);

  const cards = [
    {
      title: 'Packages',
      count: stats.packages,
      href: '/admin/packages',
      color: 'from-primary to-primary/80',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'Testimonials',
      count: stats.testimonials,
      href: '/admin/testimonials',
      color: 'from-secondary/80 to-secondary/60',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: 'FAQs',
      count: stats.faqs,
      href: '/admin/faqs',
      color: 'from-primary/80 to-primary/60',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Inquiries',
      count: stats.clientInquiries,
      href: '/admin/inquiries',
      color: 'from-neutral/60 to-neutral/40',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2 uppercase tracking-tight">
          ORBIT Control Center
        </h1>
        <p className="text-gray-600 font-gotham text-lg">
          Manage your ORBIT website content and operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div
              className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">{card.icon}</div>
                <span className="text-3xl font-heading font-bold">{card.count}</span>
              </div>
              <h3 className="text-xl font-heading font-semibold">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral/10">
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin/hero"
              className="block p-4 bg-primary/5 rounded-lg hover:bg-primary/10 border border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="font-heading font-medium text-gray-900">
                  Edit Hero Section
                </span>
              </div>
            </Link>
            <Link
              href="/admin/about"
              className="block p-4 bg-primary/5 rounded-lg hover:bg-primary/10 border border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="font-heading font-medium text-gray-900">
                  Edit About Section
                </span>
              </div>
            </Link>
            <Link
              href="/admin/unique-features"
              className="block p-4 bg-secondary/30 rounded-lg hover:bg-secondary/40 border border-secondary/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="font-heading font-medium text-gray-900">
                  Edit Unique Features
                </span>
              </div>
            </Link>
            <Link
              href="/admin/packages"
              className="block p-4 bg-primary/5 rounded-lg hover:bg-primary/10 border border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-heading font-medium text-gray-900">
                  Add New Package
                </span>
              </div>
            </Link>
            <Link
              href="/admin/testimonials"
              className="block p-4 bg-secondary/30 rounded-lg hover:bg-secondary/40 border border-secondary/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-heading font-medium text-gray-900">
                  Add New Testimonial
                </span>
              </div>
            </Link>
            <Link
              href="/admin/faqs"
              className="block p-4 bg-primary/5 rounded-lg hover:bg-primary/10 border border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-heading font-medium text-gray-900">Add New FAQ</span>
              </div>
            </Link>
            <Link
              href="/admin/inquiries"
              className="block p-4 bg-neutral/10 rounded-lg hover:bg-neutral/20 border border-neutral/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-heading font-medium text-gray-900">
                  View Client Inquiries ({stats.clientInquiries})
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral/10">
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
            System Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">Database Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-heading font-semibold">
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">Total Content Items</span>
              <span className="font-heading font-bold text-gray-900">
                {stats.clients +
                  stats.testimonials +
                  stats.faqs +
                  stats.packages}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">Packages</span>
              <span className="font-heading font-bold text-gray-900">
                {stats.packages}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">Testimonials</span>
              <span className="font-heading font-bold text-gray-900">
                {stats.testimonials}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">FAQs</span>
              <span className="font-heading font-bold text-gray-900">
                {stats.faqs}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">New Inquiries</span>
              <span className="font-heading font-bold text-gray-900">
                {stats.clientInquiries}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-gotham">Last Updated</span>
              <span className="text-gray-900 font-gotham">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="pt-4 border-t border-neutral/20">
              <a
                href="/"
                target="_blank"
                className="block text-center bg-primary text-white py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
              >
                View Live Website →
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

