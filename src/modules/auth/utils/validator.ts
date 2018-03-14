import { isLength } from 'validator';
import { commonPasswords } from './top100CommonPassword';

enum InvalidPassword {
  shortPwd,
  commonPwd,
  sameAsEmail
}

export const passwordValidator = (password: string, email: string): object => {
  const validationResult = { isValid: true, error: null };
  // password length should longer than 10
  if (!isLength(password, { min: 10 })) {
    validationResult.isValid = false;
    validationResult.error = InvalidPassword.shortPwd;
  }

  // chosen password is a common one.
  if (commonPasswords.indexOf(password) !== -1) {
    validationResult.isValid = false;
    validationResult.error = InvalidPassword.commonPwd;
  }

  // chosen password is the same as email
  if (password.toLowerCase() === email.toLowerCase() ||
    password.toLowerCase() === email.slice(0, email.indexOf('@')).toLowerCase()) {
    validationResult.isValid = false;
    validationResult.error = InvalidPassword.sameAsEmail;
  }

  return validationResult;
}