import { Coupon, CouponsByMonth } from '../types/coupon';
import { format } from 'date-fns';

/**
 * Agrupa os cupons por mês com base na data de expiração
 */
export const groupCouponsByMonth = (coupons: Coupon[]): CouponsByMonth => {
  const couponsByMonth: CouponsByMonth = {};

  coupons.forEach(coupon => {
    const expireDate = new Date(coupon.expire_at);
    const monthKey = format(expireDate, 'yyyy-MM-01'); // Primeiro dia do mês como chave

    if (!couponsByMonth[monthKey]) {
      couponsByMonth[monthKey] = [];
    }

    couponsByMonth[monthKey].push(coupon);
  });

  // Ordenar as chaves de mês em ordem decrescente (mais recente primeiro)
  const sortedMonths = Object.keys(couponsByMonth).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  // Criar um novo objeto com as chaves ordenadas
  const sortedCouponsByMonth: CouponsByMonth = {};
  sortedMonths.forEach(month => {
    sortedCouponsByMonth[month] = couponsByMonth[month];
  });

  return sortedCouponsByMonth;
};