'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface Partner {
  id: string;
  name: string;
  logo: string;
  active: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  active: boolean;
}

export interface FooterNavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  href: string;
}

export interface FooterSocialItem {
  id: string;
  platform: string;
  icon: "instagram" | "twitter" | "linkedin" | "facebook" | "youtube" | "github" | "globe";
  url: string;
  active: boolean;
  openInNewTab: boolean;
}

export interface FooterData {
  logoDefault: string;
  logoDark: string;
  logoWhatsApp: string;
  licensedByAr: string;
  licensedByEn: string;
  madeInSaudiAr: string;
  madeInSaudiEn: string;
  quickLinks: FooterNavItem[];
  solutions: FooterNavItem[];
  phoneLabelAr: string;
  phoneLabelEn: string;
  phoneNumber: string;
  emailLabelAr: string;
  emailLabelEn: string;
  emailAddress: string;
  addressLabelAr: string;
  addressLabelEn: string;
  addressDetailAr: string;
  addressDetailEn: string;
  socialItems: FooterSocialItem[];
  copyrightAr: string;
  copyrightEn: string;
  countryAr: string;
  countryEn: string;
  commercialRegistryAr: string;
  commercialRegistryEn: string;
  licenseAr: string;
  licenseEn: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  product: string;
  date: string;
  read: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "submission" | "system" | "info";
  date: string;
  read: boolean;
  submissionId?: string;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  enabled: boolean;
}

export interface SectionField {
  key: string;
  label: string;
  labelEn: string;
  type: "text" | "textarea" | "url" | "list";
  value: string;
  valueEn?: string;
}

export interface PageSection {
  id: string;
  name: string;
  nameEn: string;
  fields: SectionField[];
  visible: boolean;
}

export interface PageData {
  id: string;
  title: string;
  titleEn: string;
  path: string;
  sections: PageSection[];
  lastEdited: string;
}

interface SiteDataContextType {
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  addPartner: (name: string, logo: string) => void;
  removePartner: (id: string) => void;
  togglePartner: (id: string) => void;
  updatePartnerName: (id: string, name: string) => void;
  pages: PageData[];
  setPages: React.Dispatch<React.SetStateAction<PageData[]>>;
  updateSectionField: (pageId: string, sectionId: string, fieldKey: string, value: string, lang: "ar" | "en") => void;
  toggleSectionVisibility: (pageId: string, sectionId: string) => void;
  getField: (pageId: string, sectionId: string, fieldKey: string) => string;
  isSectionVisible: (pageId: string, sectionId: string) => boolean;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  addSocialLink: (platform: string, icon: string, url: string) => void;
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void;
  removeSocialLink: (id: string) => void;
  contactSubmissions: ContactSubmission[];
  addContactSubmission: (submission: Omit<ContactSubmission, "id" | "date" | "read">) => void;
  markSubmissionRead: (id: string) => void;
  deleteSubmission: (id: string) => void;
  notificationEmail: string;
  setNotificationEmail: React.Dispatch<React.SetStateAction<string>>;
  footerData: FooterData;
  setFooterData: React.Dispatch<React.SetStateAction<FooterData>>;
  saveSiteData: () => Promise<boolean>;
  isSyncing: boolean;
}

const canonicalFooterLogo = "/logo/شعار المدار-04.svg";
const legacyFooterLogos = new Set([
  "/logo/شعار المدار1-0١.png",
  "/logo/شعار المدار0-0٤.png",
  "/logo/شعار المدار1-0٢.png",
  "/logo/شعار المدار-01.svg",
]);

const normalizeFooterLogo = (value: unknown): string => {
  if (typeof value !== "string" || !value.trim()) {
    return canonicalFooterLogo;
  }
  const normalized = value.trim();
  return legacyFooterLogos.has(normalized) ? canonicalFooterLogo : normalized;
};

