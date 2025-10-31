'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) {
      toast.error('Failed to fetch FAQs');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingFaq ? `/api/faqs/${editingFaq._id}` : '/api/faqs';
      const method = editingFaq ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingFaq ? 'FAQ updated!' : 'FAQ created!');
        fetchFaqs();
        closeModal();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('FAQ deleted!');
        fetchFaqs();
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const openModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
        isActive: faq.isActive,
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answer: '',
        order: faqs.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex-1 pr-4">
                {faq.question}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  faq.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {faq.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{faq.answer}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(faq)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(faq._id)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No FAQs yet. Add one!</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Active
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {editingFaq ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

