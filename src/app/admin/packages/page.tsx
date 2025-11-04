'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Package {
  _id?: string;
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  duration: string;
  durationAr: string;
  features: string[];
  featuresAr: string[];
  highlighted?: boolean;
  icon: string;
  order?: number;
}

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const emptyPackage: Package = {
    id: '',
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    duration: '',
    durationAr: '',
    features: [''],
    featuresAr: [''],
    icon: '📦',
    highlighted: false,
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (packageData: Package) => {
    try {
      const url = packageData._id
        ? `/api/packages/${packageData._id}`
        : '/api/packages';
      
      const method = packageData._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData),
      });

      if (res.ok) {
        fetchPackages();
        setIsModalOpen(false);
        setEditingPackage(null);
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchPackages();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const openCreateModal = () => {
    setEditingPackage(emptyPackage);
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-3xl font-rb-bold text-gray-900 dark:text-white uppercase tracking-tight">
                📦 Packages Management
              </h1>
            </div>
            
            <div className="flex gap-3">
              {packages.length === 0 && (
                <motion.button
                  onClick={async () => {
                    const res = await fetch('/api/packages/seed', { method: 'POST' });
                    if (res.ok) fetchPackages();
                  }}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-rb-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Seed Packages
                </motion.button>
              )}
              <motion.button
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-lg font-rb-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Package
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-blue-400/10 dark:from-primary/20 dark:to-blue-400/20 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Packages</p>
                  <p className="text-2xl font-rb-bold text-gray-900 dark:text-white">{packages.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-400/10 dark:from-green-500/20 dark:to-emerald-400/20 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Highlighted</p>
                  <p className="text-2xl font-rb-bold text-gray-900 dark:text-white">
                    {packages.filter(p => p.highlighted).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-400/10 dark:from-purple-500/20 dark:to-pink-400/20 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Features</p>
                  <p className="text-2xl font-rb-bold text-gray-900 dark:text-white">
                    {packages.reduce((sum, pkg) => sum + pkg.features.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {packages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700"
          >
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-rb-bold text-gray-900 dark:text-white mb-2">No Packages Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first package to get started
            </p>
            <button
              onClick={openCreateModal}
              className="bg-primary text-white px-6 py-3 rounded-lg font-rb-bold uppercase hover:bg-primary/90 transition-colors"
            >
              Create First Package
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  pkg.highlighted
                    ? 'border-primary dark:border-primary'
                    : 'border-gray-200 dark:border-gray-700'
                } overflow-hidden`}
              >
                {/* Highlighted Badge */}
                {pkg.highlighted && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      ⭐ Popular
                    </div>
                  </div>
                )}

                {/* Delete Confirmation */}
                <AnimatePresence>
                  {deleteConfirm === pkg._id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center p-6"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center max-w-sm">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h4 className="text-lg font-rb-bold text-gray-900 dark:text-white mb-2">
                          Delete Package?
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                          This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(pkg._id!)}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-2">{pkg.icon}</div>
                      <h3 className="text-xl font-rb-bold text-gray-900 dark:text-white mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
                        {pkg.nameAr}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{pkg.duration}</span>
                  </div>

                  {/* Features Count */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="text-sm">{pkg.features.length} Features</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => openEditModal(pkg)}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => setDeleteConfirm(pkg._id!)}
                      className="px-4 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg font-medium text-sm hover:bg-red-500/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && editingPackage && (
          <PackageModal
            package={editingPackage}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingPackage(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal Component
function PackageModal({
  package: pkg,
  onSave,
  onClose,
}: {
  package: Package;
  onSave: (pkg: Package) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Package>(pkg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateFeature = (index: number, value: string, isArabic: boolean) => {
    const newFeatures = isArabic ? [...formData.featuresAr] : [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      [isArabic ? 'featuresAr' : 'features']: newFeatures,
    });
  };

  const addFeature = (isArabic: boolean) => {
    setFormData({
      ...formData,
      [isArabic ? 'featuresAr' : 'features']: [
        ...(isArabic ? formData.featuresAr : formData.features),
        '',
      ],
    });
  };

  const removeFeature = (index: number, isArabic: boolean) => {
    const features = isArabic ? formData.featuresAr : formData.features;
    if (features.length > 1) {
      setFormData({
        ...formData,
        [isArabic ? 'featuresAr' : 'features']: features.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full my-8"
      >
        <form onSubmit={handleSubmit}>
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-rb-bold text-gray-900 dark:text-white uppercase">
              {pkg._id ? 'Edit Package' : 'Create Package'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-2xl text-center"
                  maxLength={2}
                  required
                />
              </div>

              {/* ID */}
              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Package ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., basic-package"
                  required
                />
              </div>
            </div>

            {/* Name EN & AR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Name (English)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Name (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            {/* Description EN & AR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Description (English)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Description (Arabic)
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  dir="rtl"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Duration EN & AR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Duration (English)
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., 3 Months"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Duration (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.durationAr}
                  onChange={(e) => setFormData({ ...formData, durationAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  dir="rtl"
                  placeholder="مثال: 3 أشهر"
                  required
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.highlighted}
                    onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Highlight Package
                  </span>
                </label>
              </div>
            </div>

            {/* Features EN */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Features (English)
                </label>
                <button
                  type="button"
                  onClick={() => addFeature(false)}
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value, false)}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={`Feature ${index + 1}`}
                      required
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index, false)}
                        className="px-3 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features AR */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Features (Arabic)
                </label>
                <button
                  type="button"
                  onClick={() => addFeature(true)}
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة ميزة
                </button>
              </div>
              <div className="space-y-2">
                {formData.featuresAr.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value, true)}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      dir="rtl"
                      placeholder={`الميزة ${index + 1}`}
                      required
                    />
                    {formData.featuresAr.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index, true)}
                        className="px-3 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-rb-bold uppercase tracking-wider hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-rb-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {pkg._id ? 'Update Package' : 'Create Package'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

