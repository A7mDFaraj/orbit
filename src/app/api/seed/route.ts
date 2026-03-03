import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteCms from '@/models/SiteCms';
import { cleanupLegacyCollections } from '@/lib/db/legacyCleanup';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type FieldType = 'text' | 'textarea' | 'url' | 'list';

interface SeedSectionField {
  key: string;
  label: string;
  labelEn: string;
  type: FieldType;
  value: string;
  valueEn?: string;
}

interface SeedSection {
  id: string;
  name: string;
  nameEn: string;
  fields: SeedSectionField[];
  visible: boolean;
}

interface SeedPage {
  id: string;
  title: string;
  titleEn: string;
  path: string;
  sections: SeedSection[];
  lastEdited: string;
}

interface PageBlueprint {
  id: string;
  path: string;
  title: string;
  titleEn: string;
}

interface ExistingSiteDoc {
  pages?: unknown[];
  partners?: unknown[];
  socialLinks?: unknown[];
  contactSubmissions?: unknown[];
  notificationEmail?: string;
  footerData?: Record<string, unknown>;
}

const DEFAULT_NOTIFICATION_EMAIL = 'sales@orbit.sa';
const API_DOCS_URL = 'https://drive.google.com/file/d/1xhdFti973PHqik0T5rGGDipm_30gq064/view?usp=drive_link';

const ACTIVE_PAGE_BLUEPRINTS: PageBlueprint[] = [
  { id: 'home', path: '/', title: 'الصفحة الرئيسية', titleEn: 'Home' },
  { id: 'sms', path: '/products/sms', title: 'خدمة الرسائل النصية SMS', titleEn: 'SMS Service' },
  { id: 'whatsapp', path: '/products/whatsapp', title: 'واتساب أعمال API', titleEn: 'WhatsApp Business API' },
  { id: 'otime', path: '/products/o-time', title: 'O-Time برنامج الموارد البشرية', titleEn: 'O-Time HR Software' },
  { id: 'govgate', path: '/products/gov-gate', title: 'Gov Gate', titleEn: 'Gov Gate' },
  { id: 'contact', path: '/contact', title: 'تواصل معنا', titleEn: 'Contact Us' },
  { id: 'blog', path: '/blog', title: 'المدونة', titleEn: 'Blog' },
];

const homeHeroExtraFields: SeedSectionField[] = [
  {
    key: 'cta_api_docs_url',
    label: 'رابط زر تصفح ملفات API',
    labelEn: 'Browse API Docs Button URL',
    type: 'url',
    value: API_DOCS_URL,
    valueEn: API_DOCS_URL,
  },
];

const homeSolutionsExtraFields: SeedSectionField[] = [
  {
    key: 'otime_title',
    label: 'عنوان بطاقة O-Time',
    labelEn: 'O-Time Card Title',
    type: 'text',
    value: 'O-Time برنامج الموارد البشرية',
    valueEn: 'O-Time HR Software',
  },
  {
    key: 'otime_desc',
    label: 'وصف بطاقة O-Time',
    labelEn: 'O-Time Card Description',
    type: 'textarea',
    value: 'منصة متكاملة لإدارة الموارد البشرية تشمل الحضور والرواتب ودورة حياة الموظف بالكامل.',
    valueEn: 'A complete HR operations platform for attendance, payroll, and employee lifecycle management.',
  },
  {
    key: 'otime_features',
    label: 'مزايا O-Time (سطر لكل ميزة)',
    labelEn: 'O-Time Features (one per line)',
    type: 'list',
    value: 'إدارة الحضور والإجازات\nأتمتة مسيرات الرواتب\nبوابة الخدمة الذاتية للموظف\nلوحات تحكم وتحليلات فورية',
    valueEn: 'Attendance and leave management\nAutomated payroll workflows\nEmployee self-service portal\nReal-time HR analytics dashboards',
  },
  {
    key: 'govgate_title',
    label: 'عنوان بطاقة Gov Gate',
    labelEn: 'Gov Gate Card Title',
    type: 'text',
    value: 'Gov Gate',
    valueEn: 'Gov Gate',
  },
  {
    key: 'govgate_desc',
    label: 'وصف بطاقة Gov Gate',
    labelEn: 'Gov Gate Card Description',
    type: 'textarea',
    value: 'بوابة مراسلة مؤسسية آمنة ببنية مخصصة وامتثال كامل وتحكم متقدم.',
    valueEn: 'Secure enterprise messaging gateway with dedicated infrastructure, compliance, and advanced controls.',
  },
  {
    key: 'govgate_features',
    label: 'مزايا Gov Gate (سطر لكل ميزة)',
    labelEn: 'Gov Gate Features (one per line)',
    type: 'list',
    value: 'بوابة مراسلة خاصة وآمنة\nصلاحيات دقيقة بحسب الأدوار\nأمان مؤسسي وامتثال تشريعي\nتقارير تشغيلية وسجل تدقيق مفصل',
    valueEn: 'Private secure messaging portal\nGranular role-based permissions\nEnterprise-grade security and compliance\nDetailed operational audit reporting',
  },
];