const normalizeQuickLinkHref = (item: FooterNavItem): string => {
  const href = typeof item.href === "string" ? item.href.trim() : "";
  if (!href) return "/";
  if (item.id === "ql-about" && href === "#about") return "/about-us";
  if (href === "#solutions" || href === "#products" || href === "/#solutions") return "#footer-products";
  if (href === "#news" || href === "#blog") return "/blog";
  if (href === "/news") return "/blog";
  return href;
};

const normalizeQuickLinks = (value: unknown): FooterNavItem[] => {
  if (!Array.isArray(value)) return [];
  const mapped = value
    .filter((item): item is FooterNavItem => Boolean(item && typeof item === "object"))
    .map((item) => ({
      ...item,
      id: item.id === "ql-solutions" ? "ql-products" : item.id,
      labelAr: item.id === "ql-solutions" && item.labelAr === "الحلول" ? "المنتجات" : item.labelAr,
      labelEn: item.id === "ql-solutions" && item.labelEn === "Solutions" ? "Products" : item.labelEn,
      href: normalizeQuickLinkHref({
        ...item,
        id: item.id === "ql-solutions" ? "ql-products" : item.id,
      }),
    }));

  const deduped = mapped.filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index);
  const hasBlog = deduped.some((item) => item.id === "ql-blog");
  if (!hasBlog) {
    deduped.push({ id: "ql-blog", labelAr: "المدونة", labelEn: "Blog", href: "/blog" });
  }
  return deduped;
};

const homeSolutionsExtraFields: SectionField[] = [
  {
    key: "otime_title",
    label: "عنوان بطاقة O-Time",
    labelEn: "O-Time Card Title",
    type: "text",
    value: "O-Time برنامج الموارد البشرية",
    valueEn: "O-Time HR Software",
  },
  {
    key: "otime_desc",
    label: "وصف بطاقة O-Time",
    labelEn: "O-Time Card Description",
    type: "textarea",
    value: "منصة متكاملة لإدارة الموارد البشرية تشمل الحضور والرواتب ودورة حياة الموظف بالكامل.",
    valueEn: "A complete HR operations platform for attendance, payroll, and employee lifecycle management.",
  },
  {
    key: "otime_features",
    label: "مزايا O-Time (سطر لكل ميزة)",
    labelEn: "O-Time Features (one per line)",
    type: "list",
    value: "إدارة الحضور والإجازات\nأتمتة مسيرات الرواتب\nبوابة الخدمة الذاتية للموظف\nلوحات تحكم وتحليلات فورية",
    valueEn: "Attendance and leave management\nAutomated payroll workflows\nEmployee self-service portal\nReal-time HR analytics dashboards",
  },
  {
    key: "govgate_title",
    label: "عنوان بطاقة Gov Gate",
    labelEn: "Gov Gate Card Title",
    type: "text",
    value: "Gov Gate",
    valueEn: "Gov Gate",
  },
  {
    key: "govgate_desc",
    label: "وصف بطاقة Gov Gate",
    labelEn: "Gov Gate Card Description",
    type: "textarea",
    value: "بوابة مراسلة مؤسسية آمنة ببنية مخصصة وامتثال كامل وتحكم متقدم.",
    valueEn: "Secure enterprise messaging gateway with dedicated infrastructure, compliance, and advanced controls.",
  },
  {
    key: "govgate_features",
    label: "مزايا Gov Gate (سطر لكل ميزة)",
    labelEn: "Gov Gate Features (one per line)",
    type: "list",
    value: "بوابة مراسلة خاصة وآمنة\nصلاحيات دقيقة بحسب الأدوار\nأمان مؤسسي وامتثال تشريعي\nتقارير تشغيلية وسجل تدقيق مفصل",
    valueEn: "Private secure messaging portal\nGranular role-based permissions\nEnterprise-grade security and compliance\nDetailed operational audit reporting",
  },
];

const homeHeroExtraFields: SectionField[] = [
  {
    key: "cta_api_docs_url",
    label: "رابط زر تصفح ملفات API",
    labelEn: "Browse API Docs Button URL",
    type: "url",
    value: "https://drive.google.com/file/d/1xhdFti973PHqik0T5rGGDipm_30gq064/view?usp=drive_link",
    valueEn: "https://drive.google.com/file/d/1xhdFti973PHqik0T5rGGDipm_30gq064/view?usp=drive_link",
  },
];

