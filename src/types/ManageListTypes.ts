export interface ManageList {
  success: boolean;
  data: ManageListTypes;
  count: CountData;
  currentTab:
    | "inbox"
    | "sent"
    | "draft"
    | "action_required"
    | "expiring_soon"
    | "completed"
    | "waiting_on_others"
    | "self_sign";
  message: string;
}
export type manageInboxFilter =
  | "expiring_soon"
  | "pending"
  | "signed"
  | "rejected";
export type manageSentFilter =
  | "expiring_soon"
  | "waiting_on_others"
  | "completed";

export type currentTabTypes =
  | "inbox"
  | "sent"
  | "draft"
  | "action_required"
  | "expiring_soon"
  | "completed"
  | "waiting_on_others"
  | "self_sign";

export interface CountData {
  inbox: number;
  sent: number;
  draft: number;
  waiting_on_others: number;
  deleted: number;
  action_required: number;
  expiring_soon: number;
  completed: number;
  self_sign: number;
}

export interface ManageListTypes {
  current_page: number;
  data: ENVELOPELIST[];
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

export interface ENVELOPELIST {
  delete_token: any;
  deleted_token: any;
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  user: User;
  team: null;
  self_sign: boolean;
  subject: null | string;
  message: null | string;
  sent_at: string;
  expire_at: null;
  document_fields: DocumentFields;
  envelope_documents: string[];
  access_token: string;
  recipient_type: string;
  envelope_recipients: string[];
  recipients: Recipients[];
  recievers: string[];
  audit_trail: string;
  download: string;
  status:
    | "COMPLETED"
    | "PENDING"
    | "VOID"
    | "REJECTED"
    | "SIGNED"
    | "SELF SIGNED"
    | "DRAFTED"
    | "WAITING ON OTHERS";
}

export interface DocumentFields {
  pending: number;
  completed: number;
  total: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_picture: string;
}

export interface Recipients {
  name: string;
  email: string;
  status: "REJECTED" | "PENDING" | "SIGNED";
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
