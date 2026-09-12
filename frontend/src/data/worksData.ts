export interface WorkCategory {
  id: string;
  title: string;
  countOrBadge: string;
  description: string;
  imageUrl: string;
  isHighlight?: boolean;
}

export const WORKS_DATA: WorkCategory[] = [
  {
    id: 'series',
    title: 'SERIES',
    countOrBadge: '↗',
    description: 'We craft compelling series driven by empathy and immersion, telling stories uniquely our own across diverse genres.',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
    isHighlight: true,
  },
  {
    id: 'movies',
    title: 'MOVIES',
    countOrBadge: '3',
    description: 'We create films that deepen stories through a fresh perspective, leaving a lasting impression on audiences.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800',
    isHighlight: false,
  },
  {
    id: 'animation',
    title: 'ANIMATION',
    countOrBadge: '5',
    description: 'We expand stories through animation blending imagination and emotion, loved across generations and borders.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    isHighlight: false,
  },
  {
    id: 'others',
    title: 'OTHERS',
    countOrBadge: '1',
    description: 'We showcase innovative content bridging various categories and digital formats.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800',
    isHighlight: false,
  },
];