const defaultHomeSections: SeedSection[] = [
  {
    id: 'home-hero',
    name: 'الهيرو',
    nameEn: 'Hero',
    visible: true,
    fields: [
      { key: 'badge', label: 'الشارة', labelEn: 'Badge', type: 'text', value: 'منصة الرسائل الرسمية الأولى في السعودية', valueEn: 'Saudi Arabia\'s first official messaging platform' },
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'textarea', value: 'شريكك الموثوق لحلول الرسائل والتواصل', valueEn: 'Your trusted partner for messaging and communication solutions' },
      { key: 'description', label: 'الوصف', labelEn: 'Description', type: 'textarea', value: 'حلول رسائل واتصالات مؤسسية بمستوى عالٍ من الاعتمادية والامتثال.', valueEn: 'Enterprise messaging solutions with high reliability and compliance.' },
      { key: 'cta1_text', label: 'نص الزر الأول', labelEn: 'Primary Button Text', type: 'text', value: 'ابدأ الآن', valueEn: 'Get Started' },
      { key: 'cta1_url', label: 'رابط الزر الأول', labelEn: 'Primary Button URL', type: 'url', value: 'https://app.mobile.net.sa/reg', valueEn: 'https://app.mobile.net.sa/reg' },
      { key: 'cta2_text', label: 'نص الزر الثاني', labelEn: 'Secondary Button Text', type: 'text', value: 'تواصل مع المبيعات', valueEn: 'Contact Sales' },
      { key: 'trust_text', label: 'نص الثقة', labelEn: 'Trust Text', type: 'text', value: 'موثوق من جهات رائدة في المملكة', valueEn: 'Trusted by leading organizations in the Kingdom' },
      ...homeHeroExtraFields,
    ],
  },
  {
    id: 'home-trust',
    name: 'قسم الثقة',
    nameEn: 'Trust Section',
    visible: true,
    fields: [
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'موثوق من جهات رائدة', valueEn: 'Trusted by leading organizations' },
      { key: 'subtitle', label: 'الوصف', labelEn: 'Subtitle', type: 'textarea', value: 'شركاء نجاحنا من القطاع الحكومي والخاص.', valueEn: 'Our success partners from government and private sectors.' },
    ],
  },
  {
    id: 'home-solutions',
    name: 'الحلول الرئيسية',
    nameEn: 'Key Solutions',
    visible: true,
    fields: [
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'حلولنا الأساسية', valueEn: 'Our core solutions' },
      { key: 'subtitle', label: 'الوصف', labelEn: 'Subtitle', type: 'textarea', value: 'منتجات مصممة لتناسب مختلف القطاعات.', valueEn: 'Products designed for multiple sectors.' },
      { key: 'wa_title', label: 'عنوان بطاقة واتساب', labelEn: 'WhatsApp Card Title', type: 'text', value: 'واتساب أعمال API', valueEn: 'WhatsApp Business API' },
      { key: 'wa_desc', label: 'وصف بطاقة واتساب', labelEn: 'WhatsApp Card Description', type: 'textarea', value: 'منصة تواصل احترافية عبر واتساب.', valueEn: 'Professional customer communication through WhatsApp.' },
      { key: 'wa_features', label: 'مزايا واتساب (سطر لكل ميزة)', labelEn: 'WhatsApp Features (one per line)', type: 'list', value: 'رسائل تفاعلية\nتكامل API مباشر\nتقارير أداء', valueEn: 'Interactive messages\nDirect API integration\nPerformance reports' },
      { key: 'sms_title', label: 'عنوان بطاقة SMS', labelEn: 'SMS Card Title', type: 'text', value: 'خدمة الرسائل النصية SMS', valueEn: 'SMS Messaging Service' },
      { key: 'sms_desc', label: 'وصف بطاقة SMS', labelEn: 'SMS Card Description', type: 'textarea', value: 'إرسال رسائل فورية بسرعة وموثوقية.', valueEn: 'Send messages instantly with high reliability.' },
      { key: 'sms_features', label: 'مزايا SMS (سطر لكل ميزة)', labelEn: 'SMS Features (one per line)', type: 'list', value: 'سرعة تسليم عالية\nتقارير مفصلة\nتكامل سهل', valueEn: 'High delivery speed\nDetailed reports\nEasy integration' },
      ...homeSolutionsExtraFields,
    ],
  },
  {
    id: 'home-integrations',
    name: 'التكاملات',
    nameEn: 'Integrations',
    visible: true,
    fields: [
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'نعمل مع أدواتك المفضلة', valueEn: 'We work with your favorite tools' },
      { key: 'subtitle', label: 'الوصف', labelEn: 'Subtitle', type: 'textarea', value: 'تكامل سريع مع أنظمتك الحالية.', valueEn: 'Fast integration with your existing systems.' },
    ],
  },
  {
    id: 'home-whyus',
    name: 'لماذا نحن',
    nameEn: 'Why Us',
    visible: true,
    fields: [
      { key: 'support_title', label: 'عنوان الدعم', labelEn: 'Support Title', type: 'text', value: 'دعم فني محلي', valueEn: 'Local support' },
      { key: 'support_desc', label: 'وصف الدعم', labelEn: 'Support Description', type: 'textarea', value: 'فريق سعودي يساندك على مدار الساعة.', valueEn: 'A Saudi team supporting you 24/7.' },
      { key: 'security_title', label: 'عنوان الأمان', labelEn: 'Security Title', type: 'text', value: 'أمان عالي', valueEn: 'High security' },
      { key: 'security_desc', label: 'وصف الأمان', labelEn: 'Security Description', type: 'textarea', value: 'حماية متقدمة وامتثال للمعايير.', valueEn: 'Advanced protection and compliance standards.' },
      { key: 'payment_title', label: 'عنوان الدفع', labelEn: 'Payment Title', type: 'text', value: 'الدفع المرن', valueEn: 'Flexible payment' },
      { key: 'payment_desc', label: 'وصف الدفع', labelEn: 'Payment Description', type: 'textarea', value: 'خيارات دفع متعددة تناسب احتياجك.', valueEn: 'Multiple payment options matching your needs.' },
    ],
  },
];

