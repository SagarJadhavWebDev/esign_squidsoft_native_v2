export interface Addresses {
  data: Address[];
}

export interface Address {
  id: number;
  created_at: Date;
  updated_at: Date;
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
