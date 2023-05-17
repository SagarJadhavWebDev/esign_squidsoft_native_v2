export interface RecipientsTypes {
  success: boolean;
  data: Recipients[];
  message: string;
  selectedRecipients: Recipients;
  localRecipients:Recipients[]
}

export interface Recipients {
  index: any;
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  user: User;
  user_type: string;
  type: string;
  level: string;
  signed_at: null;
  rejected_at: null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_picture: null | string;
  user_type: string;
}
