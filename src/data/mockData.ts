export interface Post {
  id: string;
  title: string;
  content?: string;
  image_url?: string;
  author: string;
  created_at: string;
  upvotes: number;
  comments_count: number;
  category: string;
  views?: number;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  created_at: string;
  post_id: string;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'AI-powered customer service chatbot that reduced support costs by 60%',
    content: 'After 6 months of development, we launched our AI customer service solution. Here are the key metrics and lessons learned from our journey. The implementation process involved training custom models, integrating with existing CRM systems, and ensuring seamless handoffs to human agents when needed.',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    author: 'Sarah Chen',
    created_at: '2024-02-01T10:30:00Z',
    upvotes: 124,
    comments_count: 28,
    category: 'showcase',
    views: 1847
  },
  {
    id: '2',
    title: 'Looking for feedback on our sustainable packaging startup idea',
    content: 'We\'re developing biodegradable packaging made from agricultural waste. The goal is to replace single-use plastics in e-commerce. Would love to hear your thoughts on market viability, pricing strategy, and potential challenges we should prepare for.',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop',
    author: 'Mike Rodriguez',
    created_at: '2024-02-01T08:15:00Z',
    upvotes: 98,
    comments_count: 42,
    category: 'feedback',
    views: 1234
  },
  {
    id: '3',
    title: 'How we got our first 1000 users in 30 days - Complete breakdown',
    content: 'Sharing our exact strategy for rapid user acquisition. This includes our marketing channels, conversion funnels, product hunt launch, and the mistakes we made along the way. Everything is documented with screenshots and metrics.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    author: 'Alex Kim',
    created_at: '2024-01-31T16:45:00Z',
    upvotes: 156,
    comments_count: 67,
    category: 'showcase',
    views: 2856
  },
  {
    id: '4',
    title: 'Revolutionary blockchain solution for supply chain transparency',
    content: 'Our platform uses IoT devices and blockchain to track products from manufacture to consumer. We\'re seeing huge interest from luxury brands and pharmaceutical companies who need to prove authenticity and prevent counterfeiting.',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    author: 'Emma Wilson',
    created_at: '2024-01-31T14:20:00Z',
    upvotes: 89,
    comments_count: 23,
    category: 'idea',
    views: 1456
  },
  {
    id: '5',
    title: 'Should I quit my job to focus on my startup full-time?',
    content: 'I\'ve been working on my SaaS product for 8 months in my spare time. We now have $2K MRR and growing 15% month-over-month. My day job pays $120K but I feel like I\'m not giving the startup the attention it deserves. What would you do?',
    author: 'David Park',
    created_at: '2024-01-31T12:00:00Z',
    upvotes: 67,
    comments_count: 89,
    category: 'question',
    views: 1789
  },
  {
    id: '6',
    title: 'Health tech startup helping rural communities access healthcare',
    content: 'We\'ve developed a telemedicine platform specifically designed for areas with poor internet connectivity. Our solution works on 2G networks and includes offline capabilities. Looking for healthcare professionals to join our advisory board.',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    author: 'Dr. Lisa Zhang',
    created_at: '2024-01-30T19:30:00Z',
    upvotes: 45,
    comments_count: 18,
    category: 'idea',
    views: 987
  },
  {
    id: '7',
    title: 'Fintech for Gen Z: Digital banking that actually gets it',
    content: 'Traditional banks are failing younger users. Our app includes social spending features, AI-powered saving goals, and crypto integration. We just closed our seed round and I\'m sharing our pitch deck and lessons learned.',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    author: 'Tyler Johnson',
    created_at: '2024-01-30T15:45:00Z',
    upvotes: 112,
    comments_count: 34,
    category: 'showcase',
    views: 2145
  },
  {
    id: '8',
    title: 'Need co-founder for climate tech startup - Equity split question',
    content: 'I\'ve been working on carbon capture technology for 2 years, have 3 patents pending, and $50K invested. Looking for a technical co-founder to help with the software side. How should we split equity fairly?',
    author: 'Green Future Co',
    created_at: '2024-01-30T11:15:00Z',
    upvotes: 38,
    comments_count: 56,
    category: 'question',
    views: 1123
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This is incredibly impressive! What was your biggest challenge during the implementation? Did you face any resistance from your support team initially?',
    author: 'John Developer',
    created_at: '2024-02-01T11:00:00Z',
    post_id: '1'
  },
  {
    id: '2',
    content: 'Amazing results! We\'re considering a similar approach. Would love to connect and learn more about your tech stack and training methodology.',
    author: 'TechStartupCEO',
    created_at: '2024-02-01T11:30:00Z',
    post_id: '1'
  },
  {
    id: '3',
    content: 'Great idea! The sustainable packaging market is definitely underserved. Have you looked into partnerships with major e-commerce platforms? That could be a huge distribution channel.',
    author: 'EcoInvestor',
    created_at: '2024-02-01T09:00:00Z',
    post_id: '2'
  },
  {
    id: '4',
    content: 'Love this concept! What\'s your cost per unit compared to traditional packaging? That\'s usually the make-or-break factor for adoption.',
    author: 'PackagingExpert',
    created_at: '2024-02-01T09:45:00Z',
    post_id: '2'
  },
  {
    id: '5',
    content: 'This breakdown is gold! The Product Hunt strategy particularly caught my attention. Did you have any PR or media outreach as part of the launch?',
    author: 'MarketingGuru',
    created_at: '2024-01-31T17:15:00Z',
    post_id: '3'
  }
];

// Helper functions for data management
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const sortPosts = (posts: Post[], sortBy: 'newest' | 'popular'): Post[] => {
  if (sortBy === 'newest') {
    return [...posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else {
    return [...posts].sort((a, b) => b.upvotes - a.upvotes);
  }
};

export const filterPosts = (posts: Post[], searchQuery: string, category?: string): Post[] => {
  let filtered = posts;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(post => post.category === category);
  }

  return filtered;
};