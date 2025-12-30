'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface Partner {
  _id?: string;
  name: string;
  logo: string;
  website?: string;
  isActive: boolean;
  order: number;
}

export default function PartnersAdmin() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Partner>({
    name: '',
    logo: '',
    website: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/partners?admin=true');
      const data = await res.json();
      setPartners(data.partners || []);
    } catch (error) {
      toast.error('Failed to fetch partners');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPartner?._id
        ? `/api/partners/${editingPartner._id}`
        : '/api/partners';
      const method = editingPartner?._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingPartner?._id ? 'Partner updated!' : 'Partner created!');
        fetchPartners();
        closeModal();
      } else {
        toast.error(data.error || 'Failed to save partner');
      }
    } catch (error) {
      toast.error('Failed to save partner');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isActive ? 'Partner enabled!' : 'Partner disabled!');
        fetchPartners();
      } else {
        toast.error(data.error || 'Failed to update partner');
      }
    } catch (error) {
      toast.error('Failed to update partner');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Partner deleted!');
        fetchPartners();
      } else {
        toast.error(data.error || 'Failed to delete partner');
      }
    } catch (error) {
      toast.error('Failed to delete partner');
    }
  };

  const openModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData(partner);
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        logo: '',
        website: '',
        isActive: true,
        order: partners.length,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPartner(null);
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
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wide">
            شركاء النجاح / Success Partners
          </h1>
          <p className="text-gray-600 mt-2">
            Manage partner logos displayed in the infinite scrolling marquee at the bottom of the Hero section. 
            Only <strong>Active</strong> partners will appear in the marquee. Use <strong>Order</strong> to control display sequence.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Partner
        </button>
      </div>

      {/* Active Partners Preview - Shows what appears in marquee */}
      {partners.filter(p => p.isActive).length > 0 && (
        <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border-2 border-primary/20">
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
            Active Partners (Currently in Marquee)
          </h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {partners
              .filter(p => p.isActive)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((partner) => (
                <div
                  key={partner._id}
                  className="flex-shrink-0 w-32 h-24 bg-white rounded-lg p-3 shadow-md flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            These {partners.filter(p => p.isActive).length} active partner(s) are currently displayed in the Hero section marquee
          </p>
        </div>
      )}

      {partners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500 text-lg mb-4">No partners found</p>
          <p className="text-gray-400 text-sm mb-6">
            Add partner logos to display in the infinite scrolling marquee at the bottom of the Hero section.
            <br />
            <span className="text-xs text-gray-500 mt-2 block">
              Partners will scroll horizontally. Set &quot;Active&quot; to show them in the marquee.
            </span>
          </p>
          <button
            onClick={() => openModal()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors"
          >
            + Add First Partner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 ${
                partner.isActive ? 'border-primary' : 'border-gray-300 opacity-75'
              }`}
            >
              <div className="mb-4">
                <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-1">
                  {partner.name}
                </h3>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    {partner.website}
                  </a>
                )}
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-heading font-semibold ${
                      partner.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {partner.isActive ? '✓ Active (Shown in marquee)' : '✗ Inactive (Hidden)'}
                  </span>
                  <span className="text-xs text-gray-400">
                    Order: {partner.order} (Lower = appears first)
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openModal(partner)}
                  className="w-full bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-heading font-semibold"
                >
                  Edit
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => partner._id && handleToggleActive(partner._id, !partner.isActive)}
                    className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-heading font-semibold ${
                      partner.isActive
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {partner.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => partner._id && handleDelete(partner._id)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                {editingPartner ? 'Edit Partner' : 'Add Partner'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                  placeholder="e.g., National Water Company"
                />
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                  Logo URL *
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                  placeholder="/trustedby/logo.png or https://example.com/logo.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload logo to /public/trustedby/ folder or use external URL
                </p>
                {formData.logo && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Preview:</p>
                    <div className="w-full h-32 bg-white rounded border flex items-center justify-center">
                      <img
                        src={formData.logo}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '';
                          e.currentTarget.alt = 'Failed to load image';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="https://partner-website.com"
                />
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-neutral/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first in the marquee
                </p>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-heading font-semibold text-gray-700">Active (Show in marquee)</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-heading font-bold hover:bg-primary/90 transition-colors"
                >
                  {editingPartner ? 'Update Partner' : 'Create Partner'}
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

