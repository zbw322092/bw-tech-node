import { isEmail } from 'validator';
import { commonPasswords } from './top100CommonPassword';

enum InvalidPassword {
  weakPwd,
  commonPwd,
  sameAsEmail
}

export const passwordValidator = (password: string, email: string): {isValid: boolean, error: any} => {
  const pwdStrengthRegx = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&.]).{8,}$/g);
  const validationResult = { isValid: true, error: null };

  // password strength test
  if (!pwdStrengthRegx.test(password)) {
    validationResult.isValid = false;
    validationResult.error = InvalidPassword.weakPwd;
    return validationResult;
  }

  // chosen password is a common one.
  if (commonPasswords.indexOf(password) !== -1) {
    validationResult.isValid = false;
    validationResult.error = InvalidPassword.commonPwd;
    return validationResult;
  }

  // chosen password is the same as email
  if (password.toLowerCase() === email.toLowerCase() ||
    password.toLowerCase() === email.slice(0, email.indexOf('@')).toLowerCase()) {
    validationResult.isValid = false;
    validationResult.error = InvalidPassword.sameAsEmail;
    return validationResult;
  }

  return validationResult;
};

export const isValidEmail = (email: string): boolean => {
  if (!isEmail(email)) { return false; }
  return true;
};