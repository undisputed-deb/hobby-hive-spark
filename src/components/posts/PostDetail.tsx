import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowUp, 
  MessageCircle, 
  Share2, 
  Clock, 
  User,
  Edit,
  Trash2,
  Send,
  ArrowLeft,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

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

interface Comment {
  id: string;
  content: string;
  author: string;
  created_at: string;
  post_id: string;
}

interface PostDetailProps {
  post: Post | null;
  comments: Comment[];
  onUpvote: (postId: string) => void;
  onAddComment: (postId: string, content: string, author: string) => void;
  onDeletePost: (postId: string) => void;
  onEditPost: (post: Post) => void;
}

export default function PostDetail({ 
  post, 
  comments, 
  onUpvote, 
  onAddComment, 
  onDeletePost,
  onEditPost 
}: PostDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(post?.upvotes || 0);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (post) {
      setCurrentUpvotes(post.upvotes);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="btn-neon-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feed
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleUpvote = () => {
    if (!isUpvoted) {
      setCurrentUpvotes(prev => prev + 1);
      setIsUpvoted(true);
      onUpvote(post.id);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !commentAuthor.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both comment and author name.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingComment(true);

    try {
      await onAddComment(post.id, newComment.trim(), commentAuthor.trim());
      setNewComment('');
      toast({
        title: "Comment Added! 💬",
        description: "Your comment has been added to the discussion.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      onDeletePost(post.id);
      navigate('/');
      toast({
        title: "Post Deleted",
        description: "The post has been removed from the community.",
      });
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" className="glass-card-hover">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Feed
        </Button>
      </Link>

      {/* Post Content */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg text-foreground">{post.author}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </span>
                  {post.views && (
                    <>
                      <span>•</span>
                      <Eye className="h-3 w-3" />
                      <span>{post.views} views</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditPost(post)}
                  className="glass-card-hover text-muted-foreground hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="glass-card-hover text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h1 className="text-3xl font-bold mb-6 text-gradient-primary">
            {post.title}
          </h1>

          {post.content && (
            <div className="mb-6">
              <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          )}

          {post.image_url && (
            <div className="mb-6">
              <div className="relative overflow-hidden rounded-xl border border-white/20">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full max-h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleUpvote}
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isUpvoted 
                    ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <ArrowUp className={`h-5 w-5 ${isUpvoted ? 'fill-current' : ''}`} />
                <span className="font-semibold">{currentUpvotes}</span>
              </Button>

              <Button variant="ghost" className="flex items-center space-x-2 text-muted-foreground">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">{comments.length}</span>
              </Button>
            </div>

            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <h2 className="text-xl font-bold text-gradient-secondary flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Discussion ({comments.length})</span>
          </h2>
        </CardHeader>

        <CardContent>
          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="mb-8 space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="px-4 py-2 glass-card border border-white/20 rounded-lg focus:border-primary/50 transition-all duration-300"
                required
              />
            </div>
            <Textarea
              placeholder="Join the discussion! Share your thoughts, feedback, or questions..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="glass-card border-white/20 focus:border-primary/50 transition-all duration-300 min-h-[100px] resize-none"
              required
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmittingComment}
                className="btn-neon-secondary"
              >
                {isSubmittingComment ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Posting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Add Comment</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {comments.length > 0 && <Separator className="mb-6" />}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-semibold text-foreground">{comment.author}</p>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="glass-card bg-muted/5 p-4 rounded-lg border border-white/10">
                    <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No comments yet</p>
                <p>Be the first to start the discussion!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}