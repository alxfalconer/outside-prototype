function parseDate(iso: string): Date {
  // Date-only strings (YYYY-MM-DD) are UTC midnight in JS — append time to force local
  return iso.length === 10 ? new Date(iso + 'T00:00') : new Date(iso)
}

export function formatDate(iso: string): string {
  return parseDate(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export function formatDateShort(iso: string): string {
  return parseDate(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short'
  })
}

export function formatPassNumber(n: number): string {
  return String(n).padStart(3, '0')
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return `${date}, ${time}`
}
