export type Scene = 'film' | 'music' | 'art' | 'performance' | 'lecture'
export type TimeFilter = 'all' | '6m' | '1m'

export interface FieldVenue {
  id: string
  name: string
  scene: Scene
  events: { date: string }[]
}

export interface FieldEdge {
  source: string
  target: string
  strength: number
  bridge: boolean
}

export interface FieldNodeState {
  id: string
  name: string
  scene: Scene
  weight: number
  attendedCount: number
  upcomingCount: number
  x: number
  y: number
}

export const fieldVenues: FieldVenue[] = [
  { id: 'metrograph',       name: 'Metrograph',              scene: 'film',        events: [{ date: '2025-08-22' }, { date: '2026-05-08' }, { date: '2026-06-22' }] },
  { id: 'anthology',        name: 'Anthology Film Archives', scene: 'film',        events: [{ date: '2025-07-11' }, { date: '2026-02-20' }] },
  { id: 'knockdown',        name: 'Knockdown Center',        scene: 'music',       events: [{ date: '2025-09-05' }, { date: '2026-05-15' }, { date: '2026-07-11' }] },
  { id: 'output',           name: 'Output',                  scene: 'music',       events: [{ date: '2025-10-17' }] },
  { id: 'national-sawdust', name: 'National Sawdust',        scene: 'music',       events: [{ date: '2026-04-03' }] },
  { id: 'kitchen',          name: 'The Kitchen',             scene: 'art',         events: [{ date: '2025-12-19' }] },
  { id: 'drawing-center',   name: 'The Drawing Center',      scene: 'art',         events: [{ date: '2026-02-07' }] },
  { id: 'pioneer-works',    name: 'Pioneer Works',           scene: 'lecture',     events: [{ date: '2025-10-03' }] },
  { id: 'new-school',       name: 'The New School',          scene: 'lecture',     events: [{ date: '2025-12-04' }] },
  { id: 'bam',              name: 'BAM',                     scene: 'performance', events: [{ date: '2026-04-12' }, { date: '2026-06-08' }] },
]

export const fieldEdges: FieldEdge[] = [
  { source: 'metrograph',       target: 'anthology',        strength: 0.9,  bridge: false },
  { source: 'knockdown',        target: 'output',           strength: 0.6,  bridge: false },
  { source: 'knockdown',        target: 'national-sawdust', strength: 0.45, bridge: false },
  { source: 'output',           target: 'national-sawdust', strength: 0.28, bridge: false },
  { source: 'kitchen',          target: 'drawing-center',   strength: 0.42, bridge: false },
  { source: 'pioneer-works',    target: 'new-school',       strength: 0.5,  bridge: false },
  // Cross-scene bridges — cultural permeability
  { source: 'pioneer-works',    target: 'anthology',        strength: 0.18, bridge: true  },
  { source: 'national-sawdust', target: 'bam',              strength: 0.15, bridge: true  },
  { source: 'knockdown',        target: 'kitchen',          strength: 0.10, bridge: true  },
]

// Positions designed for visual density and cluster gravity (reference: 800 × 380)
// Heavier nodes anchor toward center; peripheral nodes sit at edges.
const POSITIONS: Record<TimeFilter, Record<string, { x: number; y: number }>> = {
  all: {
    'metrograph':       { x: 210, y: 155 },
    'anthology':        { x: 296, y: 183 },
    'knockdown':        { x: 544, y: 210 },
    'output':           { x: 594, y: 136 },
    'national-sawdust': { x: 608, y: 278 },
    'kitchen':          { x: 390, y:  70 },
    'drawing-center':   { x: 468, y:  90 },
    'pioneer-works':    { x: 204, y: 284 },
    'new-school':       { x: 294, y: 338 },
    'bam':              { x: 536, y: 348 },
  },
  // Last 6 months: Output and Pioneer Works absent; film anchors lose second visit — flatter topology
  '6m': {
    'metrograph':       { x: 198, y: 168 },
    'anthology':        { x: 305, y: 142 },
    'knockdown':        { x: 548, y: 206 },
    'national-sawdust': { x: 640, y: 282 },
    'kitchen':          { x: 386, y:  70 },
    'drawing-center':   { x: 468, y:  90 },
    'new-school':       { x: 258, y: 338 },
    'bam':              { x: 548, y: 352 },
  },
  // This month: two isolated marks from different scenes — sparse, contemplative
  '1m': {
    'metrograph': { x: 285, y: 195 },
    'knockdown':  { x: 515, y: 222 },
  },
}

const TODAY   = '2026-05-27'
const HORIZON = '2026-12-31'

export function getFilteredNodes(filter: TimeFilter): FieldNodeState[] {
  const CUTOFF: Record<TimeFilter, string | null> = {
    all: null, '6m': '2025-11-27', '1m': '2026-04-27',
  }
  const cutoff = CUTOFF[filter]
  const pos = POSITIONS[filter]

  return fieldVenues.flatMap(v => {
    const events = v.events.filter(e => (!cutoff || e.date >= cutoff) && e.date <= HORIZON)
    if (!events.length) return []
    const p = pos[v.id]
    if (!p) return []
    const attendedCount = events.filter(e => e.date <= TODAY).length
    const upcomingCount = events.filter(e => e.date >  TODAY).length
    return [{ id: v.id, name: v.name, scene: v.scene, weight: events.length, attendedCount, upcomingCount, x: p.x, y: p.y }]
  })
}

export function getFilteredEdges(nodeIds: Set<string>): FieldEdge[] {
  return fieldEdges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
}