const ensureHomeHeroFields = (pages: PageData[]): PageData[] => {
  return pages.map((page) => {
    if (page.id !== "home" && page.path !== "/") {
      return page;
    }
    if (!Array.isArray(page.sections)) {
      return page;
    }

    let pageChanged = false;
    const sections = page.sections.map((section) => {
      if (section.id !== "home-hero") {
        return section;
      }

      const safeFields = Array.isArray(section.fields) ? section.fields : [];
      const existingKeys = new Set(safeFields.map((field) => field.key));
      const missingFields = homeHeroExtraFields.filter((field) => !existingKeys.has(field.key));
      if (!missingFields.length) {
        return section;
      }

      pageChanged = true;
      return {
        ...section,
        fields: [...safeFields, ...missingFields],
      };
    });

    return pageChanged ? { ...page, sections } : page;
  });
};

const ensureHomeSolutionsFields = (pages: PageData[]): PageData[] => {
  return pages.map((page) => {
    if (page.id !== "home" && page.path !== "/") {
      return page;
    }
    if (!Array.isArray(page.sections)) {
      return page;
    }

    let pageChanged = false;
    const sections = page.sections.map((section) => {
      if (section.id !== "home-solutions") {
        return section;
      }

      const safeFields = Array.isArray(section.fields) ? section.fields : [];
      const existingKeys = new Set(safeFields.map((field) => field.key));
      const missingFields = homeSolutionsExtraFields.filter((field) => !existingKeys.has(field.key));
      if (!missingFields.length) {
        return section;
      }

      pageChanged = true;
      return {
        ...section,
        fields: [...safeFields, ...missingFields],
      };
    });

    return pageChanged ? { ...page, sections } : page;
  });
};

