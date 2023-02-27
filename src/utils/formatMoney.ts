export function formatMoney(num: any) {
  return new Intl.NumberFormat("vi-VN").format(num);
}
