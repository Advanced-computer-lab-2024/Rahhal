export function formatDate(date: Date): string {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    
}

export function formatTime(date: Date): string {
    return date.getHours() % 12 <= 9
      ? "0" +
        (date.getHours() % 12) +
        ":" +
        (date.getMinutes() <= 9
          ? "0" + date.getMinutes()
          : date.getMinutes()) +
        " " +
        (date.getHours() < 12 ? "AM" : "PM")
      : (date.getHours() % 12) +
        ":" +
        (date.getMinutes() <= 9
          ? "0" + date.getMinutes()
          : date.getMinutes()) +
        " " +
        (date.getHours() < 12 ? "AM" : "PM");
    
}