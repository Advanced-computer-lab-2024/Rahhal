const MIN_LENGTH = 0;
const MIN_PASSWORD_LENGTH = 7;
const MIN_CARD_NUMBER_LENGTH = 16;
const MIN_CVV_LENGTH = 3;

function validateStringNotEmpty(value: string) {
  return typeof value === "string" && value.trim().length > MIN_LENGTH;
}

function validateNumber(value: number) {
  return typeof value === "number" && value >= MIN_LENGTH;
}

function validateDate(value: Date) {
  return value instanceof Date && value < new Date();
}

function validateUsername(username: string) {
  return typeof username === "string" && username.length > MIN_LENGTH && !username.includes(" ");
}

function validatePassword(password: string) {
  return typeof password === "string" && password.length > MIN_PASSWORD_LENGTH;
}

function validateApproved(approved: boolean) {
  return typeof approved === "boolean";
}


function validateCardNumber(cardNumber: string) {
  return typeof cardNumber === "string" && cardNumber.length == MIN_CARD_NUMBER_LENGTH;
}

function validateCVV(cvv: string) {
  return typeof cvv === "string" && cvv.length == MIN_CVV_LENGTH;
}


function validateProfilePicture(profilePicture: string) {
  return typeof profilePicture === "string";
}

export default {
  validateStringNotEmpty,
  validateNumber,
  validateDate,
  validateUsername,
  validatePassword,
  validateApproved,
  validateCardNumber,
  validateCVV,
  validateProfilePicture,
};
