import { REGEX_STRONG_PASS, REGEX_VALID_EMAIL } from './const';

export function checkPasswordStrength(password: string){
    return REGEX_STRONG_PASS.test(password);
}

export function checkValidEmail(email: string){
    return REGEX_VALID_EMAIL.test(email);
}