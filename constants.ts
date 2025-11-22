import { FeedItem, ContentType, User } from './types';

// Mock Users
export const USERS: Record<string, User> = {
  alice: {
    id: 'u1',
    name: 'Alice Chen',
    handle: '@alice_c',
    avatarUrl: 'https://picsum.photos/id/64/100/100',
  },
  marcus: {
    id: 'u2',
    name: 'Marcus Johnson',
    handle: '@marcus_j',
    avatarUrl: 'https://picsum.photos/id/91/100/100',
  },
  elena: {
    id: 'u3',
    name: 'Elena Rodriguez',
    handle: '@elena_r',
    avatarUrl: 'https://picsum.photos/id/129/100/100',
  },
  david: {
    id: 'u4',
    name: 'David Kim',
    handle: '@dkim',
    avatarUrl: 'https://picsum.photos/id/177/100/100',
  }
};

// Helper to generate past dates
const getDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const MOCK_FEED: FeedItem[] = [
  {
    id: '1',
    type: ContentType.ARTICLE,
    title: 'The End of the Internet as We Know It',
    publicationName: 'The Atlantic',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/20/600/400',
    description: 'Why the old web is dying and what comes next for digital culture.',
    consumedBy: USERS.alice,
    timestamp: getDaysAgo(0), // Today
    readTimeOrDuration: '12 min read'
  },
  {
    id: '2',
    type: ContentType.VIDEO,
    title: 'Understanding the 4th Dimension',
    publicationName: 'Physics Explained',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/26/600/400',
    description: 'A visual guide to understanding higher dimensions geometrically.',
    consumedBy: USERS.marcus,
    timestamp: getDaysAgo(1), // Yesterday
    readTimeOrDuration: '18:45'
  },
  {
    id: '3',
    type: ContentType.ARTICLE,
    title: 'Minimalism is Dead, Long Live Maximalism',
    publicationName: 'Vogue',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/42/600/400',
    description: 'Interior design trends are shifting rapidly towards clutter and color.',
    consumedBy: USERS.elena,
    timestamp: getDaysAgo(2),
    readTimeOrDuration: '6 min read'
  },
  {
    id: '4',
    type: ContentType.VIDEO,
    title: 'How to make the perfect Sourdough Bread',
    publicationName: 'Bon Appétit',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/88/600/400',
    consumedBy: USERS.david,
    timestamp: getDaysAgo(3),
    readTimeOrDuration: '24:10'
  },
  {
    id: '5',
    type: ContentType.ARTICLE,
    title: 'The Future of AI in Medicine',
    publicationName: 'New York Times',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/112/600/400',
    description: 'Doctors are using new tools to diagnose rare diseases faster than ever.',
    consumedBy: USERS.alice,
    timestamp: getDaysAgo(5),
    readTimeOrDuration: '8 min read'
  },
  // Last Week
  {
    id: '6',
    type: ContentType.VIDEO,
    title: 'Building a cabin in the woods alone',
    publicationName: 'Outdoor Life',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/192/600/400',
    consumedBy: USERS.marcus,
    timestamp: getDaysAgo(8),
    readTimeOrDuration: '45:00'
  },
  {
    id: '7',
    type: ContentType.ARTICLE,
    title: 'Why we sleep: The science of dreams',
    publicationName: 'Scientific American',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/200/600/400',
    consumedBy: USERS.elena,
    timestamp: getDaysAgo(9),
    readTimeOrDuration: '15 min read'
  },
  {
    id: '8',
    type: ContentType.ARTICLE,
    title: 'Review: The best coffee beans of 2024',
    publicationName: 'Sprudge',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/225/600/400',
    consumedBy: USERS.david,
    timestamp: getDaysAgo(10),
    readTimeOrDuration: '4 min read'
  },
  // Two weeks ago
  {
    id: '9',
    type: ContentType.VIDEO,
    title: 'History of Rome: Part I',
    publicationName: 'History Channel',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/237/600/400',
    consumedBy: USERS.alice,
    timestamp: getDaysAgo(15),
    readTimeOrDuration: '1:12:00'
  },
   {
    id: '10',
    type: ContentType.ARTICLE,
    title: 'A Love Letter to Static HTML',
    publicationName: 'Smashing Magazine',
    url: '#',
    thumbnailUrl: 'https://picsum.photos/id/249/600/400',
    description: 'Why simplicity in web development is making a comeback.',
    consumedBy: USERS.david,
    timestamp: getDaysAgo(16),
    readTimeOrDuration: '10 min read'
  }
];