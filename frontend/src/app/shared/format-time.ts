export function formatTime(value?: string | null): string {
  return value ? value.slice(0, 5) : '';
}
