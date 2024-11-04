const MIN_LENGTH = 0;
const MIN_PASSWORD_LENGTH = 7;
const MIN_CARD_NUMBER_LENGTH = 16;
const MIN_CVV_LENGTH = 3;
function validateFirstName(firstName: string) {
  return typeof firstName === "string" && firstName.length > MIN_LENGTH;
}

function validateLastName(lastName: string) {
  return typeof lastName === "string" && lastName.length > MIN_LENGTH;
}

function validateUsername(username: string) {
  return typeof username === "string" && username.length > MIN_LENGTH && !username.includes(" ");
}

function validateEmail(email: string) {
  return typeof email === "string" && email.length > MIN_LENGTH;
}

function validatePassword(password: string) {
  return typeof password === "string" && password.length > MIN_PASSWORD_LENGTH;
}

function validateApproved(approved: boolean) {
  return typeof approved === "boolean";
}

function validateDOB(dob: Date) {
  return dob instanceof Date; // && !isNaN(dob.getTime());
}

function validateNationality(nationality: string) {
  return typeof nationality === "string" && nationality.length > MIN_LENGTH;
}
function validateJob(job: string) {
  return typeof job === "string" && job.length > MIN_LENGTH;
}
function validatePhoneNumber(phoneNumber: string) {
  return typeof phoneNumber === "string" && phoneNumber.length > MIN_LENGTH;
}
function validateYearsOfExperience(yearsOfExperience: number) {
  if (yearsOfExperience >= MIN_LENGTH) {
    return true;
  }
  return false;
}

function validatePreviousWork(previousWork: string) {
  return typeof previousWork === "string" && previousWork.length > MIN_LENGTH;
}

function validateWebsite(website: string) {
  return typeof website === "string" && website.length > MIN_LENGTH;
}

function validateHotline(hotline: string) {
  return typeof hotline === "string" && hotline.length > MIN_LENGTH;
}

function validateCompanyProfile(companyProfile: string) {
  return typeof companyProfile === "string" && companyProfile.length > MIN_LENGTH;
}

function validateCompanyName(companyName: string) {
  return typeof companyName === "string" && companyName.length > MIN_LENGTH;
}

function validateDescription(description: string) {
  return typeof description === "string" && description.length > MIN_LENGTH;
}

function validateBalance(balance: number) {
  return typeof balance === "number" && balance >= MIN_LENGTH;
}

function validatePoints(points: number) {
  return typeof points === "number" && points >= MIN_LENGTH;
}

function validateCardNumber(cardNumber: string) {
  return typeof cardNumber === "string" && cardNumber.length == MIN_CARD_NUMBER_LENGTH;
}

function validateExpirationDate(expirationDate: Date) {
  //checks if expirationDate is a date and if it is not in the past
  return expirationDate instanceof Date && expirationDate > new Date();
}

function validateCVV(cvv: string) {
  return typeof cvv === "string" && cvv.length == MIN_CVV_LENGTH;
}

function validateDefaultCreditCardIndex(defaultCreditCardIndex: number) {
  return typeof defaultCreditCardIndex === "number" && defaultCreditCardIndex >= MIN_LENGTH;
}

function validateBalance(balance: number) {
  return typeof balance === "number" && balance >= MIN_LENGTH;
}

function validatePoints(points: number) {
  return typeof points === "number" && points >= MIN_LENGTH;
}

export default {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateApproved,
  validateDOB,
  validateNationality,
  validatePoints,
  validateJob,
  validatePhoneNumber,
  validateYearsOfExperience,
  validatePreviousWork,
  validateWebsite,
  validateHotline,
  validateCompanyProfile,
  validateCompanyName,
  validateDescription,
  validateBalance,
  validateCardNumber,
  validateExpirationDate,
  validateCVV,
  validateDefaultCreditCardIndex,
  validateBalance,
  validatePoints,
};
