export function formatDate(timestamp?: string): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // "Jan", "Feb", etc.
    day: "2-digit", // "01", "30", etc.
    year: "numeric", // "2025"
  };
  return date.toLocaleDateString("en-US", options);
}
