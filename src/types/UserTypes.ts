export interface UserTypes {
  data: {
    id: number;
    created_at: Date;
    updated_at: Date;
    team: Team;
    user_type: "MEMBER" | "ADMIN";
    name: string;
    email: string;
    email_verified: boolean;
    phone_number_country_code: null;
    phone_number: null;
    profile_picture: null;
    terms_accepted: boolean;
    notifications: any[];
    gstin: string;
    company_name: string;
  };
}
export interface TeamUser {
  id: number;
  name: string;
  email: string;
  profile_picture: string;
}
export interface Team {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  name: string;
  user: TeamUser;
  organization: Organization;
  subscription: Subscription;
}

export interface Subscription {
  id: number;
  name: string;
  user_count: number;
  allowed_user_count: number;
  envelope_count: number;
  envelope_allowed_count: number;
}

export interface Organization {
  id: number;
  logo: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  name: string;
  address_line: string;
  street: string;
  city: string;
  postal_code: number;
  state: string;
  country: string;
  country_code: string;
  meta: Meta;
}
export interface Meta {
  total: number;
  active_teams: ActiveTeam[];
  available_subscriptions: any[];
}

export interface ActiveTeam {
  id: number;
  name: string;
  user_id: number;
  organization_id: number;
  subscription_id: number;
  blocked_at: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