const defaultContactSections: PageSection[] = [
  {
    id: "contact-hero",
    name: "مقدمة الصفحة",
    nameEn: "Page Intro",
    visible: true,
    fields: [
      {
        key: "title",
        label: "العنوان الرئيسي",
        labelEn: "Main Title",
        type: "text",
        value: "تواصل معنا",
        valueEn: "Contact Us",
      },
      {
        key: "description",
        label: "الوصف",
        labelEn: "Description",
        type: "textarea",
        value: "نحن هنا للإجابة على استفساراتك ومساعدتك في العثور على الحل المناسب.",
        valueEn: "We are here to answer your questions and help you find the right solution.",
      },
    ],
  },
  {
    id: "contact-info",
    name: "بطاقات التواصل",
    nameEn: "Contact Info Cards",
    visible: true,
    fields: [
      {
        key: "phone",
        label: "رقم الهاتف",
        labelEn: "Phone Number",
        type: "text",
        value: "920006900",
        valueEn: "920006900",
      },
      {
        key: "phone_note",
        label: "ملاحظة الهاتف",
        labelEn: "Phone Note",
        type: "text",
        value: "من الأحد للخميس، 8ص - 6م",
        valueEn: "Sunday to Thursday, 8 AM - 6 PM",
      },
      {
        key: "email",
        label: "البريد الإلكتروني",
        labelEn: "Email Address",
        type: "text",
        value: "sales@orbit.sa",
        valueEn: "sales@orbit.sa",
      },
      {
        key: "email_note",
        label: "ملاحظة البريد",
        labelEn: "Email Note",
        type: "text",
        value: "نرد خلال 24 ساعة كحد أقصى",
        valueEn: "We reply within 24 hours",
      },
      {
        key: "address",
        label: "العنوان",
        labelEn: "Address",
        type: "text",
        value: "المملكة العربية السعودية، الرياض",
        valueEn: "Riyadh, Saudi Arabia",
      },
      {
        key: "address_note",
        label: "تفاصيل العنوان",
        labelEn: "Address Details",
        type: "text",
        value: "طريق الملك فهد",
        valueEn: "King Fahd Road",
      },
      {
        key: "whatsapp_title",
        label: "عنوان بطاقة واتساب",
        labelEn: "WhatsApp Card Title",
        type: "text",
        value: "تحدث معنا عبر واتساب",
        valueEn: "Chat with us on WhatsApp",
      },
      {
        key: "whatsapp_url",
        label: "رابط واتساب",
        labelEn: "WhatsApp URL",
        type: "url",
        value: "https://wa.me/966920006900",
        valueEn: "https://wa.me/966920006900",
      },
    ],
  },
  {
    id: "contact-form",
    name: "نموذج التواصل",
    nameEn: "Contact Form",
    visible: true,
    fields: [
      {
        key: "service_label",
        label: "تسمية حقل الخدمة",
        labelEn: "Service Field Label",
        type: "text",
        value: "الخدمة المطلوبة",
        valueEn: "Requested Service",
      },
      {
        key: "service_placeholder",
        label: "نص افتراضي للخدمة",
        labelEn: "Service Placeholder",
        type: "text",
        value: "اختر الخدمة...",
        valueEn: "Select a service...",
      },
      {
        key: "service_options",
        label: "خيارات الخدمة (صيغة: value|AR|EN)",
        labelEn: "Service Options (format: value|AR|EN)",
        type: "list",
        value:
          "sms|الرسائل النصية SMS|SMS Messaging\nwhatsapp|واتساب أعمال API|WhatsApp Business API\no-time|O-Time نظام الموارد البشرية|O-Time HR System\ngov-gate|Gov Gate بوابة حكومية|Gov Gate\nother|استفسار عام|General Inquiry",
        valueEn:
          "sms|SMS Messaging|SMS Messaging\nwhatsapp|WhatsApp Business API|WhatsApp Business API\no-time|O-Time HR System|O-Time HR System\ngov-gate|Gov Gate|Gov Gate\nother|General Inquiry|General Inquiry",
      },
      {
        key: "submit_text",
        label: "نص زر الإرسال",
        labelEn: "Submit Button Text",
        type: "text",
        value: "إرسال الرسالة",
        valueEn: "Send Message",
      },
      {
        key: "privacy_note",
        label: "نص سياسة الخصوصية",
        labelEn: "Privacy Note",
        type: "text",
        value: "بإرسال النموذج، أنت توافق على سياسة الخصوصية.",
        valueEn: "By sending this form, you agree to the privacy policy.",
      },
    ],
  },
];

const cloneField = (field: SectionField): SectionField => ({ ...field });
const cloneSection = (section: PageSection): PageSection => ({ ...section, fields: section.fields.map(cloneField) });

const buildDefaultContactPage = (): PageData => ({
  id: "contact",
  title: "تواصل معنا",
  titleEn: "Contact Us",
  path: "/contact",
  lastEdited: new Date().toISOString().split("T")[0],
  sections: defaultContactSections.map(cloneSection),
});

