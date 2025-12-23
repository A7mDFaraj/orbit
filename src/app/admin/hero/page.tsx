'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface HeroSettings {
  _id?: string;
  title: string;
  titleAr: string;
  subtitle1: string;
  subtitle1Ar: string;
  subtitle2: string;
  subtitle2Ar: string;
  subtitle3: string;
  subtitle3Ar: string;
  description: string;
  descriptionAr: string;
  cta1: string;
  cta1Ar: string;
  cta2: string;
  cta2Ar: string;
}

export default function HeroPage() {
  const [settings, setSettings] = useState<HeroSettings>({
    title: '',
    titleAr: '',
    subtitle1: '',
    subtitle1Ar: '',
    subtitle2: '',
    subtitle2Ar: '',
    subtitle3: '',
    subtitle3Ar: '',
    description: '',
    descriptionAr: '',
    cta1: '',
    cta1Ar: '',
    cta2: '',
    cta2Ar: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/hero-settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      toast.error('Failed to fetch hero settings');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/hero-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('Hero settings updated successfully!');
      } else {
        toast.error('Failed to update hero settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof HeroSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase">
            Hero <span className="text-primary">Section</span>
          </h1>
          <p className="text-gray-600">
            Update the hero section content for both English and Arabic versions.
            <br />
            <span className="text-primary font-semibold">Note:</span> You need to update both English and Arabic separately.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">📝</span> Main Title
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Creative Marketing Solutions"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                  Title (العربية)
                </label>
                <input
                  type="text"
                  value={settings.titleAr}
                  onChange={(e) => handleChange('titleAr', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                  placeholder="حلول تسويقية إبداعية"
                  required
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Subtitles Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-secondary">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Subtitles (3 Tags)
            </h2>
            <div className="space-y-6">
              {/* Subtitle 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Subtitle 1 (English)
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle1}
                    onChange={(e) => handleChange('subtitle1', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="REAL ESTATE"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Subtitle 1 (العربية)
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle1Ar}
                    onChange={(e) => handleChange('subtitle1Ar', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                    placeholder="العقارات"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Subtitle 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Subtitle 2 (English)
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle2}
                    onChange={(e) => handleChange('subtitle2', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="ADVERTISING"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Subtitle 2 (العربية)
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle2Ar}
                    onChange={(e) => handleChange('subtitle2Ar', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                    placeholder="الإعلان"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Subtitle 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Subtitle 3 (English)
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle3}
                    onChange={(e) => handleChange('subtitle3', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="EVENTS"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Subtitle 3 (العربية)
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle3Ar}
                    onChange={(e) => handleChange('subtitle3Ar', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                    placeholder="الفعاليات"
                    required
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">📄</span> Description
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                  Description (English)
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Leading Saudi entity in creative marketing solutions..."
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                  Description (العربية)
                </label>
                <textarea
                  value={settings.descriptionAr}
                  onChange={(e) => handleChange('descriptionAr', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                  placeholder="كيان سعودي رائد في الحلول التسويقية الإبداعية..."
                  rows={4}
                  required
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-secondary">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">🔘</span> Call-to-Action Buttons
            </h2>
            <div className="space-y-6">
              {/* CTA 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Button 1 Text (English)
                  </label>
                  <input
                    type="text"
                    value={settings.cta1}
                    onChange={(e) => handleChange('cta1', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Request Quote"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Button 1 Text (العربية)
                  </label>
                  <input
                    type="text"
                    value={settings.cta1Ar}
                    onChange={(e) => handleChange('cta1Ar', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                    placeholder="اطلب عرض سعر"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              {/* CTA 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Button 2 Text (English)
                  </label>
                  <input
                    type="text"
                    value={settings.cta2}
                    onChange={(e) => handleChange('cta2', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Our Services"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Button 2 Text (العربية)
                  </label>
                  <input
                    type="text"
                    value={settings.cta2Ar}
                    onChange={(e) => handleChange('cta2Ar', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-right"
                    placeholder="خدماتنا"
                    required
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={fetchSettings}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-all uppercase"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

