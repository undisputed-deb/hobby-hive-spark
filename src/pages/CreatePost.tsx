import CreatePostForm from '@/components/posts/CreatePostForm';

interface CreatePostProps {
  onCreatePost: (post: {
    title: string;
    content: string;
    image_url: string;
    category: string;
    author: string;
  }) => void;
}

export default function CreatePost({ onCreatePost }: CreatePostProps) {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            Share Your Startup Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether it's a brilliant idea, a question for the community, or showcasing your progress - 
            the startup community is here to support you! 🚀
          </p>
        </div>

        {/* Form */}
        <CreatePostForm onSubmit={onCreatePost} />

        {/* Tips */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="glass-card p-8 border-white/20">
            <h2 className="text-xl font-bold text-gradient-secondary mb-6">
              💡 Tips for Great Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">📝 Ideas & Feedback</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific about your target market</li>
                  <li>• Include your current stage and progress</li>
                  <li>• Ask specific questions for better feedback</li>
                  <li>• Share your challenges and concerns</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🚀 Showcases</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Include metrics and results when possible</li>
                  <li>• Share lessons learned and failures</li>
                  <li>• Add screenshots or demo links</li>
                  <li>• Explain your tech stack or methodology</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary">
                <strong>Pro Tip:</strong> Posts with images get 3x more engagement! 
                Consider adding mockups, screenshots, or relevant visuals to your post.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}