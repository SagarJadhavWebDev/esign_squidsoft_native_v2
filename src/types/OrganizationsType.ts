export interface OrganizationTypes {
  success: boolean;
  data: Organization;
  message: string;
}

export interface Organization {
  id: number;
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
  teams: Team[];
  meta: Meta;
  logo:string;
}

export interface Meta {
  total: number;
  active_teams: ActiveTeam[];
  available_subscriptions: AvailableSubscription[];
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

export interface AvailableSubscription {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  users: any[];
  subscription: Subscription;
}

export interface Subscription {
  id: number;
  name: string;
  allowed_user_count: number;
  user_count: number;
  envelope_count: number;
  envelope_allowed_count: number;
}
