'use client';

import { useEffect, useState } from 'react';
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
  // Casting-specific fields
  isCasting?: boolean;
  age?: string;
  nationality?: string;
  weight?: string;
  height?: string;
  gender?: string;
  email?: string;
  photos?: string[];
}

export default function TeamApplicationsPage() {
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

  const isCastingApplication = (app: TeamApplication) => {
    return app.type === 'cast' || app.isCasting;
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-gray-900 uppercase tracking-tighter mb-2">
            Team Applications
          </h1>
          <p className="text-gray-600">
            Manage applications from organizers, non-organizers, and cast members
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading applications...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{app.name}</div>
                          {isCastingApplication(app) && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                              Casting
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                <p className="text-gray-500">
                  No applications yet
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900">
                  Application Details
                  {isCastingApplication(selectedApp) && (
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                      Casting Application
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-bold text-gray-900 border-b pb-2">Basic Information</h3>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Name</p>
                    <p className="text-gray-900">{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">City</p>
                    <p className="text-gray-900">{selectedApp.city}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Mobile</p>
                    <p className="text-gray-900">{selectedApp.mobile}</p>
                  </div>
                  {selectedApp.backupMobile && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Backup Mobile</p>
                      <p className="text-gray-900">{selectedApp.backupMobile}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Type</p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeColor(
                        selectedApp.type
                      )}`}
                    >
                      {selectedApp.type}
                    </span>
                  </div>
                </div>

                {/* Casting Information (if applicable) */}
                {isCastingApplication(selectedApp) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-heading font-bold text-gray-900 border-b pb-2">Casting Information</h3>
                    {selectedApp.email && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Email</p>
                        <p className="text-gray-900">{selectedApp.email}</p>
                      </div>
                    )}
                    {selectedApp.age && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Age</p>
                        <p className="text-gray-900">{selectedApp.age} years old</p>
                      </div>
                    )}
                    {selectedApp.nationality && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Nationality</p>
                        <p className="text-gray-900">{selectedApp.nationality}</p>
                      </div>
                    )}
                    {selectedApp.gender && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Gender</p>
                        <p className="text-gray-900 capitalize">{selectedApp.gender}</p>
                      </div>
                    )}
                    {selectedApp.height && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Height</p>
                        <p className="text-gray-900">{selectedApp.height} cm</p>
                      </div>
                    )}
                    {selectedApp.weight && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Weight</p>
                        <p className="text-gray-900">{selectedApp.weight} kg</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Photos (for casting applications) */}
              {isCastingApplication(selectedApp) && selectedApp.photos && selectedApp.photos.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-heading font-bold text-gray-900 border-b pb-2 mb-4">
                    Photos ({selectedApp.photos.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedApp.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border-2 border-gray-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <a
                            href={photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-sm font-medium bg-primary px-3 py-1 rounded"
                          >
                            View Full Size
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {['pending', 'reviewed', 'accepted', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedApp._id, status)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        selectedApp.status === status
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300"
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
