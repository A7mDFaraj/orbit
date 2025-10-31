'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

interface TeamApplication {
  _id: string;
  name: string;
  city: string;
  mobile: string;
  backupMobile?: string;
  photo?: string;
  type: 'organizer' | 'non-organizer' | 'cast';
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  notes?: string;
  createdAt: string;
}

export default function TeamApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<TeamApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<TeamApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/team-applications');
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
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
      await fetch(`/api/team-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      fetchApplications();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await fetch(`/api/team-applications/${id}`, { method: 'DELETE' });
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'organizer':
        return 'bg-purple-100 text-purple-800';
      case 'non-organizer':
        return 'bg-indigo-100 text-indigo-800';
      case 'cast':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-rb-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-2">
            Team Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage applications from organizers, non-organizers, and cast members
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading applications...</p>
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
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
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
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {app.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {app.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {app.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeColor(
                            app.type
                          )}`}
                        >
                          {app.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowModal(true);
                          }}
                          className="text-primary hover:text-primary/80"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
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

            {applications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No applications yet
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-rb-bold text-gray-900 dark:text-white mb-6">
                Application Details
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  <p className="text-gray-900 dark:text-white">{selectedApp.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    City
                  </p>
                  <p className="text-gray-900 dark:text-white">{selectedApp.city}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Mobile
                  </p>
                  <p className="text-gray-900 dark:text-white">{selectedApp.mobile}</p>
                </div>
                {selectedApp.backupMobile && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Backup Mobile
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedApp.backupMobile}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Type
                  </p>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeColor(
                      selectedApp.type
                    )}`}
                  >
                    {selectedApp.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    Update Status
                  </p>
                  <div className="flex gap-2">
                    {['pending', 'reviewed', 'accepted', 'rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedApp._id, status)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                          selectedApp.status === status
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
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

