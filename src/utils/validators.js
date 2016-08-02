import { checkNumeric } from './checkers';

export function rNumericValidator(input) {
  if (!input) {
    return "Required"
  }
  if (!checkNumeric(input)) {
    return "Should be a number"
  }
}

export function requireValidator(input) {
  if (!input) {
    return "Required"
  }
}