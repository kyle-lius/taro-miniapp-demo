/**
 * 验证器工具函数
 */

/**
 * 验证手机号码
 * @param phone 手机号码
 * @returns 是否为有效的手机号码
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  // 中国手机号正则表达式
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * 验证邮箱
 * @param email 邮箱地址
 * @returns 是否为有效的邮箱
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 验证密码强度
 * @param password 密码
 * @returns 是否为有效的密码
 */
export const validatePassword = (password: string): boolean => {
  if (!password) return false;
  // 至少6位，包含字母和数字
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  return passwordRegex.test(password);
};