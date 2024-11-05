export const calculateAge = (dob: Date) => {
  const dobDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();

  return monthDiff < 0 ? --age : age;
};
