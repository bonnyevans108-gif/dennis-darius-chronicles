import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, Heart, MessageCircle, Eye, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  author: string;
  created_at: string;
  read_time: string | null;
  category: string;
  image_url: string | null;
  tags: string[] | null;
  likes: number | null;
  comments: number | null;
  featured: boolean | null;
  views: number | null;
}

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error || !data) {
        console.error('Error fetching blog post:', error);
        navigate('/');
        return;
      }

      setPost(data);
      setLikesCount(data.likes || 0);

      // Increment views
      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id);

      setIsLoading(false);
    };

    fetchPost();

    // Check if user already liked this post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (id && likedPosts.includes(id)) {
      setLiked(true);
    }
  }, [id, navigate]);

  const handleLike = async () => {
    if (!post || liked) return;

    const newLikes = likesCount + 1;
    setLikesCount(newLikes);
    setLiked(true);

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    likedPosts.push(post.id);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

    await supabase
      .from('blog_posts')
      .update({ likes: newLikes })
      .eq('id', post.id);
  };

  const handleComment = async () => {
    if (!commentText.trim() || !post) return;

    const newComments = (post.comments || 0) + 1;
    await supabase
      .from('blog_posts')
      .update({ comments: newComments })
      .eq('id', post.id);

    setPost({ ...post, comments: newComments });
    setCommentName('');
    setCommentText('');
    toast({ title: 'Comment submitted!', description: 'Thank you for your feedback.' });
  };

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading article...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/#blog')}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden mb-8 bg-muted">
            <img
              src={post.image_url || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop'}
              alt={post.title}
              className="w-full max-h-[500px] object-contain mx-auto"
            />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.read_time || '5 min read'}</span>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{(post.views || 0) + 1} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likesCount} likes</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments || 0} comments</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12 whitespace-pre-wrap text-foreground/90 leading-relaxed">
            {post.content || post.excerpt || 'No content available.'}
          </div>

          {/* Like button */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-border">
            <Button
              variant={liked ? 'default' : 'outline'}
              onClick={handleLike}
              disabled={liked}
              className="gap-2"
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Liked' : 'Like this article'}
            </Button>
            <span className="text-sm text-muted-foreground">{likesCount} people liked this</span>
          </div>

          {/* Comment section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Leave a Comment</h3>
            <div className="space-y-4">
              <Input
                placeholder="Your name (optional)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
              />
              <Textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
              />
              <Button onClick={handleComment} disabled={!commentText.trim()} className="gap-2">
                <Send className="h-4 w-4" />
                Submit Comment
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
