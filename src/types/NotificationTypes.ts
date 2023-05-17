export interface NotificationTypes {
  success: boolean;
  data: Notifications[];
  message: string;
}

export interface Notifications {
  id: number;
  created_at: string;
  created_by: User;
  updated_at: string;
  deleted_at: null;
  user: User;
  notification_type: "ALERT" | "ENVELOPE" | "INVITE";
  status: "UNREAD" | "READ";
  heading: string;
  message: string;
  meta: null;
  action_status: null | "PENDING" | "ACCEPTED" | "REJECTED";
  action_token: null | string;
  reject_token: null|string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_picture: string;
}