const ensureContactPageFields = (pages: PageData[]): PageData[] => {
  const contactIndex = pages.findIndex((page) => page.id === "contact" || page.path === "/contact");
  const contactTemplate = buildDefaultContactPage();

  if (contactIndex === -1) {
    return [...pages, contactTemplate];
  }

  const current = pages[contactIndex];
  const currentSections = Array.isArray(current.sections) ? current.sections : [];
  const templateBySectionId = new Map(contactTemplate.sections.map((section) => [section.id, section]));
  const currentBySectionId = new Map(currentSections.map((section) => [section.id, section]));

  let pageChanged = false;

  const mergedSections = contactTemplate.sections.map((templateSection) => {
    const existingSection = currentBySectionId.get(templateSection.id);
    if (!existingSection) {
      pageChanged = true;
      return cloneSection(templateSection);
    }

    const existingFields = Array.isArray(existingSection.fields) ? existingSection.fields : [];
    const fieldKeys = new Set(existingFields.map((field) => field.key));
    const missingFields = templateSection.fields.filter((field) => !fieldKeys.has(field.key)).map(cloneField);
    if (!missingFields.length) {
      return existingSection;
    }

    pageChanged = true;
    return {
      ...existingSection,
      fields: [...existingFields, ...missingFields],
    };
  });

  const extraSections = currentSections.filter((section) => !templateBySectionId.has(section.id));
  const normalizedId = current.id || "contact";
  const normalizedPath = current.path || "/contact";
  const normalizedTitle = current.title || contactTemplate.title;
  const normalizedTitleEn = current.titleEn || contactTemplate.titleEn;
  const normalizedLastEdited = current.lastEdited || contactTemplate.lastEdited;

  if (normalizedId !== "contact" || normalizedPath !== "/contact") {
    pageChanged = true;
  }
  if (!current.title || !current.titleEn || !current.lastEdited) {
    pageChanged = true;
  }

  const updatedPage: PageData = {
    ...current,
    id: "contact",
    path: "/contact",
    title: normalizedTitle,
    titleEn: normalizedTitleEn,
    lastEdited: normalizedLastEdited,
    sections: [...mergedSections, ...extraSections],
  };

  if (!pageChanged) {
    return pages;
  }

  return pages.map((page, index) => (index === contactIndex ? updatedPage : page));
};

const defaultFooterData: FooterData = {
  logoDefault: canonicalFooterLogo,
  logoDark: canonicalFooterLogo,
  logoWhatsApp: canonicalFooterLogo,
  licensedByAr: "مرخصة من هيئة الاتصالات والفضاء والتقنية",
  licensedByEn: "Licensed by CST",
  madeInSaudiAr: "صنع في السعودية",
  madeInSaudiEn: "Made in Saudi",
  quickLinks: [
    { id: "ql-home", labelAr: "الرئيسية", labelEn: "Home", href: "/" },
    { id: "ql-about", labelAr: "من نحن", labelEn: "About", href: "/about-us" },
    { id: "ql-products", labelAr: "المنتجات", labelEn: "Products", href: "#footer-products" },
    { id: "ql-blog", labelAr: "المدونة", labelEn: "Blog", href: "/blog" },
    { id: "ql-contact", labelAr: "تواصل", labelEn: "Contact", href: "/contact" },
  ],
  solutions: [
    { id: "sl-sms", labelAr: "خدمة الرسائل النصية SMS", labelEn: "SMS Service", href: "/products/sms" },
    { id: "sl-whatsapp", labelAr: "واتساب للأعمال", labelEn: "WhatsApp Business", href: "/products/whatsapp" },
    { id: "sl-otime", labelAr: "O-Time", labelEn: "O-Time", href: "/products/o-time" },
    { id: "sl-govgate", labelAr: "Gov Gate", labelEn: "Gov Gate", href: "/products/gov-gate" },
  ],
  phoneLabelAr: "الهاتف",
  phoneLabelEn: "Phone",
  phoneNumber: "920006900",
  emailLabelAr: "البريد الإلكتروني",
  emailLabelEn: "Email",
  emailAddress: "marketing@corbit.sa",
  addressLabelAr: "العنوان",
  addressLabelEn: "Address",
  addressDetailAr: "المملكة العربية السعودية",
  addressDetailEn: "Saudi Arabia",
  socialItems: [
    {
      id: "social-instagram",
      platform: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/orbittec_sa?igsh=MXFqZmluMWhrbXk0dg==",
      active: true,
      openInNewTab: true,
    },
    {
      id: "social-x",
      platform: "X",
      icon: "twitter",
      url: "https://x.com/orbittec_sa",
      active: true,
      openInNewTab: true,
    },
  ],
  copyrightAr: "جميع الحقوق محفوظة لشركة المدار",
  copyrightEn: "All rights reserved to Orbit",
  countryAr: "المملكة العربية السعودية",
  countryEn: "Saudi Arabia",
  commercialRegistryAr: "السجل التجاري: 1010956877",
  commercialRegistryEn: "CR: 1010956877",
  licenseAr: "رقم الترخيص: 16-01-001098",
  licenseEn: "License: 16-01-001098",
};

