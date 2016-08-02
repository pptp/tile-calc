export function checkNumeric(input) {
  if (isNaN(parseFloat(input))) {
    return false;
  }

  return /^-{0,1}\d*\.{0,1}\d+$/.test(input);
}