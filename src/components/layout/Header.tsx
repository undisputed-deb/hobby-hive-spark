import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, TrendingUp, Users, Rocket } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="glass-card sticky top-0 z-50 w-full border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Rocket className="h-8 w-8 text-primary pulse-neon" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary">
                HobbyHub
              </h1>
              <p className="text-xs text-muted-foreground">
                Startup Community
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search startups, ideas, discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-white/20 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link to="/trending">
              <Button
                variant={location.pathname === '/trending' ? 'default' : 'ghost'}
                size="sm"
                className={`${
                  location.pathname === '/trending'
                    ? 'btn-neon-secondary'
                    : 'glass-card-hover text-foreground hover:text-primary'
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </Link>
            
            <Link to="/community">
              <Button
                variant="ghost"
                size="sm"
                className="glass-card-hover text-foreground hover:text-primary"
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </Button>
            </Link>

            <Link to="/create">
              <Button className="btn-neon-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}