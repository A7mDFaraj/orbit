'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  _id?: string;
  name: string;
  nameAr?: string;
  slug: string;
  type: 'news' | 'offer' | 'client';
  isActive: boolean;
}

interface Package {
  _id: string;
  id: string;
  name: string;
  nameAr: string;
}

interface Offer {
  _id?: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  content?: string;
  contentAr?: string;
  image?: string;
  images?: string[];
  category: string;
  slug: string;
  isActive: boolean;
  featured?: boolean;
  startDate?: Date;
  endDate?: Date;
  order: number;
  packageId?: string;
  discountPercentage?: number;
  originalPrice?: number;
  discountedPrice?: number;
  theme?: 'national-day' | 'founding-day' | 'black-friday' | 'custom';
}

const emptyOffer: Offer = {
  title: '',
  titleAr: '',
  description: '',
  descriptionAr: '',
  content: '',
  contentAr: '',
  image: '',
  images: [],
  category: '',
  slug: '',
  isActive: true,
  featured: false,
  order: 0,
  packageId: '',
  discountPercentage: 0,
  originalPrice: 0,
  discountedPrice: 0,
  theme: 'custom',
};

export default function OffersAdmin() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Offer>(emptyOffer);
  const [categoryFormData, setCategoryFormData] = useState<Category>({
    name: '',
    nameAr: '',
    slug: '',
    type: 'offer',
    isActive: true,
  });

  useEffect(() => {
    fetchOffers();
    fetchCategories();
    fetchPackages();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers?admin=true');
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (error) {
      toast.error('Failed to fetch offers');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories?type=offer&admin=true');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingOffer?._id
        ? `/api/offers/${editingOffer._id}`
        : '/api/offers';

      const method = editingOffer?._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save offer');
      }

      toast.success(editingOffer?._id ? 'Offer updated successfully!' : 'Offer created successfully!');
      setIsModalOpen(false);
      setEditingOffer(null);
      setFormData(emptyOffer);
      fetchOffers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save offer');
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCategory?._id
        ? `/api/categories/${editingCategory._id}`
        : '/api/categories';

      const method = editingCategory?._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryFormData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save category');
      }

      toast.success(editingCategory?._id ? 'Category updated!' : 'Category created!');
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      setCategoryFormData({ name: '', nameAr: '', slug: '', type: 'offer', isActive: true });
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Offer deleted successfully!');
      fetchOffers();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete offer');
    }
  };

  const handleCategoryDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Category deleted!');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const toggleActive = async (item: Offer) => {
    try {
      const res = await fetch(`/api/offers/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isActive: !item.isActive }),
      });
      if (res.ok) {
        toast.success(item.isActive ? 'Offer deactivated' : 'Offer activated');
        fetchOffers();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openCreateModal = () => {
    setEditingOffer(null);
    setFormData(emptyOffer);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Offer) => {
    setEditingOffer(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const openCategoryModal = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', nameAr: '', slug: '', type: 'offer', isActive: true });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryFormData(cat);
    setIsCategoryModalOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Quick Guide */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
          💡 How to Create Package Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
            <div className="text-3xl mb-2">1️⃣</div>
            <h3 className="font-heading font-bold text-gray-900 mb-2">Select Package</h3>
            <p className="text-sm text-gray-600">Choose from existing packages (SMS, WhatsApp, etc.)</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-green-100">
            <div className="text-3xl mb-2">2️⃣</div>
            <h3 className="font-heading font-bold text-gray-900 mb-2">Set Discount</h3>
            <p className="text-sm text-gray-600">Enter original price & discount % - final price calculates automatically</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-purple-100">
            <div className="text-3xl mb-2">3️⃣</div>
            <h3 className="font-heading font-bold text-gray-900 mb-2">Choose Theme</h3>
            <p className="text-sm text-gray-600">Pick a design: National Day 🇸🇦, Founding Day 🏛️, or Black Friday 🔥</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-100 border-2 border-green-300 rounded-xl">
          <p className="text-sm text-gray-700">
            <strong>📝 Example:</strong> SMS Package (5000 SAR) + 20% Discount = <strong>4000 SAR</strong> 
            + National Day Theme 🇸🇦 = <strong>Beautiful themed offer card!</strong>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wide">
          Offers Management
        </h1>
        <div className="flex gap-3">
          <button
            onClick={openCategoryModal}
            className="bg-secondary text-primary px-6 py-3 rounded-lg font-heading font-semibold hover:bg-secondary/80 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Manage Categories
          </button>
          <button
            onClick={openCreateModal}
            className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Offer
          </button>
        </div>
      </div>

      {/* Stats */}
      {offers.length > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary/10 to-blue-400/10 rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Offers</p>
                <p className="text-2xl font-heading font-bold text-gray-900">{offers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-400/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Active</p>
                <p className="text-2xl font-heading font-bold text-gray-900">
                  {offers.filter(o => o.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Featured</p>
                <p className="text-2xl font-heading font-bold text-gray-900">
                  {offers.filter(o => o.featured).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offers Grid */}
      <div>
        {offers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">No Offers Yet</h3>
            <p className="text-gray-600 mb-6">Create your first offer to get started</p>
            <button
              onClick={openCreateModal}
              className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-bold uppercase hover:bg-primary/90 transition-colors"
            >
              Create First Offer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  item.isActive
                    ? 'border-gray-200 hover:border-primary'
                    : 'border-gray-300 opacity-60'
                } overflow-hidden`}
              >
                {/* Image */}
                {item.image && (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-heading uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(item)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          item.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(item._id!)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                <AnimatePresence>
                  {deleteConfirm === item._id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center p-6"
                    >
                      <div className="bg-white rounded-xl p-6 text-center max-w-sm">
                        <h4 className="text-lg font-heading font-bold text-gray-900 mb-2">
                          Delete Offer?
                        </h4>
                        <p className="text-sm text-gray-600 mb-6">
                          This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(item._id!)}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Offer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <OfferModal
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            packages={packages}
            onSubmit={handleSubmit}
            onClose={() => {
              setIsModalOpen(false);
              setEditingOffer(null);
              setFormData(emptyOffer);
            }}
            isEditing={!!editingOffer}
          />
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <CategoryModal
            formData={categoryFormData}
            setFormData={setCategoryFormData}
            categories={categories}
            onSubmit={handleCategorySubmit}
            onDelete={editingCategory ? () => handleCategoryDelete(editingCategory._id!) : undefined}
            onClose={() => {
              setIsCategoryModalOpen(false);
              setEditingCategory(null);
              setCategoryFormData({ name: '', nameAr: '', slug: '', type: 'offer', isActive: true });
            }}
            isEditing={!!editingCategory}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

// Offer Modal Component
function OfferModal({
  formData,
  setFormData,
  categories,
  packages,
  onSubmit,
  onClose,
  isEditing,
}: {
  formData: Offer;
  setFormData: (data: Offer) => void;
  categories: Category[];
  packages: Package[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isEditing: boolean;
}) {
  const calculateDiscountedPrice = (original: number, discount: number) => {
    return Math.round(original - (original * discount / 100));
  };

  const handleDiscountChange = (discount: number) => {
    const discounted = formData.originalPrice 
      ? calculateDiscountedPrice(formData.originalPrice, discount)
      : 0;
    setFormData({ 
      ...formData, 
      discountPercentage: discount,
      discountedPrice: discounted
    });
  };

  const handleOriginalPriceChange = (price: number) => {
    const discounted = formData.discountPercentage
      ? calculateDiscountedPrice(price, formData.discountPercentage)
      : price;
    setFormData({ 
      ...formData, 
      originalPrice: price,
      discountedPrice: discounted
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-heading font-bold text-gray-900 uppercase">
              {isEditing ? 'Edit Offer' : 'Create Offer'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title EN & AR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Title (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.titleAr || ''}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Description EN & AR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Description (English)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-none"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Description (Arabic)
                </label>
                <textarea
                  value={formData.descriptionAr || ''}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-none"
                  dir="rtl"
                  rows={3}
                />
              </div>
            </div>

            {/* Category & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="offer-slug"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-4">
                  <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Package Selection & Theme */}
            <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3 uppercase flex items-center gap-2">
                📦 Package & Theme Selection
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                💡 <strong>How it works:</strong> Select an existing package (SMS, WhatsApp, etc.) to link this offer to. 
                The offer will display the package details with your discount. Choose a theme for special occasions!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                    📦 Select Package
                  </label>
                  <select
                    value={formData.packageId || ''}
                    onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-primary focus:outline-none bg-white"
                  >
                    <option value="">No Package (Custom Offer)</option>
                    {packages.map((pkg) => (
                      <option key={pkg._id} value={pkg.id}>
                        📦 {pkg.name} / {pkg.nameAr}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.packageId ? '✅ Package linked - features will show automatically' : '⚠️ No package linked - manual description needed'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                    🎨 Theme Design
                  </label>
                  <select
                    value={formData.theme || 'custom'}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-primary focus:outline-none bg-white"
                  >
                    <option value="custom">🎁 Custom (Default ORBIT Colors)</option>
                    <option value="national-day">🇸🇦 National Day - اليوم الوطني (Green/White)</option>
                    <option value="founding-day">🏛️ Founding Day - يوم التأسيس (Brown/Beige)</option>
                    <option value="black-friday">🔥 Black Friday - الجمعة البيضاء (Black/Gray)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Themed cards have special colors and icons
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3 uppercase flex items-center gap-2">
                💰 Discount & Pricing Calculator
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                💡 <strong>Example:</strong> SMS package costs <strong>5000 SAR</strong>, add <strong>20% discount</strong> → 
                Final price: <strong>4000 SAR</strong> (Customer saves 1000 SAR!)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                    💵 Original Price (SAR)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., 5000"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Package original price</p>
                </div>
                <div>
                  <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                    🏷️ Discount %
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercentage || ''}
                    onChange={(e) => handleDiscountChange(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="e.g., 20"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Discount percentage</p>
                </div>
                <div>
                  <label className="block text-sm font-heading font-bold uppercase tracking-wider text-green-700 mb-2">
                    ✅ Final Price (SAR)
                  </label>
                  <input
                    type="number"
                    value={formData.discountedPrice || ''}
                    onChange={(e) => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-green-500 rounded-lg bg-green-100 focus:border-primary focus:outline-none font-bold text-green-700 text-xl"
                    placeholder="Auto-calculated"
                    min="0"
                  />
                  <p className="text-xs text-green-600 mt-1 font-bold">Customer pays this amount</p>
                </div>
              </div>
              {formData.originalPrice && formData.discountPercentage ? (
                <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-green-700 font-heading text-center">
                    💰 Customer saves: <strong>{formData.originalPrice - (formData.discountedPrice || 0)} SAR</strong> ({formData.discountPercentage}% discount)
                  </p>
                </div>
              ) : null}
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Start Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value ? new Date(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value ? new Date(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg font-heading font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
            >
              {isEditing ? 'Update Offer' : 'Create Offer'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Category Modal Component (same as News)
function CategoryModal({
  formData,
  setFormData,
  categories,
  onSubmit,
  onDelete,
  onClose,
  isEditing,
}: {
  formData: Category;
  setFormData: (data: Category) => void;
  categories: Category[];
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  onClose: () => void;
  isEditing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
      >
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-heading font-bold text-gray-900 uppercase">
              {isEditing ? 'Edit Category' : 'Create Category'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Name EN & AR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Name (English)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Name (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.nameAr || ''}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-heading font-bold uppercase tracking-wider text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                placeholder="category-slug"
                required
              />
            </div>

            {/* Active */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-heading font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

