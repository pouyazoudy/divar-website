// تبدیل اعداد انگلیسی به فارسی
const e2p = (s) => s.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

// تبدیل اعداد فارسی به انگلیسی
const p2e = (s) => s.toString().replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// فرمت‌گذاری عدد با کاما و تبدیل به فارسی
const sp = (number) => {
  // تبدیل عدد به رشته و جدا کردن با کاما
  const formattedNumber = number.toLocaleString();
  // تبدیل عدد فرمت‌شده به فارسی
  return e2p(formattedNumber);
};

export { e2p, p2e, sp };
