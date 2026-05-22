export type EventCategory = 'film' | 'music' | 'lecture' | 'exhibition' | 'performance'

export interface OutsideEvent {
  id: string
  slug: string
  index: number
  title: string
  subtitle?: string
  venue: string
  venueSlug: string
  city: string
  date: string
  time: string
  doorsTime?: string
  category: EventCategory
  description: string
  price: string
  tags: string[]
}

const EVENTS: OutsideEvent[] = [
  {
    id: '001',
    slug: 'je-tu-il-elle',
    index: 1,
    title: 'Je Tu Il Elle',
    subtitle: 'Dir. Chantal Akerman, 1974 — 16mm',
    venue: 'Metrograph',
    venueSlug: 'metrograph',
    city: 'New York',
    date: '2025-04-04',
    time: '20:00',
    category: 'film',
    price: '$15',
    description: 'A young woman — played by Akerman herself — passes through three encounters: isolation with sugar and a mattress, a truck driver\'s muted companionship, an erotic reunion with a former lover. Shot in 16mm over four days. Presented as part of the Metrograph\'s extended Akerman retrospective.',
    tags: ['Akerman', 'Belgian Cinema', 'Feminist Cinema']
  },
  {
    id: '002',
    slug: 'objekt',
    index: 2,
    title: 'Objekt',
    subtitle: 'Live — North American Tour',
    venue: 'Output',
    venueSlug: 'output',
    city: 'Brooklyn',
    date: '2025-04-12',
    time: '23:00',
    doorsTime: '22:00',
    category: 'music',
    price: '$22',
    description: 'Berlin-based producer T.J. Hertz plays a rare live set at Output. Expect hard-edged, genre-collapsing electronic music that moves between UK hardcore, industrial, and the edge of floor-functional. One of the most disciplined selectors in contemporary club music.',
    tags: ['Techno', 'Experimental', 'Berlin']
  },
  {
    id: '003',
    slug: 'hito-steyerl-visibility',
    index: 3,
    title: 'How Not To Be Seen',
    subtitle: 'A lecture by Hito Steyerl',
    venue: 'Pioneer Works',
    venueSlug: 'pioneer-works',
    city: 'Brooklyn',
    date: '2025-04-18',
    time: '19:00',
    category: 'lecture',
    price: 'Free',
    description: 'Artist and filmmaker Hito Steyerl speaks on machine vision, the aesthetics of resolution, and what it means to disappear in an era of algorithmic surveillance. An extension of her ongoing inquiry into the politics of image-making. Co-presented with The New School.',
    tags: ['Media Theory', 'AI', 'Contemporary Art']
  },
  {
    id: '004',
    slug: 'simone-leigh-sovereignty',
    index: 4,
    title: 'Simone Leigh: Sovereignty',
    subtitle: 'Survey exhibition',
    venue: 'The Kitchen',
    venueSlug: 'the-kitchen',
    city: 'New York',
    date: '2025-04-01',
    time: '11:00',
    category: 'exhibition',
    price: '$20',
    description: 'The first comprehensive New York survey of Simone Leigh\'s practice — sculpture, video, and performance spanning two decades. Centering Black feminine subjectivity, archival knowledge production, and the politics of care. Open through early June.',
    tags: ['Sculpture', 'Black Feminism', 'Contemporary']
  },
  {
    id: '005',
    slug: 'stalker',
    index: 5,
    title: 'Stalker',
    subtitle: 'Dir. Andrei Tarkovsky, 1979 — 4K restoration',
    venue: 'Anthology Film Archives',
    venueSlug: 'anthology',
    city: 'New York',
    date: '2025-04-25',
    time: '19:30',
    category: 'film',
    price: '$16',
    description: 'A guide leads two men through a forbidden area known as the Zone, toward a room said to grant one\'s innermost desires. New 4K restoration from Mosfilm archives. 163 minutes. The Zone has never looked so present. Post-screening discussion with the programmer.',
    tags: ['Tarkovsky', 'Soviet Cinema', 'Restoration']
  },
  {
    id: '006',
    slug: 'rite-of-spring',
    index: 6,
    title: 'The Rite of Spring',
    subtitle: 'Tanztheater Wuppertal Pina Bausch',
    venue: 'BAM Howard Gilman Opera House',
    venueSlug: 'bam',
    city: 'Brooklyn',
    date: '2025-05-02',
    time: '19:30',
    category: 'performance',
    price: '$55',
    description: 'Pina Bausch\'s monumental Rite of Spring, performed on a stage covered in earth. The bodies that fall and rise from the soil are all that stand between Stravinsky\'s score and something more ancient. A defining work of the twentieth century, performed by the company Bausch built.',
    tags: ['Dance', 'Stravinsky', 'Bausch']
  },
  {
    id: '007',
    slug: 'platform-as-publisher',
    index: 7,
    title: 'Platform as Publisher',
    subtitle: 'Symposium on digital infrastructure and cultural power',
    venue: 'The New School',
    venueSlug: 'new-school',
    city: 'New York',
    date: '2025-05-09',
    time: '10:00',
    category: 'lecture',
    price: 'Free',
    description: 'A half-day symposium on the political economy of digital platforms as cultural gatekeepers. Speakers from media criticism, engineering, and independent publishing. What happens to culture when distribution is owned by four companies?',
    tags: ['Digital Culture', 'Media Theory', 'Politics']
  },
  {
    id: '008',
    slug: 'arca-live',
    index: 8,
    title: 'Arca',
    subtitle: 'Kick Tour — Live A/V',
    venue: 'Knockdown Center',
    venueSlug: 'knockdown-center',
    city: 'Queens',
    date: '2025-05-16',
    time: '21:00',
    doorsTime: '20:00',
    category: 'music',
    price: '$35',
    description: 'Venezuelan producer and performance artist Alejandra Ghersi presents her most visceral live show to date — surround sound, full visual system, and a set that refuses all genre containment. Presented in Knockdown Center\'s main hall. Support from SHYBOI.',
    tags: ['Electronic', 'Experimental', 'Performance Art']
  }
]

export function useEvents() {
  const events = EVENTS

  function getEventBySlug(slug: string): OutsideEvent | undefined {
    return EVENTS.find(e => e.slug === slug)
  }

  function getEventById(id: string): OutsideEvent | undefined {
    return EVENTS.find(e => e.id === id)
  }

  function filterEvents(city?: string, category?: EventCategory | '') {
    return EVENTS.filter(e => {
      if (city && e.city !== city) return false
      if (category && e.category !== category) return false
      return true
    })
  }

  const cities = [...new Set(EVENTS.map(e => e.city))]
  const categories: EventCategory[] = ['film', 'music', 'lecture', 'exhibition', 'performance']

  return { events, getEventBySlug, getEventById, filterEvents, cities, categories }
}
