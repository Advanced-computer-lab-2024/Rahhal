function formatCamelCaseString(str: string) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
}

export function format(key: string, value: any) {
  let formattedKey = formatCamelCaseString(key);
  let formattedValue = String(value);

  if (Array.isArray(value)) {
    formattedValue = value.join("/n");
    console.log(formattedValue);
  } else if (key === "dob" || key === "createdAt" || key === "updatedAt") {
    // Format the date to a more readable format which is DD/MM/YYYY
    formattedValue = new Date(value).toLocaleDateString("hi-IN");
  } else if (key === "role") {
    formattedValue = formatCamelCaseString(value);
  }
  return [formattedKey, formattedValue];
}