const defaultContactSections: SeedSection[] = [
  {
    id: 'contact-hero',
    name: 'مقدمة الصفحة',
    nameEn: 'Page Intro',
    visible: true,
    fields: [
      { key: 'title', label: 'العنوان الرئيسي', labelEn: 'Main Title', type: 'text', value: 'تواصل معنا', valueEn: 'Contact Us' },
      { key: 'description', label: 'الوصف', labelEn: 'Description', type: 'textarea', value: 'نحن هنا للإجابة على استفساراتك ومساعدتك في العثور على الحل المناسب.', valueEn: 'We are here to answer your questions and help you find the right solution.' },
    ],
  },
  {
    id: 'contact-info',
    name: 'بطاقات التواصل',
    nameEn: 'Contact Info Cards',
    visible: true,
    fields: [
      { key: 'phone', label: 'رقم الهاتف', labelEn: 'Phone Number', type: 'text', value: '920006900', valueEn: '920006900' },
      { key: 'phone_note', label: 'ملاحظة الهاتف', labelEn: 'Phone Note', type: 'text', value: 'من الأحد للخميس، 8ص - 6م', valueEn: 'Sunday to Thursday, 8 AM - 6 PM' },
      { key: 'email', label: 'البريد الإلكتروني', labelEn: 'Email Address', type: 'text', value: 'sales@orbit.sa', valueEn: 'sales@orbit.sa' },
      { key: 'email_note', label: 'ملاحظة البريد', labelEn: 'Email Note', type: 'text', value: 'نرد خلال 24 ساعة كحد أقصى', valueEn: 'We reply within 24 hours' },
      { key: 'address', label: 'العنوان', labelEn: 'Address', type: 'text', value: 'المملكة العربية السعودية، الرياض', valueEn: 'Riyadh, Saudi Arabia' },
      { key: 'address_note', label: 'تفاصيل العنوان', labelEn: 'Address Details', type: 'text', value: 'طريق الملك فهد', valueEn: 'King Fahd Road' },
      { key: 'whatsapp_title', label: 'عنوان بطاقة واتساب', labelEn: 'WhatsApp Card Title', type: 'text', value: 'تحدث معنا عبر واتساب', valueEn: 'Chat with us on WhatsApp' },
      { key: 'whatsapp_url', label: 'رابط واتساب', labelEn: 'WhatsApp URL', type: 'url', value: 'https://wa.me/966920006900', valueEn: 'https://wa.me/966920006900' },
    ],
  },
  {
    id: 'contact-form',
    name: 'نموذج التواصل',
    nameEn: 'Contact Form',
    visible: true,
    fields: [
      { key: 'service_label', label: 'تسمية حقل الخدمة', labelEn: 'Service Field Label', type: 'text', value: 'الخدمة المطلوبة', valueEn: 'Requested Service' },
      { key: 'service_placeholder', label: 'نص افتراضي للخدمة', labelEn: 'Service Placeholder', type: 'text', value: 'اختر الخدمة...', valueEn: 'Select a service...' },
      { key: 'service_options', label: 'خيارات الخدمة (صيغة: value|AR|EN)', labelEn: 'Service Options (format: value|AR|EN)', type: 'list', value: 'sms|الرسائل النصية SMS|SMS Messaging\nwhatsapp|واتساب أعمال API|WhatsApp Business API\no-time|O-Time نظام الموارد البشرية|O-Time HR System\ngov-gate|Gov Gate بوابة حكومية|Gov Gate\nother|استفسار عام|General Inquiry', valueEn: 'sms|SMS Messaging|SMS Messaging\nwhatsapp|WhatsApp Business API|WhatsApp Business API\no-time|O-Time HR System|O-Time HR System\ngov-gate|Gov Gate|Gov Gate\nother|General Inquiry|General Inquiry' },
      { key: 'submit_text', label: 'نص زر الإرسال', labelEn: 'Submit Button Text', type: 'text', value: 'إرسال الرسالة', valueEn: 'Send Message' },
      { key: 'privacy_note', label: 'نص سياسة الخصوصية', labelEn: 'Privacy Note', type: 'text', value: 'بإرسال النموذج، أنت توافق على سياسة الخصوصية.', valueEn: 'By sending this form, you agree to the privacy policy.' },
    ],
  },
];

