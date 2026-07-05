export function formatPercentage(value) {
  return `${Math.round(value)}%`;
}

export function formatDateTime(value) {
  return new Date(value).toLocaleString();
}