const mergeFooterData = (value: unknown): FooterData => {
  const raw = value && typeof value === "object" ? (value as Partial<FooterData>) : {};
  const legacyRaw = value && typeof value === "object" ? (value as { socialInstagram?: unknown; socialX?: unknown }) : {};
  const migratedSocials: FooterSocialItem[] = [];
  if (typeof legacyRaw.socialInstagram === "string" && legacyRaw.socialInstagram.trim()) {
    migratedSocials.push({
      id: "social-instagram",
      platform: "Instagram",
      icon: "instagram",
      url: legacyRaw.socialInstagram,
      active: true,
      openInNewTab: true,
    });
  }
  if (typeof legacyRaw.socialX === "string" && legacyRaw.socialX.trim()) {
    migratedSocials.push({
      id: "social-x",
      platform: "X",
      icon: "twitter",
      url: legacyRaw.socialX,
      active: true,
      openInNewTab: true,
    });
  }

  const normalizedQuickLinks = normalizeQuickLinks(raw.quickLinks);

  return {
    ...defaultFooterData,
    ...raw,
    logoDefault: normalizeFooterLogo(raw.logoDefault),
    logoDark: normalizeFooterLogo(raw.logoDark),
    logoWhatsApp: normalizeFooterLogo(raw.logoWhatsApp),
    quickLinks: normalizedQuickLinks.length ? normalizedQuickLinks : defaultFooterData.quickLinks,
    solutions: Array.isArray(raw.solutions) ? raw.solutions : defaultFooterData.solutions,
    socialItems: Array.isArray(raw.socialItems) && raw.socialItems.length
      ? (raw.socialItems as FooterSocialItem[])
      : (migratedSocials.length ? migratedSocials : defaultFooterData.socialItems),
  };
};

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
};

