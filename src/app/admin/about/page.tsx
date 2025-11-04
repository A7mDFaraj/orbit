'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface AboutSettings {
  _id?: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  vision: string;
  visionAr: string;
  visionText: string;
  visionTextAr: string;
  mission: string;
  missionAr: string;
  missionText: string;
  missionTextAr: string;
  unique: string;
  uniqueAr: string;
}

export default function AboutPage() {
  const [settings, setSettings] = useState<AboutSettings>({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    vision: '',
    visionAr: '',
    visionText: '',
    visionTextAr: '',
    mission: '',
    missionAr: '',
    missionText: '',
    missionTextAr: '',
    unique: '',
    uniqueAr: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/about-settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      toast.error('Failed to fetch about settings');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/about-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('About settings updated successfully!');
      } else {
        toast.error('Failed to update about settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof AboutSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-gray-600">
            Update the About Us section content for both English and Arabic versions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase border-b pb-3">
              Main Section
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (Arabic)
                </label>
                <input
                  type="text"
                  value={settings.titleAr}
                  onChange={(e) => handleChange('titleAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  dir="rtl"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (English)
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Arabic)
                </label>
                <textarea
                  value={settings.descriptionAr}
                  onChange={(e) => handleChange('descriptionAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  dir="rtl"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase border-b pb-3">
              Vision Card
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vision Title (English)
                </label>
                <input
                  type="text"
                  value={settings.vision}
                  onChange={(e) => handleChange('vision', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vision Title (Arabic)
                </label>
                <input
                  type="text"
                  value={settings.visionAr}
                  onChange={(e) => handleChange('visionAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  dir="rtl"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vision Text (English)
                </label>
                <textarea
                  value={settings.visionText}
                  onChange={(e) => handleChange('visionText', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vision Text (Arabic)
                </label>
                <textarea
                  value={settings.visionTextAr}
                  onChange={(e) => handleChange('visionTextAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  dir="rtl"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase border-b pb-3">
              Mission Card
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mission Title (English)
                </label>
                <input
                  type="text"
                  value={settings.mission}
                  onChange={(e) => handleChange('mission', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mission Title (Arabic)
                </label>
                <input
                  type="text"
                  value={settings.missionAr}
                  onChange={(e) => handleChange('missionAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  dir="rtl"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mission Text (English)
                </label>
                <textarea
                  value={settings.missionText}
                  onChange={(e) => handleChange('missionText', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mission Text (Arabic)
                </label>
                <textarea
                  value={settings.missionTextAr}
                  onChange={(e) => handleChange('missionTextAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  dir="rtl"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Unique Section Title */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase border-b pb-3">
              What Makes Us Unique - Section Title
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Section Title (English)
                </label>
                <input
                  type="text"
                  value={settings.unique}
                  onChange={(e) => handleChange('unique', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Section Title (Arabic)
                </label>
                <input
                  type="text"
                  value={settings.uniqueAr}
                  onChange={(e) => handleChange('uniqueAr', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

