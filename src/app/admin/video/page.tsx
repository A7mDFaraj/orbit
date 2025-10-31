'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

interface VideoSettings {
  _id: string;
  videos: {
    videoUrl: string;
    titleEn?: string;
    titleAr?: string;
    order: number;
  }[];
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  playButtonTextEn: string;
  playButtonTextAr: string;
  stats: {
    numberEn: string;
    numberAr: string;
    labelEn: string;
    labelAr: string;
  }[];
}

export default function VideoSettingsPage() {
  const [settings, setSettings] = useState<VideoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/video-settings');
      const data = await res.json();
      setSettings(data.settings);
    } catch (error) {
      toast.error('Failed to fetch video settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/video-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('Video settings updated successfully!');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (index: number, field: string, value: string) => {
    if (!settings) return;
    const newStats = [...settings.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setSettings({ ...settings, stats: newStats });
  };

  const addVideo = () => {
    if (!settings) return;
    const newVideos = [...settings.videos, {
      videoUrl: '',
      titleEn: '',
      titleAr: '',
      order: settings.videos.length
    }];
    setSettings({ ...settings, videos: newVideos });
  };

  const removeVideo = (index: number) => {
    if (!settings) return;
    const newVideos = settings.videos.filter((_, i) => i !== index);
    setSettings({ ...settings, videos: newVideos });
  };

  const updateVideo = (index: number, field: string, value: string) => {
    if (!settings) return;
    const newVideos = [...settings.videos];
    newVideos[index] = { ...newVideos[index], [field]: value };
    setSettings({ ...settings, videos: newVideos });
  };

  const handleVideoUpload = async (index: number, file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 100MB');
      return;
    }

    setUploadingIndex(index);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        updateVideo(index, 'videoUrl', data.url);
        toast.success(`Video uploaded successfully: ${data.filename}`);
      } else {
        toast.error(data.error || 'Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploadingIndex(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-xl text-red-600">Failed to load settings</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
            Video <span className="text-primary">Section Settings</span>
          </h1>
          <p className="text-gray-600">Manage the video showcase section content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Videos */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 uppercase">Video Files</h3>
              <button
                type="button"
                onClick={addVideo}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all font-semibold uppercase text-sm"
              >
                + Add Video
              </button>
            </div>
            
            <div className="space-y-6">
              {settings.videos.map((video, index) => (
                <div key={index} className="p-5 bg-gray-50 rounded-lg border-2 border-gray-200 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-700 uppercase">Video #{index + 1}</h4>
                    {settings.videos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all text-sm font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video File *
                      </label>
                      
                      {/* Upload Button */}
                      <div className="mb-3">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleVideoUpload(index, file);
                            }}
                            className="hidden"
                            disabled={uploadingIndex !== null}
                          />
                          <div className={`px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold uppercase text-sm inline-flex items-center gap-2 hover:shadow-lg transition-all ${uploadingIndex === index ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}>
                            {uploadingIndex === index ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                📹 Upload Video
                              </>
                            )}
                          </div>
                        </label>
                      </div>

                      {/* URL Input */}
                      <input
                        type="text"
                        value={video.videoUrl}
                        onChange={(e) => updateVideo(index, 'videoUrl', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="/video/video1.mp4"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        💡 Upload a file above OR paste a video URL/path manually
                      </p>
                    </div>

                    {settings.videos.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Video Title (English)
                          </label>
                          <input
                            type="text"
                            value={video.titleEn || ''}
                            onChange={(e) => updateVideo(index, 'titleEn', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Optional"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Video Title (Arabic) - العنوان
                          </label>
                          <input
                            type="text"
                            value={video.titleAr || ''}
                            onChange={(e) => updateVideo(index, 'titleAr', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-right"
                            dir="rtl"
                            placeholder="اختياري"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-600">💡 Tip:</strong> Upload videos to <code className="bg-white px-2 py-1 rounded">public/video/</code> folder and reference them as <code className="bg-white px-2 py-1 rounded">/video/filename.mp4</code>
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Section Title</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={settings.titleEn}
                  onChange={(e) => setSettings({ ...settings, titleEn: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (Arabic) - العنوان
                </label>
                <input
                  type="text"
                  value={settings.titleAr}
                  onChange={(e) => setSettings({ ...settings, titleAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-right"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Description</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (English)
                </label>
                <textarea
                  value={settings.descriptionEn}
                  onChange={(e) => setSettings({ ...settings, descriptionEn: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Arabic) - الوصف
                </label>
                <textarea
                  value={settings.descriptionAr}
                  onChange={(e) => setSettings({ ...settings, descriptionAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-right"
                  dir="rtl"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Play Button Text */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Play Button Text</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Text (English)
                </label>
                <input
                  type="text"
                  value={settings.playButtonTextEn}
                  onChange={(e) => setSettings({ ...settings, playButtonTextEn: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Text (Arabic) - نص الزر
                </label>
                <input
                  type="text"
                  value={settings.playButtonTextAr}
                  onChange={(e) => setSettings({ ...settings, playButtonTextAr: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-right"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Statistics (3 Items)</h3>
            <div className="space-y-6">
              {settings.stats.map((stat, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-3 uppercase">Stat #{index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number (English)
                      </label>
                      <input
                        type="text"
                        value={stat.numberEn}
                        onChange={(e) => updateStat(index, 'numberEn', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="500+"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number (Arabic) - الرقم
                      </label>
                      <input
                        type="text"
                        value={stat.numberAr}
                        onChange={(e) => updateStat(index, 'numberAr', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-right"
                        dir="rtl"
                        placeholder="+500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Label (English)
                      </label>
                      <input
                        type="text"
                        value={stat.labelEn}
                        onChange={(e) => updateStat(index, 'labelEn', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Projects Completed"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Label (Arabic) - التسمية
                      </label>
                      <input
                        type="text"
                        value={stat.labelAr}
                        onChange={(e) => updateStat(index, 'labelAr', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-right"
                        dir="rtl"
                        placeholder="مشروع مكتمل"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all disabled:opacity-50 uppercase tracking-wide shadow-lg hover:shadow-xl"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

