import type { EventCategory, OutsideEvent } from './useEvents'
import { formatPassNumber, formatTimestamp } from '~/utils/format'

export interface Pass {
  id: string
  eventId: string
  eventTitle: string
  eventSubtitle?: string
  venue: string
  city: string
  date: string
  time: string
  category: EventCategory
  price: string
  collectedAt: string
  passNumber: string
}

const STORAGE_KEY = 'outside-passes'

const _passes = ref<Pass[]>([])
let _initialized = false

function init() {
  if (_initialized) return
  _initialized = true
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) _passes.value = JSON.parse(stored)
  } catch {}
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_passes.value))
  } catch {}
}

export function usePasses() {
  onMounted(init)

  const passCount = computed(() => _passes.value.length)

  function hasPass(eventId: string): boolean {
    return _passes.value.some(p => p.eventId === eventId)
  }

  function getPass(eventId: string): Pass | undefined {
    return _passes.value.find(p => p.eventId === eventId)
  }

  function collectPass(event: OutsideEvent): Pass {
    const pass: Pass = {
      id: `${event.id}-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventSubtitle: event.subtitle,
      venue: event.venue,
      city: event.city,
      date: event.date,
      time: event.time,
      category: event.category,
      price: event.price,
      collectedAt: new Date().toISOString(),
      passNumber: formatPassNumber(_passes.value.length + 1)
    }
    _passes.value = [pass, ..._passes.value]
    persist()
    return pass
  }

  // Observational stats derived from pass archive
  const stats = computed(() => {
    const passes = _passes.value
    if (passes.length === 0) return null

    const venueCounts: Record<string, number> = {}
    const cityCounts: Record<string, number> = {}

    for (const p of passes) {
      venueCounts[p.venue] = (venueCounts[p.venue] ?? 0) + 1
      cityCounts[p.city] = (cityCounts[p.city] ?? 0) + 1
    }

    const topVenue = Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
    const topCity = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

    return { topVenue, topCity }
  })

  return { passes: _passes, passCount, hasPass, getPass, collectPass, stats }
}
