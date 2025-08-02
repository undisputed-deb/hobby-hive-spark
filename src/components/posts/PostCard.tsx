import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUp, 
  MessageCircle, 
  Share2, 
  Clock, 
  User,
  TrendingUp,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Post {
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

interface PostCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
  compact?: boolean;
}

export default function PostCard({ post, onUpvote, compact = false }: PostCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(post.upvotes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isUpvoted) {
      setCurrentUpvotes(prev => prev + 1);
      setIsUpvoted(true);
      onUpvote(post.id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'idea': return 'bg-primary/20 text-primary border-primary/30';
      case 'feedback': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'showcase': return 'bg-accent/20 text-accent border-accent/30';
      case 'question': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  if (compact) {
    return (
      <Link to={`/post/${post.id}`}>
        <Card className="glass-card-hover p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  by {post.author}
                </span>
              </div>
              <h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <ArrowUp className="h-4 w-4" />
                <span>{currentUpvotes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments_count}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="glass-card-hover card-3d mb-6 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground">{post.author}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <Badge className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link to={`/post/${post.id}`} className="block mb-4">
          <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
          
          {post.content && (
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {post.content}
            </p>
          )}

          {post.image_url && (
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isUpvoted 
                  ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
            >
              <ArrowUp className={`h-4 w-4 ${isUpvoted ? 'fill-current' : ''}`} />
              <span>{currentUpvotes}</span>
            </Button>

            <Link to={`/post/${post.id}`}>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments_count}</span>
              </Button>
            </Link>

            {post.views && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Share2 className="h-4 w-4" />
            </Button>
            
            {post.upvotes > 10 && (
              <div className="flex items-center space-x-1 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}