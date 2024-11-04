function formatCamelCaseString(str: string) {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  }
  
  export function format(key: string, value: any) {
    let formattedKey = formatCamelCaseString(key);
    let formattedValue = String(value);
  
    if (Array.isArray(value)) {
        if (key === "ratings") {
          const average = value.length > 0 
            ? value.reduce((sum, rating) => sum + rating.rating, 0) / value.length 
            : 0;
          formattedValue = `Average: ${average.toFixed(1)}`;
        } else {
          formattedValue = value.join(", ");
        }
      } else if (key === "date") {
      formattedKey = "Date";
      formattedValue = new Date(value).toLocaleDateString("en-GB");
    } else if (key === "time") {
      formattedKey = "Time";
      formattedValue = new Date(value).toLocaleTimeString("en-GB");
    } else if (key === "location") {
      formattedKey = "Location";
      formattedValue = `Lat: ${value.latitude}, Long: ${value.longitude}`;
    } else if (key === "price") {
      formattedKey = "Price Categories";
      formattedValue = Object.entries(value)
        .map(([category, price]) => `${category}: $${price}`)
        .join(", ");
    } else if (key === "category") {
      formattedKey = "Category";
      formattedValue = value.name;
    } else if (key === "preferenceTags") {
      formattedKey = "Preference Tags";
      formattedValue = value.map((tag: any) => tag.name).join(", ");
    } else if (key === "isBookingOpen") {
      formattedKey = "Booking Status";
      formattedValue = value ? "Open" : "Closed";
    }
  
    return [formattedKey, formattedValue];
  }