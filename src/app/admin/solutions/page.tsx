'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

interface SolutionFeature {
  en: string;
  ar: string;
  icon: string;
}

interface Solution {
  _id?: string;
  slug: 'sms-platform' | 'whatsapp-business-api' | 'otime' | 'gov-gate';
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  heroImage?: string;
  features: SolutionFeature[];
  benefits?: {
    en: string[];
    ar: string[];
  };
  useCases?: {
    en: string[];
    ar: string[];
  };
  isActive: boolean;
  order: number;
}

const SLUG_OPTIONS = [
  { value: 'sms-platform', label: 'SMS Platform' },
  { value: 'whatsapp-business-api', label: 'WhatsApp Business API' },
  { value: 'otime', label: 'OTime' },
  { value: 'gov-gate', label: 'Gov Gate' },
];

export default function SolutionsAdmin() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [formData, setFormData] = useState<Solution>({
    slug: 'sms-platform',
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    features: [{ en: '', ar: '', icon: '' }],
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const res = await fetch('/api/solutions?admin=true');
      const data = await res.json();
      const fetchedSolutions = data.solutions || [];
      
      // If no solutions exist, seed them automatically
      if (fetchedSolutions.length === 0) {
        toast.loading('No solutions found. Seeding default solutions...', { id: 'seeding' });
        const seedRes = await fetch('/api/solutions/seed', { method: 'POST' });
        if (seedRes.ok) {
          const seedData = await seedRes.json();
          toast.success(`Successfully imported ${seedData.count} solutions!`, { id: 'seeding' });
          // Fetch again after seeding
          const newRes = await fetch('/api/solutions?admin=true');
          const newData = await newRes.json();
          setSolutions(newData.solutions || []);
        } else {
          toast.error('Failed to seed solutions. Please try manually.', { id: 'seeding' });
        }
      } else {
        setSolutions(fetchedSolutions);
      }
    } catch (error) {
      toast.error('Failed to fetch solutions');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSolution?._id
        ? `/api/solutions/${editingSolution._id}`
        : '/api/solutions';
      const method = editingSolution?._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingSolution?._id ? 'Solution updated!' : 'Solution created!');
        fetchSolutions();
        closeModal();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save solution');
      }
    } catch (error) {
      toast.error('Failed to save solution');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/solutions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });

      if (res.ok) {
        toast.success(isActive ? 'Solution enabled!' : 'Solution disabled!');
        fetchSolutions();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to update solution');
      }
    } catch (error) {
      toast.error('Failed to update solution');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return;

    try {
      const res = await fetch(`/api/solutions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Solution deleted!');
        fetchSolutions();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to delete solution');
      }
    } catch (error) {
      toast.error('Failed to delete solution');
    }
  };

  const openModal = (solution?: Solution) => {
    if (solution) {
      setEditingSolution(solution);
      setFormData(solution);
    } else {
      setEditingSolution(null);
      setFormData({
        slug: 'sms-platform',
        title: { en: '', ar: '' },
        description: { en: '', ar: '' },
        features: [{ en: '', ar: '', icon: '' }],
        isActive: true,
        order: solutions.length,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSolution(null);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { en: '', ar: '', icon: '' }],
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, field: keyof SolutionFeature, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const addBenefit = (lang: 'en' | 'ar') => {
    const benefits = formData.benefits || { en: [], ar: [] };
    setFormData({
      ...formData,
      benefits: {
        ...benefits,
        [lang]: [...benefits[lang], ''],
      },
    });
  };

  const updateBenefit = (lang: 'en' | 'ar', index: number, value: string) => {
    const benefits = formData.benefits || { en: [], ar: [] };
    const newBenefits = [...benefits[lang]];
    newBenefits[index] = value;
    setFormData({
      ...formData,
      benefits: {
        ...benefits,
        [lang]: newBenefits,
      },
    });
  };

  const removeBenefit = (lang: 'en' | 'ar', index: number) => {
    const benefits = formData.benefits || { en: [], ar: [] };
    setFormData({
      ...formData,
      benefits: {
        ...benefits,
        [lang]: benefits[lang].filter((_, i) => i !== index),
      },
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-xl font-heading text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wide">
          Solutions Management
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Solution
        </button>
      </div>

      {solutions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500  text-lg mb-4">No solutions found</p>
          <p className="text-gray-400  text-sm mb-6">Import existing solutions from your pages</p>
          <button
            onClick={async () => {
              try {
                toast.loading('Importing solutions...', { id: 'import' });
                const res = await fetch('/api/solutions/seed', { method: 'POST' });
                if (res.ok) {
                  const data = await res.json();
                  toast.success(`Successfully imported ${data.count} solutions!`, { id: 'import' });
                  fetchSolutions();
                } else {
                  const error = await res.json();
                  toast.error(error.error || 'Failed to import solutions', { id: 'import' });
                }
              } catch (error) {
                toast.error('Failed to import solutions', { id: 'import' });
              }
            }}
            className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
          >
            Import Existing Solutions
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution) => (
            <div
              key={solution._id}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 ${
                solution.isActive ? 'border-primary' : 'border-gray-300 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-1">
                    {solution.title.en}
                  </h3>
                  <p className="text-xs text-gray-500  uppercase tracking-wide mb-2">
                    {solution.slug}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-heading font-semibold ${
                        solution.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {solution.isActive ? '✓ Active' : '✗ Inactive'}
                    </span>
                    <span className="text-xs text-gray-400 ">
                      Order: {solution.order}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4  line-clamp-2">
                {solution.description.en}
              </p>
              {solution.features && solution.features.length > 0 && (
                <p className="text-xs text-gray-500  mb-4">
                  {solution.features.length} feature{solution.features.length !== 1 ? 's' : ''}
                </p>
              )}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openModal(solution)}
                  className="w-full bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-heading font-semibold"
                >
                  Edit
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => solution._id && handleToggleActive(solution._id, !solution.isActive)}
                    className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-heading font-semibold ${
                      solution.isActive
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {solution.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => solution._id && handleDelete(solution._id)}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-heading font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                {editingSolution ? 'Edit Solution' : 'Create Solution'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                    Slug *
                  </label>
                  <select
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value as Solution['slug'] })}
                    className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    required
                    disabled={!!editingSolution}
                  >
                    {SLUG_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                    className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                    Title (Arabic) *
                  </label>
                  <input
                    type="text"
                    value={formData.title.ar}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ar: e.target.value } })}
                    className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                    Description (English) *
                  </label>
                  <textarea
                    value={formData.description.en}
                    onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                    Description (Arabic) *
                  </label>
                  <textarea
                    value={formData.description.ar}
                    onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ar: e.target.value } })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                  Hero Image URL
                </label>
                <input
                  type="url"
                  value={formData.heroImage || ''}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-heading font-semibold text-gray-700">
                    Features *
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-secondary text-primary px-4 py-2 rounded-lg font-heading font-semibold hover:bg-secondary/80 transition-colors text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="border-2 border-neutral/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-heading font-semibold text-gray-700">
                          Feature {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-heading font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="English"
                          value={feature.en}
                          onChange={(e) => updateFeature(index, 'en', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                        />
                        <input
                          type="text"
                          placeholder="Arabic"
                          value={feature.ar}
                          onChange={(e) => updateFeature(index, 'ar', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                        />
                        <input
                          type="text"
                          placeholder="Icon (emoji)"
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-heading font-semibold text-gray-700">Active</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-heading font-bold hover:bg-primary/90 transition-colors"
                >
                  {editingSolution ? 'Update Solution' : 'Create Solution'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-heading font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

