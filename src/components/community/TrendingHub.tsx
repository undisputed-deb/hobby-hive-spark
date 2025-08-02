import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  Clock,
  ArrowUp,
  MessageCircle,
  Star,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrendingPost {
  id: string;
  title: string;
  author: string;
  upvotes: number;
  comments: number;
  category: string;
  trend_score: number;
}

interface TopContributor {
  name: string;
  posts: number;
  upvotes: number;
  avatar: string;
}

interface RisingStartup {
  name: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
}

const mockTrendingPosts: TrendingPost[] = [
  {
    id: '1',
    title: 'AI-powered customer service that reduced costs by 60%',
    author: 'Sarah Chen',
    upvotes: 124,
    comments: 28,
    category: 'showcase',
    trend_score: 95
  },
  {
    id: '2',
    title: 'How we got our first 1000 users in 30 days',
    author: 'Mike Rodriguez',
    upvotes: 98,
    comments: 42,
    category: 'feedback',
    trend_score: 88
  },
  {
    id: '3',
    title: 'Revolutionary blockchain solution for supply chain',
    author: 'Alex Kim',
    upvotes: 76,
    comments: 19,
    category: 'idea',
    trend_score: 82
  }
];

const mockTopContributors: TopContributor[] = [
  { name: 'Sarah Chen', posts: 15, upvotes: 342, avatar: '👩‍💼' },
  { name: 'Mike Rodriguez', posts: 12, upvotes: 298, avatar: '👨‍💻' },
  { name: 'Alex Kim', posts: 8, upvotes: 187, avatar: '👨‍🎨' },
  { name: 'Emma Wilson', posts: 10, upvotes: 156, avatar: '👩‍🔬' }
];

const mockRisingStartups: RisingStartup[] = [
  {
    name: 'EcoTrack',
    description: 'Carbon footprint tracking for businesses',
    category: 'sustainability',
    upvotes: 89,
    comments: 23
  },
  {
    name: 'CodeMentor AI',
    description: 'AI-powered programming education',
    category: 'education',
    upvotes: 67,
    comments: 18
  },
  {
    name: 'HealthSync',
    description: 'Telehealth platform for rural areas',
    category: 'healthcare',
    upvotes: 54,
    comments: 15
  }
];

export default function TrendingHub() {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'idea': return 'bg-primary/20 text-primary border-primary/30';
      case 'feedback': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'showcase': return 'bg-accent/20 text-accent border-accent/30';
      case 'question': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card-hover text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-primary mb-1">24.7K</div>
            <div className="text-sm text-muted-foreground">Entrepreneurs</div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-secondary mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-secondary mb-1">$2.1M</div>
            <div className="text-sm text-muted-foreground">Total Raised</div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-success mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-primary mb-1">156</div>
            <div className="text-sm text-muted-foreground">Success Stories</div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-secondary mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-secondary mb-1">89%</div>
            <div className="text-sm text-muted-foreground">Growth Rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Posts */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gradient-primary flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Trending Now</span>
                <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTrendingPosts.map((post, index) => (
                <Link key={post.id} to={`/post/${post.id}`}>
                  <div className="glass-card-hover p-4 rounded-xl border border-white/10">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-success">
                            <Zap className="h-3 w-3" />
                            <span>Trending {post.trend_score}%</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>by {post.author}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <ArrowUp className="h-3 w-3" />
                              <span>{post.upvotes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/">
                  <Button variant="ghost" className="w-full glass-card-hover text-primary hover:text-primary">
                    View All Trending Posts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gradient-secondary flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTopContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-lg">
                      {contributor.avatar}
                    </div>
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-secondary flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{contributor.name}</p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span>{contributor.posts} posts</span>
                      <span>•</span>
                      <span>{contributor.upvotes} upvotes</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rising Startups */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gradient-primary flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Rising Startups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRisingStartups.map((startup) => (
                <div key={startup.name} className="glass-card bg-muted/5 p-3 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{startup.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {startup.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {startup.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <ArrowUp className="h-3 w-3" />
                      <span>{startup.upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{startup.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}