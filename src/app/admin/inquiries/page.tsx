'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface ClientInquiry {
  _id: string;
  type: 'quote' | 'contact' | 'general';
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  serviceType?: string;
  message: string;
  budget?: string;
  selectedPackage?: string;
  packageName?: string;
  packageType?: string;
  packagePrice?: string;
  source?: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  notes?: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  
  // CMS Features
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status' | 'priority'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/client-inquiries');
      const data = await response.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    status: string,
    notes?: string
  ) => {
    try {
      await fetch(`/api/client-inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      fetchInquiries();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleUpdatePriority = async (id: string, priority: string) => {
    try {
      await fetch(`/api/client-inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority }),
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await fetch(`/api/client-inquiries/${id}`, { method: 'DELETE' });
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'quoted':
        return 'bg-purple-100 text-purple-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'quote':
        return 'bg-purple-100 text-purple-800';
      case 'contact':
        return 'bg-blue-100 text-blue-800';
      case 'general':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter, Search, and Sort
  const filteredInquiries = inquiries
    .filter((inquiry) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        inquiry.name.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.phone.includes(searchLower) ||
        (inquiry.company?.toLowerCase().includes(searchLower) || false) ||
        (inquiry.subject?.toLowerCase().includes(searchLower) || false) ||
        (inquiry.packageName?.toLowerCase().includes(searchLower) || false);

      // Status filter
      const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;

      // Type filter
      const matchesType = filterType === 'all' || inquiry.type === filterType;

      // Priority filter
      const matchesPriority = filterPriority === 'all' || inquiry.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        comparison = (priorityOrder[a.priority as keyof typeof priorityOrder] || 0) - 
                     (priorityOrder[b.priority as keyof typeof priorityOrder] || 0);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Package', 'Price', 'Service', 'Status', 'Date', 'Message'];
    const rows = filteredInquiries.map(inquiry => [
      inquiry.name,
      inquiry.email,
      inquiry.phone,
      inquiry.company || '-',
      inquiry.packageName || '-',
      inquiry.packagePrice || '-',
      inquiry.serviceType || '-',
      inquiry.status,
      new Date(inquiry.createdAt).toLocaleDateString(),
      inquiry.message.replace(/"/g, '""'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Stats
  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    quotes: inquiries.filter(i => i.type === 'quote').length,
    contacts: inquiries.filter(i => i.type === 'contact').length,
    urgent: inquiries.filter(i => i.priority === 'urgent').length,
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-2">
                Client Inquiries
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage client quote requests and package inquiries
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-heading font-bold uppercase text-sm tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>📥</span> Export CSV
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Total Inquiries</p>
              <p className="text-3xl font-heading font-bold">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">New</p>
              <p className="text-3xl font-heading font-bold">{stats.new}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Quote Requests</p>
              <p className="text-3xl font-heading font-bold">{stats.quotes}</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-4 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Contact Forms</p>
              <p className="text-3xl font-heading font-bold">{stats.contacts}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Urgent</p>
              <p className="text-3xl font-heading font-bold">{stats.urgent}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-heading font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  🔍 Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name, email, phone, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-heading font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="quote">Quote Requests</option>
                  <option value="contact">Contact Forms</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-heading font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-heading font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Priority
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">🔴 Urgent</option>
                  <option value="high">🟠 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-heading font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-primary">{filteredInquiries.length}</span> of <span className="font-bold">{inquiries.length}</span> inquiries
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading inquiries...</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Subject/Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredInquiries.map((inquiry) => (
                    <tr
                      key={inquiry._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeColor(
                            inquiry.type || 'general'
                          )}`}
                        >
                          {inquiry.type === 'quote' ? '💰 Quote' : inquiry.type === 'contact' ? '📧 Contact' : '📝 General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {inquiry.name}
                        </div>
                        {inquiry.company && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {inquiry.company}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {inquiry.email}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {inquiry.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {inquiry.selectedPackage ? (
                          <div>
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                              {inquiry.packageType === 'charity' && (
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              <span className="truncate max-w-[120px]">{inquiry.packageName}</span>
                            </div>
                            {inquiry.packagePrice && (
                              <div className="text-xs text-primary font-bold">
                                {inquiry.packagePrice} SAR
                              </div>
                            )}
                          </div>
                        ) : inquiry.subject ? (
                          <div className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                            {inquiry.subject}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.priority || 'medium'}
                          onChange={(e) => handleUpdatePriority(inquiry._id, e.target.value)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${getPriorityBadgeColor(
                            inquiry.priority
                          )}`}
                        >
                          <option value="low">🟢 Low</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="high">🟠 High</option>
                          <option value="urgent">🔴 Urgent</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                            inquiry.status
                          )}`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setShowModal(true);
                          }}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInquiries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm || filterStatus !== 'all' || filterType !== 'all' || filterPriority !== 'all'
                    ? 'No inquiries match your filters'
                    : 'No inquiries yet'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Inquiry Details
              </h2>

              <div className="space-y-4 mb-6">
                {/* Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getTypeBadgeColor(
                      selectedInquiry.type || 'general'
                    )}`}
                  >
                    {selectedInquiry.type === 'quote' ? '💰 Quote Request' : selectedInquiry.type === 'contact' ? '📧 Contact Form' : '📝 General Inquiry'}
                  </span>
                  <span
                    className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getPriorityBadgeColor(
                      selectedInquiry.priority
                    )}`}
                  >
                    {selectedInquiry.priority?.toUpperCase() || 'MEDIUM'}
                  </span>
                </div>

                {/* Package Info - Highlighted */}
                {selectedInquiry.selectedPackage && (
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-xl p-4 border-2 border-primary/30">
                    <p className="text-sm font-heading font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Selected Package
                    </p>
                    <div className="flex items-center gap-2">
                      {selectedInquiry.packageType === 'charity' && (
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <div>
                        <p className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                          {selectedInquiry.packageName}
                        </p>
                        {selectedInquiry.packagePrice && (
                          <p className="text-sm text-primary font-bold">
                            {selectedInquiry.packagePrice} SAR
                          </p>
                        )}
                        {selectedInquiry.packageType === 'charity' && (
                          <span className="inline-block mt-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                            Charity Package
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subject (for contact forms) */}
                {selectedInquiry.subject && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-heading font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedInquiry.subject}
                    </p>
                  </div>
                )}

                {/* Source */}
                {selectedInquiry.source && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Source: <span className="font-semibold">{selectedInquiry.source}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Name
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedInquiry.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedInquiry.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedInquiry.phone}
                    </p>
                  </div>
                  {selectedInquiry.company && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Company
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedInquiry.company}
                      </p>
                    </div>
                  )}
                  {selectedInquiry.serviceType && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Service Type
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedInquiry.serviceType}
                      </p>
                    </div>
                  )}
                  {selectedInquiry.budget && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Budget
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedInquiry.budget}
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Message
                  </p>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-2">
                    {selectedInquiry.message}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Update Status
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {['new', 'contacted', 'quoted', 'converted', 'closed'].map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() =>
                              handleUpdateStatus(selectedInquiry._id, status)
                            }
                            className={`px-3 py-1.5 rounded-lg font-semibold text-xs ${
                              selectedInquiry.status === status
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {status}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Update Priority
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {['low', 'medium', 'high', 'urgent'].map(
                        (priority) => (
                          <button
                            key={priority}
                            onClick={() =>
                              handleUpdatePriority(selectedInquiry._id, priority)
                            }
                            className={`px-3 py-1.5 rounded-lg font-semibold text-xs ${
                              selectedInquiry.priority === priority
                                ? getPriorityBadgeColor(priority)
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {priority}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

