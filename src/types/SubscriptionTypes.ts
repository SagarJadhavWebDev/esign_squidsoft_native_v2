export interface SubscriptionTypes {
  success: boolean;
  data: Subscription[];
  message: string;
}

export interface Subscription {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  plan: Plan;
  start_date: string;
  end_date: string;
  subscription_benifit: SubscriptionBenifit;
}

export interface Plan {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  name: string;
  type: string;
  price: number;
  discount: number;
  meta: string[];
  display_on_site: boolean;
}

export interface SubscriptionBenifit {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  envelope_sent_count: number;
  envelope_total_count: number;
  user_count: number;
  user_allowed_count: number;
  document_conversion: number;
  start_date: Date;
  end_date: string;
  is_active: boolean;
}
