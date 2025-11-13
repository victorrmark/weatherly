export function getUVIndex(code: number) {
  if (code >= 0 && code <= 2) return "Low";
  if (code >= 3 && code <= 5) return "Moderate";
  if (code >= 6 && code <= 7) return "High";
  if (code >= 8 && code <= 10) return "Very High";
  if (code >= 11) return "Extreme";
}