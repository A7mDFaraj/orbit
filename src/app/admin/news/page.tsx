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

interface News {
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
  publishedAt?: Date;
  order: number;
}

const emptyNews: News = {
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
};

export default function NewsAdmin() {
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<News>(emptyNews);
  const [categoryFormData, setCategoryFormData] = useState<Category>({
    name: '',
    nameAr: '',
    slug: '',
    type: 'news',
    isActive: true,
  });

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news?admin=true');
      const data = await res.json();
      setNews(data.news || []);
    } catch (error) {
      toast.error('Failed to fetch news');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories?type=news&admin=true');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingNews?._id
        ? `/api/news/${editingNews._id}`
        : '/api/news';

      const method = editingNews?._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save news');
      }

      toast.success(editingNews?._id ? 'News updated successfully!' : 'News created successfully!');
      setIsModalOpen(false);
      setEditingNews(null);
      setFormData(emptyNews);
      fetchNews();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save news');
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
      setCategoryFormData({ name: '', nameAr: '', slug: '', type: 'news', isActive: true });
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('News deleted successfully!');
      fetchNews();
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete news');
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

  const toggleActive = async (item: News) => {
    try {
      const res = await fetch(`/api/news/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isActive: !item.isActive }),
      });
      if (res.ok) {
        toast.success(item.isActive ? 'News deactivated' : 'News activated');
        fetchNews();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openCreateModal = () => {
    setEditingNews(null);
    setFormData(emptyNews);
    setIsModalOpen(true);
  };

  const openEditModal = (item: News) => {
    setEditingNews(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const openCategoryModal = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', nameAr: '', slug: '', type: 'news', isActive: true });
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wide">
          News Management
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
            Add News
          </button>
        </div>
      </div>

      {/* Stats */}
      {news.length > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary/10 to-blue-400/10 rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total News</p>
                <p className="text-2xl font-heading font-bold text-gray-900">{news.length}</p>
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
                  {news.filter(n => n.isActive).length}
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
                  {news.filter(n => n.featured).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div>
        {news.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">No News Yet</h3>
            <p className="text-gray-600 mb-6">Create your first news article to get started</p>
            <button
              onClick={openCreateModal}
              className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-bold uppercase hover:bg-primary/90 transition-colors"
            >
              Create First News
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
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
                          Delete News?
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

      {/* News Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <NewsModal
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            onSubmit={handleSubmit}
            onClose={() => {
              setIsModalOpen(false);
              setEditingNews(null);
              setFormData(emptyNews);
            }}
            isEditing={!!editingNews}
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
              setCategoryFormData({ name: '', nameAr: '', slug: '', type: 'news', isActive: true });
            }}
            isEditing={!!editingCategory}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

// News Modal Component
function NewsModal({
  formData,
  setFormData,
  categories,
  onSubmit,
  onClose,
  isEditing,
}: {
  formData: News;
  setFormData: (data: News) => void;
  categories: Category[];
  onSubmit: (e: React.FormEvent) => void;
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
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-heading font-bold text-gray-900 uppercase">
              {isEditing ? 'Edit News' : 'Create News'}
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
                  placeholder="news-slug"
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
              {isEditing ? 'Update News' : 'Create News'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Category Modal Component
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

