import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  Lightbulb,
  Search,
  Plus,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(210 100% 60% / 0.3) 0%, 
            hsl(260 100% 45% / 0.2) 35%, 
            hsl(320 100% 70% / 0.1) 70%, 
            transparent 100%)`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/30 animate-float" />
        <div className="absolute top-40 right-32 w-6 h-6 rounded-full bg-secondary/30 animate-float float-delay-1" />
        <div className="absolute bottom-32 left-40 w-5 h-5 rounded-full bg-accent/30 animate-float float-delay-2" />
        <div className="absolute top-60 left-1/3 w-3 h-3 rounded-full bg-success/30 animate-float" />
        <div className="absolute bottom-48 right-1/4 w-7 h-7 rounded-full bg-primary/20 animate-float float-delay-1" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary pulse-neon" />
            <span className="text-sm font-medium text-foreground">
              Join 24.7K+ Startup Enthusiasts
            </span>
            <Zap className="h-4 w-4 text-accent" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient-primary block mb-2">
              Build the Future
            </span>
            <span className="text-gradient-secondary">
              Together
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            The ultimate community for startup enthusiasts, entrepreneurs, and innovators. 
            Share ideas, get feedback, find co-founders, and turn your vision into reality.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative glass-card border border-white/20 rounded-2xl overflow-hidden">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for startup ideas, discussions, or advice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-32 py-6 text-lg bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/70"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-neon-primary px-6"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 animate-fade-in">
            <Link to="/create">
              <Button className="btn-neon-primary text-lg px-8 py-4 min-w-[200px]">
                <Plus className="h-5 w-5 mr-2" />
                Share Your Idea
              </Button>
            </Link>
            <Link to="/trending">
              <Button variant="outline" className="glass-card-hover text-lg px-8 py-4 min-w-[200px] border-white/20 text-foreground hover:text-primary">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Trending
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gradient-primary mb-2">24.7K+</div>
              <div className="text-muted-foreground">Active Entrepreneurs</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-secondary mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gradient-secondary mb-2">15.2K+</div>
              <div className="text-muted-foreground">Ideas Shared</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-success mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gradient-primary mb-2">$2.1M+</div>
              <div className="text-muted-foreground">Total Funding Raised</div>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-gradient-secondary mb-8">
            Explore Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'AI & Tech', icon: '🤖', count: '2.1K' },
              { name: 'E-commerce', icon: '🛒', count: '1.8K' },
              { name: 'FinTech', icon: '💰', count: '1.2K' },
              { name: 'HealthTech', icon: '🏥', count: '950' }
            ].map((category) => (
              <div key={category.name} className="glass-card-hover p-6 rounded-xl text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} posts</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}