const defaultBlogSections: SeedSection[] = [
  {
    id: 'blog-hero',
    name: 'مقدمة المدونة',
    nameEn: 'Blog Intro',
    visible: true,
    fields: [
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'المدونة', valueEn: 'Blog' },
      { key: 'description', label: 'الوصف', labelEn: 'Description', type: 'textarea', value: 'آخر المقالات والتحديثات.', valueEn: 'Latest articles and updates.' },
    ],
  },
];

const defaultPageSectionsById: Record<string, SeedSection[]> = {
  home: defaultHomeSections,
  sms: [
    { id: 'sms-hero', name: 'SMS Hero', nameEn: 'SMS Hero', visible: true, fields: [
      { key: 'retail_title', label: 'عنوان الشريحة الرئيسية', labelEn: 'Primary Segment Title', type: 'text', value: 'رسائل SMS للأعمال', valueEn: 'SMS for Business' },
      { key: 'retail_description', label: 'الوصف', labelEn: 'Description', type: 'textarea', value: 'منصة مرنة للرسائل النصية الجماعية والفردية.', valueEn: 'Flexible platform for bulk and transactional SMS.' },
    ] },
    { id: 'sms-pricing', name: 'تسعير SMS', nameEn: 'SMS Pricing', visible: true, fields: [
      { key: 'title', label: 'عنوان التسعير', labelEn: 'Pricing Title', type: 'text', value: 'باقات الرسائل', valueEn: 'SMS Packages' },
      { key: 'subtitle', label: 'وصف التسعير', labelEn: 'Pricing Subtitle', type: 'textarea', value: 'اختر الباقة المناسبة لحجم عملك.', valueEn: 'Choose a plan that fits your business.' },
      { key: 'plans_list', label: 'قائمة الباقات', labelEn: 'Plans List', type: 'list', value: '', valueEn: '' },
    ] },
    { id: 'sms-trust', name: 'شعارات الثقة', nameEn: 'Trust Logos', visible: true, fields: [] },
  ],
  whatsapp: [
    { id: 'wa-hero', name: 'WhatsApp Hero', nameEn: 'WhatsApp Hero', visible: true, fields: [
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'واتساب أعمال API', valueEn: 'WhatsApp Business API' },
      { key: 'subtitle', label: 'الوصف المختصر', labelEn: 'Subtitle', type: 'text', value: 'تواصل احترافي مع عملائك', valueEn: 'Professional customer communication' },
      { key: 'cta_primary_text', label: 'نص الزر الأساسي', labelEn: 'Primary CTA Text', type: 'text', value: 'اطلب الخدمة الآن', valueEn: 'Order Service Now' },
      { key: 'cta_primary_url', label: 'رابط الزر الأساسي', labelEn: 'Primary CTA URL', type: 'url', value: 'https://wapp.mobile.net.sa/billing-subscription', valueEn: 'https://wapp.mobile.net.sa/billing-subscription' },
    ] },
    { id: 'wa-features', name: 'مميزات واتساب', nameEn: 'WhatsApp Features', visible: true, fields: [] },
    { id: 'wa-pricing', name: 'تسعير واتساب', nameEn: 'WhatsApp Pricing', visible: true, fields: [] },
  ],
  otime: [
    { id: 'ot-hero', name: 'O-Time Hero', nameEn: 'O-Time Hero', visible: true, fields: [
      { key: 'badge', label: 'شارة الصفحة', labelEn: 'Page Badge', type: 'text', value: 'نظام الموارد البشرية السحابي', valueEn: 'Cloud HR System' },
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'O-Time', valueEn: 'O-Time' },
      { key: 'subtitle', label: 'الوصف', labelEn: 'Subtitle', type: 'textarea', value: 'نظام متكامل لإدارة الموارد البشرية.', valueEn: 'Integrated HR management system.' },
    ] },
    { id: 'ot-features', name: 'مميزات O-Time', nameEn: 'O-Time Features', visible: true, fields: [] },
  ],
  govgate: [
    { id: 'gg-hero', name: 'Gov Gate Hero', nameEn: 'Gov Gate Hero', visible: true, fields: [
      { key: 'badge', label: 'شارة الصفحة', labelEn: 'Page Badge', type: 'text', value: 'بوابة المراسلات الحكومية', valueEn: 'Government Messaging Gateway' },
      { key: 'title', label: 'العنوان', labelEn: 'Title', type: 'text', value: 'Gov Gate', valueEn: 'Gov Gate' },
      { key: 'subtitle', label: 'الوصف المختصر', labelEn: 'Subtitle', type: 'textarea', value: 'حل مراسلات مؤسسي آمن.', valueEn: 'Secure enterprise messaging solution.' },
    ] },
    { id: 'gg-cta', name: 'دعوة الإجراء', nameEn: 'CTA Section', visible: true, fields: [
      { key: 'cta_text', label: 'نص الزر', labelEn: 'CTA Text', type: 'text', value: 'ابدأ الآن', valueEn: 'Start now' },
      { key: 'cta_url', label: 'رابط الزر', labelEn: 'CTA URL', type: 'url', value: 'https://wa.me/966920006900', valueEn: 'https://wa.me/966920006900' },
    ] },
  ],
  contact: defaultContactSections,
  blog: defaultBlogSections,
};

