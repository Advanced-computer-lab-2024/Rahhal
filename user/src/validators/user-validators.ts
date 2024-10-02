function validateFirstName(firstName: string) {
  return typeof firstName === "string" && firstName.length > 0;
}

function validateLastName(lastName: string) {
  return typeof lastName === "string" && lastName.length > 0;
}

function validateUsername(username: string) {
  return (
    typeof username === "string" &&
    username.length > 0 &&
    !username.includes(" ")
  );
}

function validateEmail(email: string) {
  return typeof email === "string" && email.length > 0;
}

function validatePassword(password: string) {
  return typeof password === "string" && password.length > 7;
}

function validateApproved(approved: boolean) {
  return typeof approved === "boolean";
}

function validateDOB(dob: Date) {
  return dob instanceof Date; // && !isNaN(dob.getTime());
}

function validateNationality(nationality: string) {
  return typeof nationality === "string" && nationality.length > 0;
}
function validateJob(job: string) {
  return typeof job === "string" && job.length > 0;
}
function validatePhoneNumber(phoneNumber: string) {
  return typeof phoneNumber === "string" && phoneNumber.length > 0;
}
function validateYearsOfExperience(yearsOfExperience: number) {
  if (yearsOfExperience >= 0) {
    return true;
  }
  return false;
}

function validatePreviousWork(previousWork: string) {
  return typeof previousWork === "string" && previousWork.length > 0;
}

function validateWebsite(website: string) {
  return typeof website === "string" && website.length > 0;
}

function validateHotline(hotline: string) {
  return typeof hotline === "string" && hotline.length > 0;
}

function validateCompanyProfile(companyProfile: string) {
  return typeof companyProfile === "string" && companyProfile.length > 0;
}

function validateCompanyName(companyName: string) {
  return typeof companyName === "string" && companyName.length > 0;
}

function validateDescription(description: string) {
  return typeof description === "string" && description.length > 0;
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

  validateJob,
  validatePhoneNumber,
  validateYearsOfExperience,
  validatePreviousWork,
  validateWebsite,
  validateHotline,
  validateCompanyProfile,
  validateCompanyName,
  validateDescription,
};
