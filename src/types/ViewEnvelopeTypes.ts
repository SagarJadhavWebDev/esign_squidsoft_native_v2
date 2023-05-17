export interface Pokedex {
  success: boolean;
  data: ViewEnvelopeTypes;
  message: string;
}

export interface ViewEnvelopeTypes {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  self_sign: boolean;
  subject: string;
  message: string;
  sent_at: Date;
  expire_at: null;
  envelope_documents: EnvelopeDocument[];
  document_fields: DocumentField[];
  sign_token: string;
  reject_token: string;
  download: string;
  audit_trail:string;
}

export interface DocumentField {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  envelope_recipient_id: number;
  envelope_recipient: EnvelopeRecipient;
  envelope_document_id: number;
  page_number: number;
  type: string;
  is_mandatory: boolean;
  x_coordinate: number;
  y_coordinate: number;
  width: number;
  height: number;
  meta: Meta;
  filled_at: null;
  value: null;
}

export interface EnvelopeRecipient {
  id: number;
  name: string;
  email: string;
  user_type: string;
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
  uniqueID: number;
}

export interface EnvelopeDocument {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  envelope: Envelope;
  name: string;
  path: string;
  size: number;
  mime_type: string;
  type: string;
  meta: null;
}

export interface Envelope {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  self_sign: boolean;
  subject: string;
  message: string;
  sent_at: Date;
  expire_at: null;
}
