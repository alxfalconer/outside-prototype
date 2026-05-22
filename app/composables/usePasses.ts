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

const STORAGE_KEY = 'outside-passes-v2'

const SEEDED_PASSES: Pass[] = [
  // ── Past (oldest → newest) ───────────────────────────
  {
    id: 'p005-seed',
    eventId: 'p005',
    eventTitle: 'Harun Farocki: Working at the Edges',
    eventSubtitle: 'A retrospective programme',
    venue: 'Anthology Film Archives',
    city: 'New York',
    date: '2025-09-19',
    time: '20:00',
    category: 'film',
    price: '$15',
    collectedAt: '2025-09-12T16:33:00.000Z',
    passNumber: '001'
  },
  {
    id: 'p004-seed',
    eventId: 'p004',
    eventTitle: 'Night of 100 Solos',
    eventSubtitle: 'Merce Cunningham Dance Foundation — Centennial',
    venue: 'BAM Harvey Theater',
    city: 'Brooklyn',
    date: '2025-11-14',
    time: '19:30',
    category: 'performance',
    price: '$45',
    collectedAt: '2025-11-01T20:15:00.000Z',
    passNumber: '002'
  },
  {
    id: 'p003-seed',
    eventId: 'p003',
    eventTitle: 'The Ballad of Sexual Dependency',
    eventSubtitle: 'Nan Goldin — Slideshow, live performance',
    venue: 'MoMA PS1',
    city: 'Queens',
    date: '2026-01-17',
    time: '19:30',
    category: 'exhibition',
    price: '$20',
    collectedAt: '2026-01-08T11:05:00.000Z',
    passNumber: '003'
  },
  {
    id: 'p002-seed',
    eventId: 'p002',
    eventTitle: 'Special Interest',
    eventSubtitle: 'Disrespect Tour — with Automatic',
    venue: 'Elsewhere',
    city: 'Brooklyn',
    date: '2026-02-21',
    time: '20:00',
    category: 'music',
    price: '$20',
    collectedAt: '2026-02-15T19:41:00.000Z',
    passNumber: '004'
  },
  {
    id: 'p006-seed',
    eventId: 'p006',
    eventTitle: 'Peter Hujar: Speed of Life',
    eventSubtitle: 'Survey exhibition',
    venue: 'ICP Museum',
    city: 'New York',
    date: '2026-03-07',
    time: '11:00',
    category: 'exhibition',
    price: '$16',
    collectedAt: '2026-03-05T10:18:00.000Z',
    passNumber: '005'
  },
  {
    id: 'p001-seed',
    eventId: 'p001',
    eventTitle: 'Andrei Rublev',
    eventSubtitle: 'Dir. Andrei Tarkovsky, 1966 — 35mm',
    venue: 'Film Forum',
    city: 'New York',
    date: '2026-03-14',
    time: '19:00',
    category: 'film',
    price: '$15',
    collectedAt: '2026-03-10T14:22:00.000Z',
    passNumber: '006'
  },
  {
    id: 'p007-seed',
    eventId: 'p007',
    eventTitle: 'Floating Points',
    eventSubtitle: 'Live — with Pharoah Sanders Ensemble',
    venue: 'Brooklyn Steel',
    city: 'Brooklyn',
    date: '2026-04-11',
    time: '20:00',
    category: 'music',
    price: '$30',
    collectedAt: '2026-04-08T17:55:00.000Z',
    passNumber: '007'
  },
  {
    id: 'p008-seed',
    eventId: 'p008',
    eventTitle: 'Jia Zhangke: In Conversation',
    eventSubtitle: 'Hosted by Museum of the Moving Image',
    venue: 'Museum of the Moving Image',
    city: 'Queens',
    date: '2026-05-09',
    time: '19:00',
    category: 'lecture',
    price: '$20',
    collectedAt: '2026-05-06T12:44:00.000Z',
    passNumber: '008'
  },
  // ── Upcoming ─────────────────────────────────────────
  {
    id: 'u003-seed',
    eventId: '006',
    eventTitle: 'The Rite of Spring',
    eventSubtitle: 'Tanztheater Wuppertal Pina Bausch',
    venue: 'BAM Howard Gilman Opera House',
    city: 'Brooklyn',
    date: '2026-06-20',
    time: '19:30',
    category: 'performance',
    price: '$55',
    collectedAt: '2026-05-15T09:30:00.000Z',
    passNumber: '009'
  },
  {
    id: 'u001-seed',
    eventId: '001',
    eventTitle: 'Je Tu Il Elle',
    eventSubtitle: 'Dir. Chantal Akerman, 1974 — 16mm',
    venue: 'Metrograph',
    city: 'New York',
    date: '2026-06-04',
    time: '20:00',
    category: 'film',
    price: '$15',
    collectedAt: '2026-05-18T16:20:00.000Z',
    passNumber: '010'
  },
  {
    id: 'u002-seed',
    eventId: '005',
    eventTitle: 'Stalker',
    eventSubtitle: 'Dir. Andrei Tarkovsky, 1979 — 4K restoration',
    venue: 'Anthology Film Archives',
    city: 'New York',
    date: '2026-06-18',
    time: '19:30',
    category: 'film',
    price: '$16',
    collectedAt: '2026-05-20T11:45:00.000Z',
    passNumber: '011'
  },
  {
    id: 'u004-seed',
    eventId: '008',
    eventTitle: 'Arca',
    eventSubtitle: 'Kick Tour — Live A/V',
    venue: 'Knockdown Center',
    city: 'Queens',
    date: '2026-06-27',
    time: '21:00',
    category: 'music',
    price: '$35',
    collectedAt: '2026-05-21T20:10:00.000Z',
    passNumber: '012'
  }
]

const _passes = ref<Pass[]>([])
let _initialized = false

function init() {
  if (_initialized) return
  _initialized = true
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      _passes.value = JSON.parse(stored)
    } else {
      _passes.value = [...SEEDED_PASSES]
      persist()
    }
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
