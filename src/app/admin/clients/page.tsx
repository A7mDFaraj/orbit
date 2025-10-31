'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

interface Client {
  _id: string;
  name: string;
  logo?: string;
  category: string;
  description?: string;
  blogText?: string;
  workImages?: string[];
  services?: string[];
  slug?: string;
  order: number;
  isActive: boolean;
}

const categories = [
  'Automotive',
  'Communication',
  'Corporate',
  'Food & Beverages',
  'Construction & Real Estate',
  'Health',
  'Governmental',
  'Fashion & Beauty',
  'Home & Furniture',
  'Hospitality & Entertainment',
  'Sports',
];

export default function ClientsAdmin() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    category: 'Corporate',
    description: '',
    blogText: '',
    workImages: [] as string[],
    workVideo: [] as string[],
    services: [] as string[],
    slug: '',
    order: 0,
    isActive: true,
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newService, setNewService] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClients(data.clients || []);
    } catch (error) {
      toast.error('Failed to fetch clients');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingClient
        ? `/api/clients/${editingClient._id}`
        : '/api/clients';
      const method = editingClient ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingClient ? 'Client updated!' : 'Client created!');
        fetchClients();
        closeModal();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Client deleted!');
        fetchClients();
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const openModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        logo: client.logo || '',
        category: client.category,
        description: client.description || '',
        blogText: client.blogText || '',
        workImages: client.workImages || [],
        workVideo: Array.isArray((client as any).workVideo) ? (client as any).workVideo : ((client as any).workVideo ? [(client as any).workVideo] : []),
        services: client.services || [],
        slug: client.slug || '',
        order: client.order,
        isActive: client.isActive,
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        logo: '',
        category: 'Corporate',
        description: '',
        blogText: '',
        workImages: [],
        workVideo: [],
        services: [],
        slug: '',
        order: clients.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  // Universal URL converter for Google Drive, Imgur, and other hosted media
  const convertMediaUrl = (url: string, isVideo: boolean = false): string => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return trimmedUrl;
    
    // ===== GOOGLE DRIVE CONVERSION =====
    let fileId: string | null = null;
    
    // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const driveFormat1 = trimmedUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveFormat1) {
      fileId = driveFormat1[1];
    }
    
    // Format 2: https://drive.google.com/open?id=FILE_ID
    if (!fileId) {
      const driveFormat2 = trimmedUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (driveFormat2 && trimmedUrl.includes('drive.google.com')) {
        fileId = driveFormat2[1];
      }
    }
    
    // Format 3: Already converted Google Drive format
    if (!fileId) {
      const driveFormat3 = trimmedUrl.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
      if (driveFormat3) {
        return trimmedUrl; // Already converted
      }
    }
    
    if (fileId) {
      // Use Google Drive embed/preview URLs which are more reliable
      if (isVideo) {
        // For videos, use preview embed URL
        return `https://drive.google.com/file/d/${fileId}/preview`;
      } else {
        // For images, use thumbnail API with high resolution
        // This format works more reliably than uc?export=view
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920-h1080`;
      }
    }
    
    // ===== IMGUR CONVERSION =====
    // Gallery: https://imgur.com/gallery/IMAGE_ID → https://i.imgur.com/IMAGE_ID.jpg
    const imgurGallery = trimmedUrl.match(/imgur\.com\/gallery\/([a-zA-Z0-9]+)/);
    if (imgurGallery) {
      const imageId = imgurGallery[1];
      // Imgur direct links use .jpg extension (most common)
      return `https://i.imgur.com/${imageId}.jpg`;
    }
    
    // Album: https://imgur.com/a/ALBUM_ID (can't convert without API)
    if (trimmedUrl.includes('imgur.com/a/')) {
      toast.error('Imgur albums need individual image links. Right-click image → Copy image address');
      return trimmedUrl;
    }
    
    // Direct Imgur: https://i.imgur.com/IMAGE_ID.jpg (already correct)
    if (trimmedUrl.includes('i.imgur.com')) {
      return trimmedUrl; // Already direct link
    }
    
    // ===== DROPBOX CONVERSION =====
    // https://www.dropbox.com/s/FILE_ID/FILENAME?dl=0 → https://www.dropbox.com/s/FILE_ID/FILENAME?dl=1
    if (trimmedUrl.includes('dropbox.com') && trimmedUrl.includes('?dl=0')) {
      return trimmedUrl.replace('?dl=0', '?dl=1');
    }
    
    // ===== DIRECT IMAGE/VIDEO URLS (already correct) =====
    // Check if URL already points to a media file
    const directMediaPattern = /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mov)(\?.*)?$/i;
    if (directMediaPattern.test(trimmedUrl)) {
      return trimmedUrl; // Already a direct media URL
    }
    
    // ===== OTHER HOSTING SERVICES =====
    // For other services, return as-is (they should provide direct links)
    return trimmedUrl;
  };

  const addWorkImage = () => {
    if (newImageUrl.trim()) {
      const convertedUrl = convertMediaUrl(newImageUrl, false);
      setFormData({
        ...formData,
        workImages: [...formData.workImages, convertedUrl],
      });
      setNewImageUrl('');
      if (newImageUrl.includes('drive.google.com') || newImageUrl.includes('imgur.com')) {
        toast.success('Image added! Link converted.');
      } else {
        toast.success('Image added!');
      }
    }
  };

  const addWorkVideo = () => {
    if (newVideoUrl.trim()) {
      const convertedUrl = convertMediaUrl(newVideoUrl, true);
      setFormData({
        ...formData,
        workVideo: [...formData.workVideo, convertedUrl],
      });
      setNewVideoUrl('');
      if (newVideoUrl.includes('drive.google.com') || newVideoUrl.includes('imgur.com')) {
        toast.success('Video added! Link converted.');
      } else {
        toast.success('Video added!');
      }
    }
  };

  const removeWorkVideo = (index: number) => {
    setFormData({
      ...formData,
      workVideo: formData.workVideo.filter((_, i) => i !== index),
    });
  };

  const removeWorkImage = (index: number) => {
    setFormData({
      ...formData,
      workImages: formData.workImages.filter((_, i) => i !== index),
    });
  };

  const addService = () => {
    if (newService.trim()) {
      setFormData({
        ...formData,
        services: [...formData.services, newService.trim()],
      });
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Portfolio Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {clients.map((client) => (
          <div
            key={client._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  client.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {client.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{client.category}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(client)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(client._id)}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No clients yet. Add one!</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingClient ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => {
                    const url = e.target.value;
                    const convertedUrl = convertMediaUrl(url, false);
                    setFormData({ ...formData, logo: convertedUrl });
                    if ((url.includes('drive.google.com') || url.includes('imgur.com')) && url !== convertedUrl) {
                      toast.success('Logo link converted!');
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                  placeholder="https://example.com/logo.png or any hosting service link"
                />
                {(formData.logo.includes('drive.google.com') || formData.logo.includes('imgur.com')) && (
                  <p className="text-xs text-blue-600 mt-1">✓ Links are automatically converted to direct URLs</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                  rows={3}
                  placeholder="Brief description of the client project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details (Optional - Rich Text Editor)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Use the toolbar above to format your text with bold, bullets, headings, and more. This will be shown in an expandable section in the portfolio modal.
                </p>
                <RichTextEditor
                  value={formData.blogText}
                  onChange={(value) => setFormData({ ...formData, blogText: value })}
                  placeholder="Start typing your project details here. Use the toolbar to format text, add lists, headings, and more..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (Optional - for shareable URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white !text-gray-900 !bg-white"
                  placeholder="client-name-slug"
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly identifier. Leave empty to auto-generate from name.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Videos (Portfolio Gallery)
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWorkVideo())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white !text-gray-900 !bg-white"
                      placeholder="https://example.com/video.mp4 or Google Drive link"
                    />
                    <button
                      type="button"
                      onClick={addWorkVideo}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                    >
                      + Add
                    </button>
                  </div>
                  {(newVideoUrl.includes('drive.google.com') || newVideoUrl.includes('imgur.com')) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">
                      <strong>💡 Tip:</strong> Google Drive and Imgur links will be automatically converted to direct video URLs.
                    </div>
                  )}
                  {formData.workVideo.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                      {formData.workVideo.map((video, idx) => (
                        <div key={idx} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                          <video
                            src={video}
                            className="w-full h-32 object-cover"
                            muted
                            playsInline
                            onError={(e) => {
                              (e.target as HTMLVideoElement).style.display = 'none';
                              const errorDiv = document.createElement('div');
                              errorDiv.className = 'w-full h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500';
                              errorDiv.textContent = 'Video Preview';
                              (e.target as HTMLVideoElement).parentElement?.appendChild(errorDiv);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeWorkVideo(idx)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg transition-all opacity-100 group-hover:scale-110"
                            title="Delete video"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Video {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Add multiple videos to showcase your work. Click on videos to delete them.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Images (Portfolio Gallery)
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWorkImage())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white !text-gray-900 !bg-white"
                      placeholder="https://example.com/image.jpg or Google Drive link"
                    />
                    <button
                      type="button"
                      onClick={addWorkImage}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                    >
                      + Add
                    </button>
                  </div>
                  {(newImageUrl.includes('drive.google.com') || newImageUrl.includes('imgur.com')) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">
                      <strong>💡 Tip:</strong> Google Drive and Imgur links will be automatically converted to direct image URLs.
                    </div>
                  )}
                  {formData.workImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                      {formData.workImages.map((img, idx) => (
                        <div key={idx} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`Work ${idx + 1}`}
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeWorkImage(idx)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg transition-all opacity-100 group-hover:scale-110"
                            title="Delete image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Image {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Add multiple images to showcase your work with this client. Click on images to delete them.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Provided
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white !text-gray-900 !bg-white"
                      placeholder="e.g., Branding & Identity"
                    />
                    <button
                      type="button"
                      onClick={addService}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                    >
                      + Add
                    </button>
                  </div>
                  {formData.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => removeService(idx)}
                            className="text-blue-600 hover:text-blue-900 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                  {editingClient ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