export const SiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);
  const [hydrated, setHydrated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextAutosaveRef = useRef(true);

  const saveSiteData = useCallback(async (): Promise<boolean> => {
    try {
      setIsSyncing(true);
      const res = await fetch("/api/cms/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pages,
          partners,
          socialLinks,
          contactSubmissions,
          notificationEmail,
          footerData,
        }),
      });

      if (!res.ok) {
        const details = await res.text().catch(() => "");
        console.error("CMS save failed:", res.status, details);
      }

      if (res.ok && typeof window !== "undefined") {
        const stamp = new Date().toISOString();
        window.localStorage.setItem("orbit_cms_site_updated_at", stamp);
        window.dispatchEvent(new CustomEvent("orbit-cms-updated", { detail: stamp }));
      }

      return res.ok;
    } catch (error) {
      console.error("Failed to save CMS site data:", error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [pages, partners, socialLinks, contactSubmissions, notificationEmail, footerData]);

  useEffect(() => {
    let mounted = true;

    const loadSiteData = async () => {
      let normalizedDataChanged = false;
      try {
        const res = await fetch("/api/cms/site");
        if (!res.ok) {
          setHydrated(true);
          return;
        }

        const data = await res.json();
        const site = data?.site;
        if (!site || !mounted) {
          setHydrated(true);
          return;
        }

        const loadedPages = Array.isArray(site.pages) ? (site.pages as PageData[]) : [];
        const enhancedPages = ensureContactPageFields(ensureHomeHeroFields(ensureHomeSolutionsFields(loadedPages)));
        const mergedFooterData = mergeFooterData(site.footerData);
        normalizedDataChanged =
          JSON.stringify(loadedPages) !== JSON.stringify(enhancedPages) ||
          JSON.stringify(site.footerData ?? {}) !== JSON.stringify(mergedFooterData);

        setPages(enhancedPages);
        setPartners(Array.isArray(site.partners) ? site.partners : []);
        setSocialLinks(Array.isArray(site.socialLinks) ? site.socialLinks : []);
        setContactSubmissions(Array.isArray(site.contactSubmissions) ? site.contactSubmissions : []);
        setNotificationEmail(typeof site.notificationEmail === "string" ? site.notificationEmail : "");
        setFooterData(mergedFooterData);
      } catch (error) {
        console.error("Failed to load CMS site data:", error);
      } finally {
        if (mounted) {
          setHydrated(true);
          // Auto-persist only when normalization adds/migrates CMS structure.
          skipNextAutosaveRef.current = !normalizedDataChanged;
        }
      }
    };

    loadSiteData();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (skipNextAutosaveRef.current) {
      skipNextAutosaveRef.current = false;
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      void saveSiteData();
    }, 900);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [hydrated, pages, partners, socialLinks, contactSubmissions, notificationEmail, footerData, saveSiteData]);

  const addPartner = useCallback((name: string, logo: string) => {
    const id = `p${Date.now()}`;
    setPartners(prev => [...prev, { id, name, logo, active: true }]);
  }, []);

  const removePartner = useCallback((id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  }, []);

  const togglePartner = useCallback((id: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }, []);

  const updatePartnerName = useCallback((id: string, name: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  }, []);

  const updateSectionField = useCallback((pageId: string, sectionId: string, fieldKey: string, value: string, lang: "ar" | "en") => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        lastEdited: new Date().toISOString().split("T")[0],
        sections: page.sections.map(section => {
          if (section.id !== sectionId) return section;
          return {
            ...section,
            fields: section.fields.map(field => {
              if (field.key !== fieldKey) return field;
              if (lang === "en") return { ...field, valueEn: value };
              return { ...field, value };
            })
          };
        })
      };
    }));
  }, []);

  const toggleSectionVisibility = useCallback((pageId: string, sectionId: string) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        sections: page.sections.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s)
      };
    }));
  }, []);

  const getField = useCallback((pageId: string, sectionId: string, fieldKey: string): string => {
    const page = pages.find(p => p.id === pageId);
    if (!page) return "";
    const section = page.sections.find(s => s.id === sectionId);
    if (!section) return "";
    const field = section.fields.find(f => f.key === fieldKey);
    return field?.value || "";
  }, [pages]);

  const isSectionVisible = useCallback((pageId: string, sectionId: string): boolean => {
    const page = pages.find(p => p.id === pageId);
    if (!page) return true;
    const section = page.sections.find(s => s.id === sectionId);
    return section?.visible ?? true;
  }, [pages]);

  const addSocialLink = useCallback((platform: string, icon: string, url: string) => {
    const id = `s${Date.now()}`;
    setSocialLinks(prev => [...prev, { id, platform, icon, url, active: true }]);
  }, []);

  const updateSocialLink = useCallback((id: string, updates: Partial<SocialLink>) => {
    setSocialLinks(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const removeSocialLink = useCallback((id: string) => {
    setSocialLinks(prev => prev.filter(s => s.id !== id));
  }, []);

  const addContactSubmission = useCallback((submission: Omit<ContactSubmission, "id" | "date" | "read">) => {
    const newSub: ContactSubmission = {
      ...submission,
      id: `cs${Date.now()}`,
      date: new Date().toISOString(),
      read: false,
    };
    setContactSubmissions(prev => [newSub, ...prev]);
  }, []);

  const markSubmissionRead = useCallback((id: string) => {
    setContactSubmissions(prev => prev.map(s => s.id === id ? { ...s, read: true } : s));
  }, []);

  const deleteSubmission = useCallback((id: string) => {
    setContactSubmissions(prev => prev.filter(s => s.id !== id));
  }, []);

  return (
    <SiteDataContext.Provider value={{
      partners, setPartners, addPartner, removePartner, togglePartner, updatePartnerName,
      pages, setPages, updateSectionField, toggleSectionVisibility, getField, isSectionVisible,
      socialLinks, setSocialLinks, addSocialLink, updateSocialLink, removeSocialLink,
      contactSubmissions, addContactSubmission, markSubmissionRead, deleteSubmission,
      notificationEmail, setNotificationEmail, footerData, setFooterData, saveSiteData, isSyncing,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};
