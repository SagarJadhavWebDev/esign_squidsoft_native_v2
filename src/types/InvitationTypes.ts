export interface InvitationTypes {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  current_page:   number;
  data:           Invitations[];
  first_page_url: string;
  from:           number;
  last_page:      number;
  last_page_url:  string;
  links:          Link[];
  next_page_url:  string;
  path:           string;
  per_page:       number;
  prev_page_url:  null;
  to:             number;
  total:          number;
}


export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}

export interface Invitations {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  name: string;
  email: string;
  organization_id: number;
  team_id: number;
  accepted_at: null;
  rejected_at: null;
  status: "ACCEPTED" | "REJECTED" | "PENDING"|"CANCELLED";
}
