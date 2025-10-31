'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface ClientInquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  message: string;
  budget?: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
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

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-rb-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-2">
            Client Inquiries
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage client quote requests and inquiries
          </p>
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
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {inquiry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {inquiry.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {inquiry.serviceType}
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
                          className="text-primary hover:text-primary/80"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {inquiries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No inquiries yet</p>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-rb-bold text-gray-900 dark:text-white mb-6">
                Inquiry Details
              </h2>

              <div className="space-y-4 mb-6">
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
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Service Type
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {selectedInquiry.serviceType}
                  </p>
                </div>
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
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Message
                  </p>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>
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
                          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
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

