export interface CmsField {
  key: string;
  value: string;
  valueEn?: string;
}

export interface CmsSection {
  id: string;
  fields: CmsField[];
}

export interface CmsPage {
  id: string;
  path: string;
  sections: CmsSection[];
}

export interface CmsPartner {
  id: string;
  name: string;
  logo: string;
  active: boolean;
}

export interface CmsFooterData {
  phoneNumber?: string;
  emailAddress?: string;
  addressDetailAr?: string;
  addressDetailEn?: string;
}

export interface SiteCmsSnapshot {
  pages: CmsPage[];
  partners: CmsPartner[];
  footerData?: CmsFooterData;
}