const cloneField = (field: SeedSectionField): SeedSectionField => ({ ...field });
const cloneSection = (section: SeedSection): SeedSection => ({ ...section, fields: section.fields.map(cloneField) });
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value && typeof value === 'object' && !Array.isArray(value));
const asTrimmedString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');
const toToday = (): string => new Date().toISOString().split('T')[0];

const normalizeFieldType = (value: unknown): FieldType => {
  if (value === 'text' || value === 'textarea' || value === 'url' || value === 'list') return value;
  return 'text';
};

const normalizeField = (value: unknown, index: number): SeedSectionField => {
  const raw = isRecord(value) ? value : {};
  const key = asTrimmedString(raw.key) || `field_${index + 1}`;
  const label = asTrimmedString(raw.label) || key;
  return {
    key,
    label,
    labelEn: asTrimmedString(raw.labelEn) || label,
    type: normalizeFieldType(raw.type),
    value: typeof raw.value === 'string' ? raw.value : '',
    valueEn: typeof raw.valueEn === 'string' ? raw.valueEn : undefined,
  };
};

const normalizeSection = (value: unknown, index: number): SeedSection => {
  const raw = isRecord(value) ? value : {};
  const id = asTrimmedString(raw.id) || `section_${index + 1}`;
  const rawFields = Array.isArray(raw.fields) ? raw.fields : [];
  return {
    id,
    name: asTrimmedString(raw.name) || id,
    nameEn: asTrimmedString(raw.nameEn) || asTrimmedString(raw.name) || id,
    visible: raw.visible !== false,
    fields: rawFields.map(normalizeField),
  };
};

