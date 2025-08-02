import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import CreatePost from '@/pages/CreatePost';
import PostDetailPage from '@/pages/PostDetailPage';
import TrendingPage from '@/pages/TrendingPage';
import { mockPosts, mockComments, Post, Comment, generateId } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Handle upvote
  const handleUpvote = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, upvotes: post.upvotes + 1 }
          : post
      )
    );
  };

  // Handle create post
  const handleCreatePost = async (newPostData: {
    title: string;
    content: string;
    image_url: string;
    category: string;
    author: string;
  }) => {
    const newPost: Post = {
      id: generateId(),
      title: newPostData.title,
      content: newPostData.content || undefined,
      image_url: newPostData.image_url || undefined,
      author: newPostData.author,
      created_at: new Date().toISOString(),
      upvotes: 0,
      comments_count: 0,
      category: newPostData.category,
      views: 0
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Handle add comment
  const handleAddComment = async (postId: string, content: string, author: string) => {
    const newComment: Comment = {
      id: generateId(),
      content,
      author,
      created_at: new Date().toISOString(),
      post_id: postId
    };

    setComments(prevComments => [...prevComments, newComment]);
    
    // Update post comment count
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments_count: post.comments_count + 1 }
          : post
      )
    );
  };

  // Handle delete post
  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    setComments(prevComments => prevComments.filter(comment => comment.post_id !== postId));
  };

  // Handle edit post
  const handleEditPost = (updatedPost: Post) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
    toast({
      title: "Edit Feature",
      description: "Post editing will be available in the next version!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main className="relative z-10">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                posts={posts}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onUpvote={handleUpvote}
              />
            } 
          />
          <Route 
            path="/create" 
            element={
              <CreatePost onCreatePost={handleCreatePost} />
            } 
          />
          <Route 
            path="/post/:id" 
            element={
              <PostDetailPage
                posts={posts}
                comments={comments}
                onUpvote={handleUpvote}
                onAddComment={handleAddComment}
                onDeletePost={handleDeletePost}
                onEditPost={handleEditPost}
              />
            } 
          />
          <Route 
            path="/trending" 
            element={<TrendingPage />} 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
