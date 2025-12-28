'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface Promise {
  textEn: string;
  textAr: string;
}

interface Stat {
  number: string;
  labelEn: string;
  labelAr: string;
}

interface Feature {
  textEn: string;
  textAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

interface MainPageSettings {
  hero: {
    titleEn: string;
    titleAr: string;
  };
  about: {
    visionTitleEn: string;
    visionTitleAr: string;
    visionTextEn: string;
    visionTextAr: string;
    missionTitleEn: string;
    missionTitleAr: string;
    missionTextEn: string;
    missionTextAr: string;
    promisesTitleEn: string;
    promisesTitleAr: string;
    promises: Promise[];
  };
  whyOrbit: {
    stats: Stat[];
    features: Feature[];
  };
}

export default function MainPageAdmin() {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'whyOrbit'>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<MainPageSettings>({
    hero: {
      titleEn: '',
      titleAr: ''
    },
    about: {
      visionTitleEn: '',
      visionTitleAr: '',
      visionTextEn: '',
      visionTextAr: '',
      missionTitleEn: '',
      missionTitleAr: '',
      missionTextEn: '',
      missionTextAr: '',
      promisesTitleEn: '',
      promisesTitleAr: '',
      promises: []
    },
    whyOrbit: {
      stats: [],
      features: []
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/main-page-settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/main-page-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const addPromise = () => {
    setSettings({
      ...settings,
      about: {
        ...settings.about,
        promises: [...settings.about.promises, { textEn: '', textAr: '' }]
      }
    });
  };

  const removePromise = (index: number) => {
    setSettings({
      ...settings,
      about: {
        ...settings.about,
        promises: settings.about.promises.filter((_, i) => i !== index)
      }
    });
  };

  const updatePromise = (index: number, field: 'textEn' | 'textAr', value: string) => {
    const newPromises = [...settings.about.promises];
    newPromises[index][field] = value;
    setSettings({
      ...settings,
      about: {
        ...settings.about,
        promises: newPromises
      }
    });
  };

  const addStat = () => {
    setSettings({
      ...settings,
      whyOrbit: {
        ...settings.whyOrbit,
        stats: [...settings.whyOrbit.stats, { number: '', labelEn: '', labelAr: '' }]
      }
    });
  };

  const removeStat = (index: number) => {
    setSettings({
      ...settings,
      whyOrbit: {
        ...settings.whyOrbit,
        stats: settings.whyOrbit.stats.filter((_, i) => i !== index)
      }
    });
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...settings.whyOrbit.stats];
    newStats[index][field] = value;
    setSettings({
      ...settings,
      whyOrbit: {
        ...settings.whyOrbit,
        stats: newStats
      }
    });
  };

  const addFeature = () => {
    setSettings({
      ...settings,
      whyOrbit: {
        ...settings.whyOrbit,
        features: [...settings.whyOrbit.features, { textEn: '', textAr: '', descriptionEn: '', descriptionAr: '' }]
      }
    });
  };

  const removeFeature = (index: number) => {
    setSettings({
      ...settings,
      whyOrbit: {
        ...settings.whyOrbit,
        features: settings.whyOrbit.features.filter((_, i) => i !== index)
      }
    });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...settings.whyOrbit.features];
    newFeatures[index][field] = value;
    setSettings({
      ...settings,
      whyOrbit: {
        ...settings.whyOrbit,
        features: newFeatures
      }
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-xl font-heading text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto" dir="rtl">
        {/* Header */}
        <div className="mb-8 text-right">
          <h1 className="text-4xl font-heading font-bold text-primary mb-3 uppercase">
            محتوى <span className="text-gray-900">الصفحة الرئيسية</span>
          </h1>
          <p className="text-lg text-gray-600 font-ibm-plex-arabic">
            تحرير أقسام Hero و About و Why ORBIT من مكان واحد
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-4 px-6 rounded-lg font-ibm-plex-arabic font-bold transition-all ${
              activeTab === 'hero'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            🌟 قسم Hero
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-4 px-6 rounded-lg font-ibm-plex-arabic font-bold transition-all ${
              activeTab === 'about'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            👋 من نحن
          </button>
          <button
            onClick={() => setActiveTab('whyOrbit')}
            className={`flex-1 py-4 px-6 rounded-lg font-ibm-plex-arabic font-bold transition-all ${
              activeTab === 'whyOrbit'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✨ لماذا ORBIT
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-ibm-plex-arabic font-bold text-gray-900 mb-6 text-right">عنوان قسم Hero</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-ibm-plex-arabic font-semibold text-gray-700 mb-2 text-right">
                    العنوان (عربي)
                  </label>
                  <input
                    type="text"
                    value={settings.hero.titleAr}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...settings.hero, titleAr: e.target.value }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-ibm-plex-arabic text-right"
                    placeholder="أوربيت نجاحك"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-ibm-plex-arabic font-semibold text-gray-700 mb-2 text-right">
                    العنوان (إنجليزي)
                  </label>
                  <input
                    type="text"
                    value={settings.hero.titleEn}
                    onChange={(e) => setSettings({
                      ...settings,
                      hero: { ...settings.hero, titleEn: e.target.value }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    placeholder="ORBIT Your Success"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mt-6 text-right">
                <p className="text-sm text-blue-700 font-ibm-plex-arabic">
                  <strong>ملاحظة:</strong> شريط الحلول أسفل العنوان يتم إدارته بشكل منفصل في قسم إدارة الحلول.
                </p>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Vision */}
              <div className="border-b pb-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Vision</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Vision Title (English)
                    </label>
                    <input
                      type="text"
                      value={settings.about.visionTitleEn}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, visionTitleEn: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Vision Title (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.about.visionTitleAr}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, visionTitleAr: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary  text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Vision Text (English)
                    </label>
                    <textarea
                      value={settings.about.visionTextEn}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, visionTextEn: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Vision Text (Arabic)
                    </label>
                    <textarea
                      value={settings.about.visionTextAr}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, visionTextAr: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary  text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Mission */}
              <div className="border-b pb-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Mission</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Mission Title (English)
                    </label>
                    <input
                      type="text"
                      value={settings.about.missionTitleEn}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, missionTitleEn: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Mission Title (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.about.missionTitleAr}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, missionTitleAr: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary  text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Mission Text (English)
                    </label>
                    <textarea
                      value={settings.about.missionTextEn}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, missionTextEn: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Mission Text (Arabic)
                    </label>
                    <textarea
                      value={settings.about.missionTextAr}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, missionTextAr: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary  text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Promises */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Promises</h2>
                  <button
                    onClick={addPromise}
                    className="px-4 py-2 bg-secondary text-primary rounded-lg font-heading font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    + Add Promise
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Promises Title (English)
                    </label>
                    <input
                      type="text"
                      value={settings.about.promisesTitleEn}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, promisesTitleEn: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                      Promises Title (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.about.promisesTitleAr}
                      onChange={(e) => setSettings({
                        ...settings,
                        about: { ...settings.about, promisesTitleAr: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary  text-right"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {settings.about.promises.map((promise, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-heading font-semibold text-gray-700">
                          Promise {index + 1}
                        </span>
                        <button
                          onClick={() => removePromise(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-heading font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="English"
                          value={promise.textEn}
                          onChange={(e) => updatePromise(index, 'textEn', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                        />
                        <input
                          type="text"
                          placeholder="Arabic"
                          value={promise.textAr}
                          onChange={(e) => updatePromise(index, 'textAr', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary  text-right"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Why ORBIT Tab */}
          {activeTab === 'whyOrbit' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="border-b pb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Statistics</h2>
                  <button
                    onClick={addStat}
                    className="px-4 py-2 bg-secondary text-primary rounded-lg font-heading font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    + Add Stat
                  </button>
                </div>
                
                <div className="space-y-4">
                  {settings.whyOrbit.stats.map((stat, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-heading font-semibold text-gray-700">
                          Stat {index + 1}
                        </span>
                        <button
                          onClick={() => removeStat(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-heading font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Number (e.g., 20+)"
                          value={stat.number}
                          onChange={(e) => updateStat(index, 'number', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                        />
                        <input
                          type="text"
                          placeholder="Label (English)"
                          value={stat.labelEn}
                          onChange={(e) => updateStat(index, 'labelEn', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                        />
                        <input
                          type="text"
                          placeholder="Label (Arabic)"
                          value={stat.labelAr}
                          onChange={(e) => updateStat(index, 'labelAr', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary  text-right"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Features</h2>
                  <button
                    onClick={addFeature}
                    className="px-4 py-2 bg-secondary text-primary rounded-lg font-heading font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    + Add Feature
                  </button>
                </div>
                
                <div className="space-y-4">
                  {settings.whyOrbit.features.map((feature, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-heading font-semibold text-gray-700">
                          Feature {index + 1}
                        </span>
                        <button
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-heading font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Title (English)"
                            value={feature.textEn}
                            onChange={(e) => updateFeature(index, 'textEn', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                          />
                          <input
                            type="text"
                            placeholder="Title (Arabic)"
                            value={feature.textAr}
                            onChange={(e) => updateFeature(index, 'textAr', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary  text-right"
                            dir="rtl"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <textarea
                            placeholder="Description (English)"
                            value={feature.descriptionEn}
                            onChange={(e) => updateFeature(index, 'descriptionEn', e.target.value)}
                            rows={2}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary "
                          />
                          <textarea
                            placeholder="Description (Arabic)"
                            value={feature.descriptionAr}
                            onChange={(e) => updateFeature(index, 'descriptionAr', e.target.value)}
                            rows={2}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary  text-right"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-start gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-4 bg-primary text-white font-ibm-plex-arabic font-bold rounded-lg hover:bg-primary/90 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'جارِ الحفظ...' : 'حفظ جميع التغييرات'}
          </button>
          <button
            onClick={fetchSettings}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-ibm-plex-arabic font-bold rounded-lg hover:bg-gray-100 transition-all"
          >
            إعادة تعيين
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