const mergeTemplateIntoPage = (page: SeedPage, templateSections: SeedSection[]): SeedPage => {
  const currentSections = Array.isArray(page.sections) ? page.sections : [];
  const byId = new Map(currentSections.map((section) => [section.id, section]));
  const merged: SeedSection[] = [];

  for (const template of templateSections) {
    const existing = byId.get(template.id);
    if (!existing) {
      merged.push(cloneSection(template));
      continue;
    }
    const existingFields = Array.isArray(existing.fields) ? existing.fields : [];
    const existingKeys = new Set(existingFields.map((field) => field.key));
    const missingFields = template.fields.filter((field) => !existingKeys.has(field.key)).map(cloneField);
    merged.push(missingFields.length ? { ...existing, fields: [...existingFields, ...missingFields] } : existing);
  }

  for (const section of currentSections) {
    if (!merged.some((item) => item.id === section.id)) merged.push(section);
  }

  return { ...page, sections: merged };
};

const buildDefaultPage = (blueprint: PageBlueprint): SeedPage => ({
  id: blueprint.id,
  title: blueprint.title,
  titleEn: blueprint.titleEn,
  path: blueprint.path,
  lastEdited: toToday(),
  sections: (defaultPageSectionsById[blueprint.id] || []).map(cloneSection),
});

const ensureHomeHeroFields = (pages: SeedPage[]): SeedPage[] => pages.map((page) => {
  if (page.id !== 'home' && page.path !== '/') return page;
  return mergeTemplateIntoPage(page, [{ id: 'home-hero', name: 'الهيرو', nameEn: 'Hero', visible: true, fields: homeHeroExtraFields }]);
});

const ensureHomeSolutionsFields = (pages: SeedPage[]): SeedPage[] => pages.map((page) => {
  if (page.id !== 'home' && page.path !== '/') return page;
  return mergeTemplateIntoPage(page, [{ id: 'home-solutions', name: 'الحلول الرئيسية', nameEn: 'Key Solutions', visible: true, fields: homeSolutionsExtraFields }]);
});

const normalizePages = (input: unknown): SeedPage[] => {
  const rows = Array.isArray(input) ? input : [];
  const byId = new Map(ACTIVE_PAGE_BLUEPRINTS.map((page) => [page.id, page]));
  const byPath = new Map(ACTIVE_PAGE_BLUEPRINTS.map((page) => [page.path, page]));
  const used = new Set<string>();
  const normalized: SeedPage[] = [];

  for (const row of rows) {
    if (!isRecord(row)) continue;
    const blueprint = byId.get(asTrimmedString(row.id)) || byPath.get(asTrimmedString(row.path));
    if (!blueprint || used.has(blueprint.id)) continue;
    used.add(blueprint.id);

    const rawSections = Array.isArray(row.sections) ? row.sections : [];
    normalized.push({
      id: blueprint.id,
      title: asTrimmedString(row.title) || blueprint.title,
      titleEn: asTrimmedString(row.titleEn) || blueprint.titleEn,
      path: blueprint.path,
      lastEdited: asTrimmedString(row.lastEdited) || toToday(),
      sections: rawSections.length
        ? rawSections.map(normalizeSection)
        : (defaultPageSectionsById[blueprint.id] || []).map(cloneSection),
    });
  }

  for (const blueprint of ACTIVE_PAGE_BLUEPRINTS) {
    if (!used.has(blueprint.id)) normalized.push(buildDefaultPage(blueprint));
  }

  return ensureHomeSolutionsFields(ensureHomeHeroFields(normalized));
};

