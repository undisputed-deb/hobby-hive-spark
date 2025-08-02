import { useParams } from 'react-router-dom';
import PostDetail from '@/components/posts/PostDetail';
import { Post, Comment } from '@/data/mockData';

interface PostDetailPageProps {
  posts: Post[];
  comments: Comment[];
  onUpvote: (postId: string) => void;
  onAddComment: (postId: string, content: string, author: string) => void;
  onDeletePost: (postId: string) => void;
  onEditPost: (post: Post) => void;
}

export default function PostDetailPage({
  posts,
  comments,
  onUpvote,
  onAddComment,
  onDeletePost,
  onEditPost
}: PostDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  
  const post = posts.find(p => p.id === id) || null;
  const postComments = comments.filter(c => c.post_id === id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <PostDetail
          post={post}
          comments={postComments}
          onUpvote={onUpvote}
          onAddComment={onAddComment}
          onDeletePost={onDeletePost}
          onEditPost={onEditPost}
        />
      </div>
    </div>
  );
}