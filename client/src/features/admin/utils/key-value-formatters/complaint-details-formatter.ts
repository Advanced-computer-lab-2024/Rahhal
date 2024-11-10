function formatCamelCaseString(str: string) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
}

export function format(key: string, value: any) {
  let formattedKey = formatCamelCaseString(key);
  let formattedValue = String(value);

  if (Array.isArray(value)) {
    formattedValue = value.join("/n");
    console.log(formattedValue);
  } else if (key === "date") {
    formattedKey = "Date Issued";
    formattedValue = new Date(value).toLocaleDateString("en-GB");
  } else if (key === "status") {
    formattedValue = formatCamelCaseString(value);
  } else if (key === "owner") {
    formattedKey = "Complaint Issuer";
    formattedValue = `${value.firstName} ${value.lastName}`;
  }

  return [formattedKey, formattedValue];
}
