import TrendingHub from '@/components/community/TrendingHub';

export default function TrendingPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">
            What's Trending
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the hottest discussions, top contributors, and rising startups 
            in our community. Stay ahead of the trends! 📈
          </p>
        </div>

        {/* Trending Content */}
        <TrendingHub />
      </div>
    </div>
  );
}