'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface UniqueFeature {
  _id?: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  order?: number;
}

export default function UniqueFeaturesPage() {
  const [features, setFeatures] = useState<UniqueFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<UniqueFeature | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionTitleAr, setSectionTitleAr] = useState('');

  useEffect(() => {
    fetchFeatures();
    fetchSettings();
  }, []);

  const fetchFeatures = async () => {
    try {
      const res = await fetch('/api/unique-features');
      const data = await res.json();
      
      if (data && data.length > 0) {
        setFeatures(data);
      } else {
        // No features found, seed the database
        console.log('No unique features found, seeding...');
        const seedRes = await fetch('/api/unique-features/seed', { method: 'POST' });
        if (seedRes.ok) {
          const seedData = await seedRes.json();
          if (seedData.features) {
            setFeatures(seedData.features);
            toast.success('Features loaded from defaults');
          }
        }
      }
    } catch (error) {
      toast.error('Failed to fetch features');
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/unique-features-settings');
      const data = await res.json();
      if (data.settings) {
        setSectionTitle(data.settings.sectionTitle || 'What Makes Us Unique');
        setSectionTitleAr(data.settings.sectionTitleAr || 'ما يميزنا');
      } else {
        // Set defaults if no settings exist
        setSectionTitle('What Makes Us Unique');
        setSectionTitleAr('ما يميزنا');
      }
    } catch (error) {
      console.error('Failed to fetch settings');
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/unique-features-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionTitle, sectionTitleAr }),
      });

      if (res.ok) {
        toast.success('Section title updated!');
      }
    } catch (error) {
      toast.error('Failed to update section title');
    }
  };

  const handleSave = async (feature: UniqueFeature) => {
    try {
      const url = feature._id ? `/api/unique-features/${feature._id}` : '/api/unique-features';
      const method = feature._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feature),
      });

      if (res.ok) {
        toast.success(feature._id ? 'Feature updated!' : 'Feature created!');
        fetchFeatures();
        setShowModal(false);
        setEditingFeature(null);
      }
    } catch (error) {
      toast.error('Failed to save feature');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/unique-features/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Feature deleted!');
        fetchFeatures();
      }
    } catch (error) {
      toast.error('Failed to delete feature');
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 uppercase tracking-tighter mb-2">
              What Makes Us Unique
            </h1>
            <p className="text-gray-600">Manage the unique features displayed in the About section</p>
          </div>
          <button
            onClick={() => {
              setEditingFeature({ title: '', titleAr: '', desc: '', descAr: '' });
              setShowModal(true);
            }}
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold uppercase hover:bg-blue-600 transition-colors shadow-lg"
          >
            + Add Feature
          </button>
        </div>

        {/* Section Title Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase border-b pb-3">
            Section Title
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title (English)
              </label>
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="What Makes Us Unique"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title (Arabic)
              </label>
              <input
                type="text"
                value={sectionTitleAr}
                onChange={(e) => setSectionTitleAr(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                dir="rtl"
                placeholder="ما يميزنا"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveSettings}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Save Section Title
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading features...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500 font-heading font-semibold">#{feature.order || index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{feature.desc}</p>
                <div className="border-t pt-3 mt-3">
                  <p className="text-sm text-gray-900 font-semibold mb-1" dir="rtl">{feature.titleAr}</p>
                  <p className="text-sm text-gray-600" dir="rtl">{feature.descAr}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingFeature(feature);
                      setShowModal(true);
                    }}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this feature?')) handleDelete(feature._id!);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && editingFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-8 max-w-2xl w-full"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingFeature._id ? 'Edit Feature' : 'Add Feature'}
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={editingFeature.title}
                        onChange={(e) => setEditingFeature({ ...editingFeature, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title (Arabic)
                      </label>
                      <input
                        type="text"
                        value={editingFeature.titleAr}
                        onChange={(e) => setEditingFeature({ ...editingFeature, titleAr: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        dir="rtl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description (English)
                    </label>
                    <textarea
                      value={editingFeature.desc}
                      onChange={(e) => setEditingFeature({ ...editingFeature, desc: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description (Arabic)
                    </label>
                    <textarea
                      value={editingFeature.descAr}
                      onChange={(e) => setEditingFeature({ ...editingFeature, descAr: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary resize-none"
                      dir="rtl"
                      rows={3}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(editingFeature)}
                    className="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}

