import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, User, Heart, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
}

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#blog');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        setBlogPosts(data || []);
      }
      setIsLoading(false);
    };

    fetchBlogPosts();
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (isLoading) {
    return (
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
              My <span className="text-primary">Blog</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Blog posts coming soon! Check back later for insights on development, photography, and community service.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            My <span className="text-primary">Blog</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sharing insights from my journey as a developer, first aider, and photographer. 
            Thoughts on technology, community service, and creative pursuits.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'hero' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 items-stretch">
          {filteredPosts.filter(post => post.featured).map((post, index) => (
            <Card
              key={post.id}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group flex flex-col h-full ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image_url || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
                <Badge variant="secondary" className="absolute top-4 right-4">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.read_time || '5 min read'}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(post.tags || []).slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="skill-badge text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
            <Card
              key={post.id}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group flex flex-col h-full ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image_url || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge variant="secondary" className="absolute top-4 right-4">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.read_time || '5 min read'}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground line-clamp-2 mb-4 text-sm flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(post.tags || []).slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="skill-badge text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" size="sm" className="w-full group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <Button variant="hero" size="lg" className="group">
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;