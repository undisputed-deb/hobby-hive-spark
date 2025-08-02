import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Clock, 
  Search, 
  Filter,
  Lightbulb,
  MessageSquare,
  Eye,
  HelpCircle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Hero from '@/components/home/Hero';
import PostCard from '@/components/posts/PostCard';
import { mockPosts, Post, sortPosts, filterPosts } from '@/data/mockData';

interface HomeProps {
  posts: Post[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onUpvote: (postId: string) => void;
}

export default function Home({ posts, searchQuery, onSearch, onUpvote }: HomeProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const categories = [
    { value: 'all', label: 'All Categories', icon: Filter, count: posts.length },
    { value: 'idea', label: 'Ideas', icon: Lightbulb, count: posts.filter(p => p.category === 'idea').length },
    { value: 'feedback', label: 'Feedback', icon: MessageSquare, count: posts.filter(p => p.category === 'feedback').length },
    { value: 'showcase', label: 'Showcase', icon: Eye, count: posts.filter(p => p.category === 'showcase').length },
    { value: 'question', label: 'Questions', icon: HelpCircle, count: posts.filter(p => p.category === 'question').length }
  ];

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = filterPosts(posts, localSearchQuery, selectedCategory);
    return sortPosts(filtered, sortBy);
  }, [posts, localSearchQuery, selectedCategory, sortBy]);

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const clearFilters = () => {
    setLocalSearchQuery('');
    setSelectedCategory('all');
    onSearch('');
  };

  const hasActiveFilters = localSearchQuery || selectedCategory !== 'all';

  return (
    <div className="min-h-screen">
      {/* Hero Section - only show if no search/filters active */}
      {!hasActiveFilters && <Hero onSearch={onSearch} />}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {hasActiveFilters && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gradient-primary mb-4">
              Community Feed
            </h1>
            <p className="text-muted-foreground">
              Discover, share, and discuss startup ideas with fellow entrepreneurs
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Search */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gradient-secondary flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLocalSearch} className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    className="glass-card border-white/20 focus:border-primary/50"
                  />
                  <Button type="submit" className="w-full btn-neon-secondary">
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gradient-secondary flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.value;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                        isActive 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'glass-card-hover text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 space-y-3">
                <Link to="/create">
                  <Button className="w-full btn-neon-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </Link>
                <Link to="/trending">
                  <Button variant="outline" className="w-full glass-card-hover border-white/20 text-foreground">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Trending
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {hasActiveFilters && (
              <Card className="glass-card border-white/20">
                <CardContent className="p-6">
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    className="w-full text-muted-foreground hover:text-primary"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {hasActiveFilters ? 'Search Results' : 'Latest Posts'}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({filteredAndSortedPosts.length})
                  </span>
                </h2>
                {localSearchQuery && (
                  <Badge variant="outline" className="text-sm">
                    "{localSearchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="outline" className="text-sm">
                    {categories.find(c => c.value === selectedCategory)?.label}
                  </Badge>
                )}
              </div>

              <Select value={sortBy} onValueChange={(value: 'newest' | 'popular') => setSortBy(value)}>
                <SelectTrigger className="w-40 glass-card border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/20">
                  <SelectItem value="newest" className="focus:bg-primary/20">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Newest</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="popular" className="focus:bg-primary/20">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Popular</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredAndSortedPosts.length > 0 ? (
                filteredAndSortedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUpvote={onUpvote}
                  />
                ))
              ) : (
                <Card className="glass-card p-12 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">No posts found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {localSearchQuery 
                        ? `No posts match your search for "${localSearchQuery}". Try different keywords or browse all posts.`
                        : 'No posts available in this category. Be the first to share something!'}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
                      <Button onClick={clearFilters} variant="outline" className="glass-card-hover">
                        Clear Filters
                      </Button>
                      <Link to="/create">
                        <Button className="btn-neon-primary">
                          <Plus className="h-4 w-4 mr-2" />
                          Create First Post
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Load More (for future pagination) */}
            {filteredAndSortedPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" className="glass-card-hover border-white/20 text-foreground">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}