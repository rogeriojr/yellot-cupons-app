export interface Coupon {
  code: string;
  type: string;
  value: number;
  expire_at: string;
  is_active: boolean;
  max_use: number;
  used: number;
  max_apply_date: string | null;
}

export interface CouponsByMonth {
  [key: string]: Coupon[];
}

export type FilterDays = 7 | 15 | 30 | 90 | null;