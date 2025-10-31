'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    clients: 0,
    testimonials: 0,
    faqs: 0,
    teamApplications: 0,
    clientInquiries: 0,
  });

  useEffect(() => {
    // Fetch stats
    Promise.all([
      fetch('/api/services').then((r) => r.json()),
      fetch('/api/clients').then((r) => r.json()),
      fetch('/api/testimonials').then((r) => r.json()),
      fetch('/api/faqs').then((r) => r.json()),
      fetch('/api/team-applications').then((r) => r.json()),
      fetch('/api/client-inquiries').then((r) => r.json()),
    ]).then(([services, clients, testimonials, faqs, applications, inquiries]) => {
      setStats({
        services: services.services?.length || 0,
        clients: clients.clients?.length || 0,
        testimonials: testimonials.testimonials?.length || 0,
        faqs: faqs.faqs?.length || 0,
        teamApplications: applications.applications?.length || 0,
        clientInquiries: inquiries.inquiries?.length || 0,
      });
    });
  }, []);

  const cards = [
    {
      title: 'Services',
      count: stats.services,
      icon: '💼',
      href: '/admin/services',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Clients',
      count: stats.clients,
      icon: '🏢',
      href: '/admin/clients',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Testimonials',
      count: stats.testimonials,
      icon: '⭐',
      href: '/admin/testimonials',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'FAQs',
      count: stats.faqs,
      icon: '❓',
      href: '/admin/faqs',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Team Applications',
      count: stats.teamApplications,
      icon: '👥',
      href: '/admin/team-applications',
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Client Inquiries',
      count: stats.clientInquiries,
      icon: '📧',
      href: '/admin/inquiries',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
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
                <span className="text-3xl font-bold">{card.count}</span>
              </div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin/services"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
                <span className="font-medium text-gray-900">
                  Add New Service
                </span>
              </div>
            </Link>
            <Link
              href="/admin/clients"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
                <span className="font-medium text-gray-900">
                  Add New Client
                </span>
              </div>
            </Link>
            <Link
              href="/admin/testimonials"
              className="block p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
                <span className="font-medium text-gray-900">
                  Add New Testimonial
                </span>
              </div>
            </Link>
            <Link
              href="/admin/faqs"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">➕</span>
                <span className="font-medium text-gray-900">Add New FAQ</span>
              </div>
            </Link>
            <Link
              href="/admin/team-applications"
              className="block p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <span className="font-medium text-gray-900">
                  View Team Applications
                </span>
              </div>
            </Link>
            <Link
              href="/admin/inquiries"
              className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <span className="font-medium text-gray-900">
                  View Client Inquiries
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            System Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Content Items</span>
              <span className="font-bold text-gray-900">
                {stats.services +
                  stats.clients +
                  stats.testimonials +
                  stats.faqs}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Applications</span>
              <span className="font-bold text-gray-900">
                {stats.teamApplications}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Inquiries</span>
              <span className="font-bold text-gray-900">
                {stats.clientInquiries}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Updated</span>
              <span className="text-gray-900">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="pt-4 border-t">
              <a
                href="/"
                target="_blank"
                className="block text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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

