import { Subscription } from "./SubscriptionTypes";

export interface OrderTypes {
  success: boolean;
  data: {
    current_page: number;
    data: order[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
  };
  message: string;
}

export interface order {
  id: number;
  created_at: string;
  upstringd_at: string;
  deleted_at: null;
  order_type: string;
  status: "FULFILLED" | "PENDING";
  associated_plan: AssociatedPlan;
  payment_intent_id: string;
  payment_intent_mode: "RAZORPAY" | "STRIPE";
  billing_address: BillingAddress | null;
}

export interface AssociatedPlan {
  id: number;
  created_at: string;
  upstringd_at: string;
  deleted_at: null;
  name: string;
  type: "Monthly" | "YEARLY";
  price: number;
  discount: number;
  meta: string[];
  display_on_site: boolean;
  subscription:Subscription
}

export interface BillingAddress {
  id: number;
  created_at: string;
  upstringd_at: string;
  deleted_at: null;
  default: boolean;
  address_line: string;
  street: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
  postal_code: string;
}
