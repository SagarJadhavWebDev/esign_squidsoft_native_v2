
export interface PlanTypes {
  data: PlanType[];
}

export interface PlanType {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: "Enterprise" | "Personal" | "Business";
  type: string;
  price: number;
  discount: number;
  meta: string[];
  display_on_site: boolean;
}