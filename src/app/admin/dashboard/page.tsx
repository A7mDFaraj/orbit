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
      title: 'Clients',
      count: stats.clients,
      icon: '🎨',
      href: '/admin/clients',
      color: 'from-primary to-primary/80',
    },
    {
      title: 'Packages',
      count: stats.packages,
      icon: '📦',
      href: '/admin/packages',
      color: 'from-secondary/80 to-secondary/60',
    },
    {
      title: 'Testimonials',
      count: stats.testimonials,
      icon: '💬',
      href: '/admin/testimonials',
      color: 'from-primary/80 to-primary/60',
    },
    {
      title: 'FAQs',
      count: stats.faqs,
      icon: '❓',
      href: '/admin/faqs',
      color: 'from-neutral/60 to-neutral/40',
    },
    {
      title: 'Inquiries',
      count: stats.clientInquiries,
      icon: '📧',
      href: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Welcome to ORBIT Admin Dashboard
        </h1>
        <p className="text-gray-600 font-gotham">
          Manage your website content from here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div
              className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{card.icon}</span>
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
                <span className="text-2xl">✏️</span>
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
                <span className="text-2xl">✏️</span>
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
                <span className="text-2xl">✏️</span>
                <span className="font-heading font-medium text-gray-900">
                  Edit Unique Features
                </span>
              </div>
            </Link>
            <Link
              href="/admin/clients"
              className="block p-4 bg-secondary/30 rounded-lg hover:bg-secondary/40 border border-secondary/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
                <span className="font-heading font-medium text-gray-900">
                  Add New Client
                </span>
              </div>
            </Link>
            <Link
              href="/admin/packages"
              className="block p-4 bg-primary/5 rounded-lg hover:bg-primary/10 border border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
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
                <span className="text-2xl">➕</span>
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
                <span className="text-2xl">➕</span>
                <span className="font-heading font-medium text-gray-900">Add New FAQ</span>
              </div>
            </Link>
            <Link
              href="/admin/inquiries"
              className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 border border-orange-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
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

