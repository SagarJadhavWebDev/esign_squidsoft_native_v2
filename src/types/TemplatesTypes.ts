export interface TemplatesTypes {
  success: boolean;
  data: TemplatesMeta;
}

export interface TemplatesMeta {
  current_page: number;
  data: Template[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Template {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  description: string;
  template_documents: TemplateDocument[];
  template_document_fields: TemplateDocumentField[];
}

export interface TemplateDocumentField {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  template_id: number;
  template_document_id: number;
  field_set_id: number;
  page_number: number;
  type: string;
  x_coordinate: number;
  y_coordinate: number;
  is_mandatory: number;
  height: number;
  width: number;
  meta: Meta;
}

export interface Meta {
  id: number;
  envelopeid: number;
  documentid: number;
  pageno: number;
  type: string;
  userid: number;
  email: string;
  name: string;
  xCord: number;
  yCord: number;
  width: number;
  height: number;
  actualpageheight: number;
  actualpagewidth: number;
  xdifpercentage: number;
  ydifpercentage: number;
  dispalypagewidth: number;
  displaypageheight: number;
  rgbaColor: string;
  uniqueID: string;
}

export interface TemplateDocument {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  path: string;
  type: string;
  mime_type: string;
  size: number;
  meta: null;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