const normalizePartners = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const rows: Array<{ id: string; name: string; logo: string; active: boolean }> = [];
  for (const row of input) {
    if (!isRecord(row)) continue;
    const id = asTrimmedString(row.id) || `p${rows.length + 1}`;
    if (seen.has(id)) continue;
    const name = asTrimmedString(row.name);
    const logo = asTrimmedString(row.logo);
    if (!name || !logo) continue;
    seen.add(id);
    rows.push({ id, name, logo, active: row.active !== false });
  }
  return rows;
};

const normalizeSocialLinks = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const rows: Array<{ id: string; platform: string; icon: string; url: string; active: boolean }> = [];
  for (const row of input) {
    if (!isRecord(row)) continue;
    const id = asTrimmedString(row.id) || `s${rows.length + 1}`;
    if (seen.has(id)) continue;
    const platform = asTrimmedString(row.platform);
    const icon = asTrimmedString(row.icon);
    const url = asTrimmedString(row.url);
    if (!platform || !url) continue;
    seen.add(id);
    rows.push({ id, platform, icon, url, active: row.active !== false });
  }
  return rows;
};

const normalizeSubmissions = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  const rows: Array<{ id: string; name: string; email: string; phone: string; company: string; message: string; product: string; date: string; read: boolean }> = [];
  for (const row of input) {
    if (!isRecord(row)) continue;
    const name = asTrimmedString(row.name);
    const email = asTrimmedString(row.email);
    const message = asTrimmedString(row.message);
    if (!name || !email || !message) continue;
    rows.push({
      id: asTrimmedString(row.id) || `cs${Date.now()}${rows.length}`,
      name,
      email,
      phone: asTrimmedString(row.phone),
      company: asTrimmedString(row.company),
      message,
      product: asTrimmedString(row.product) || 'other',
      date: asTrimmedString(row.date) || new Date().toISOString(),
      read: row.read === true,
    });
  }
  return rows;
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const cleanLegacy = url.searchParams.get('cleanLegacy') !== 'false';
    const keepSubmissions = url.searchParams.get('keepSubmissions') === 'true';

    const existing = (await SiteCms.findOne({ key: 'primary' }).lean()) as ExistingSiteDoc | null;
    const pages = normalizePages(existing?.pages);
    const partners = normalizePartners(existing?.partners);
    const socialLinks = normalizeSocialLinks(existing?.socialLinks);
    const contactSubmissions = keepSubmissions ? normalizeSubmissions(existing?.contactSubmissions) : [];
    const notificationEmail = asTrimmedString(existing?.notificationEmail) || DEFAULT_NOTIFICATION_EMAIL;
    const footerData = isRecord(existing?.footerData) ? existing.footerData : {};

    const site = await SiteCms.findOneAndUpdate(
      { key: 'primary' },
      {
        key: 'primary',
        isActive: true,
        pages,
        partners,
        socialLinks,
        contactSubmissions,
        notificationEmail,
        footerData,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    const staleSiteDocs = await SiteCms.deleteMany({ key: { $ne: 'primary' } });
    const legacy = cleanLegacy ? await cleanupLegacyCollections() : null;

    return NextResponse.json({
      success: true,
      message: 'Site CMS seeded and normalized for current production pages',
      cleanLegacy,
      keepSubmissions,
      legacy,
      siteCms: {
        id: site?._id,
        pages: pages.length,
        partners: partners.length,
        socialLinks: socialLinks.length,
        contactSubmissions: contactSubmissions.length,
        removedNonPrimaryDocs: staleSiteDocs.deletedCount ?? 0,
      },
      adminDashboardAuth: {
        email: 'admin@corbit',
        password: 'AAaa12341234',
        note: 'Configured in AdminDashboard.tsx (client-side gate)',
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
