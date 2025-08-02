import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, Send, Lightbulb, MessageSquare, Eye, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePostFormProps {
  onSubmit: (post: {
    title: string;
    content: string;
    image_url: string;
    category: string;
    author: string;
  }) => void;
}

export default function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { value: 'idea', label: 'Idea 💡', icon: Lightbulb, description: 'Share a new startup idea' },
    { value: 'feedback', label: 'Feedback 📝', icon: MessageSquare, description: 'Get feedback on your project' },
    { value: 'showcase', label: 'Showcase 🚀', icon: Eye, description: 'Show off your startup' },
    { value: 'question', label: 'Question ❓', icon: HelpCircle, description: 'Ask the community' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim() || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, author, and category).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim(),
        category,
        author: author.trim()
      });

      toast({
        title: "Post Created! 🎉",
        description: "Your post has been shared with the community.",
      });

      // Reset form
      setTitle('');
      setContent('');
      setImageUrl('');
      setCategory('');
      setAuthor('');
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="glass-card border-white/20 overflow-hidden">
        <CardHeader className="bg-gradient-primary/10 border-b border-white/10">
          <CardTitle className="text-2xl font-bold text-gradient-primary flex items-center space-x-3">
            <Send className="h-6 w-6" />
            <span>Share with the Community</span>
          </CardTitle>
          <p className="text-muted-foreground">
            What's your startup idea, question, or showcase? The community is here to help! 🚀
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author" className="text-foreground font-medium">
                Your Name *
              </Label>
              <Input
                id="author"
                type="text"
                placeholder="e.g., John Doe"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="glass-card border-white/20 focus:border-primary/50 transition-all duration-300"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground font-medium">
                Category *
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="glass-card border-white/20 focus:border-primary/50">
                  <SelectValue placeholder="Choose a category for your post" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/20">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <SelectItem key={cat.value} value={cat.value} className="focus:bg-primary/20">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{cat.label}</p>
                            <p className="text-xs text-muted-foreground">{cat.description}</p>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground font-medium">
                Title *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Revolutionary AI-powered solution for small businesses"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-card border-white/20 focus:border-primary/50 transition-all duration-300 text-lg"
                required
              />
              <p className="text-sm text-muted-foreground">
                Make it catchy! A good title gets more engagement.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-foreground font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Tell us more about your startup, idea, or question. The more details, the better feedback you'll get from the community!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="glass-card border-white/20 focus:border-primary/50 transition-all duration-300 min-h-[120px] resize-none"
              />
              <p className="text-sm text-muted-foreground">
                Share your story, challenges, progress, or ask specific questions.
              </p>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-foreground font-medium flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span>Image URL (Optional)</span>
              </Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/your-image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="glass-card border-white/20 focus:border-primary/50 transition-all duration-300"
              />
              <p className="text-sm text-muted-foreground">
                Add a screenshot, logo, or mockup to make your post more engaging.
              </p>
            </div>

            {imageUrl && (
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Preview</Label>
                <div className="relative overflow-hidden rounded-xl border border-white/20">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="text-sm text-muted-foreground">
                * Required fields
              </div>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="glass-card-hover"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon-primary"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Publish Post</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}