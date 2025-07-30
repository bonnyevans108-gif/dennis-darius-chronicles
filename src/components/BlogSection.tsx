import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, User, Heart, MessageCircle } from 'lucide-react';

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React and TypeScript: A Developer\'s Journey',
      excerpt: 'Sharing my experience transitioning from vanilla JavaScript to React with TypeScript. Here are the key lessons I learned and tips for fellow developers.',
      content: 'As a junior developer, making the leap from vanilla JavaScript to React with TypeScript felt overwhelming at first...',
      author: 'Dennis Darius',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
      likes: 42,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: 'First Aid in the Digital Age: How Technology Saves Lives',
      excerpt: 'Exploring how mobile apps and digital tools are revolutionizing emergency response and first aid training in communities.',
      content: 'During my time as a Red Cross volunteer, I\'ve witnessed firsthand how technology can enhance emergency response...',
      author: 'Dennis Darius',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Community Service',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      tags: ['First Aid', 'Technology', 'Red Cross', 'Community'],
      likes: 38,
      comments: 8,
      featured: true
    },
    {
      id: 3,
      title: 'Photography Meets Code: Creating Dynamic Image Galleries',
      excerpt: 'Combining my passion for photography with web development to create stunning, interactive image galleries that tell stories.',
      content: 'Photography and programming might seem like different worlds, but they share more similarities than you might think...',
      author: 'Dennis Darius',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop',
      tags: ['Photography', 'Web Dev', 'Gallery', 'Creative'],
      likes: 31,
      comments: 15,
      featured: false
    },
    {
      id: 4,
      title: 'Building Responsive Websites: Mobile-First Approach',
      excerpt: 'Why starting with mobile design leads to better user experiences and how to implement responsive design effectively.',
      content: 'In today\'s mobile-centric world, responsive design isn\'t just nice to have—it\'s essential...',
      author: 'Dennis Darius',
      date: '2023-12-28',
      readTime: '4 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      tags: ['Responsive', 'Mobile', 'CSS', 'UX'],
      likes: 25,
      comments: 6,
      featured: false
    },
    {
      id: 5,
      title: 'Community Impact Through Technology: My Red Cross Experience',
      excerpt: 'How I\'ve used my programming skills to enhance Red Cross training programs and improve community emergency preparedness.',
      content: 'Volunteering with the Red Cross has taught me that technology can be a powerful force for social good...',
      author: 'Dennis Darius',
      date: '2023-12-20',
      readTime: '8 min read',
      category: 'Community Service',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      tags: ['Red Cross', 'Community', 'Impact', 'Technology'],
      likes: 55,
      comments: 22,
      featured: false
    },
    {
      id: 6,
      title: 'The Art of Clean Code: Lessons from Photography',
      excerpt: 'What photography composition techniques taught me about writing clean, maintainable code.',
      content: 'Both photography and coding are forms of creative expression that benefit from clear structure and thoughtful composition...',
      author: 'Dennis Darius',
      date: '2023-12-15',
      readTime: '5 min read',
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      tags: ['Clean Code', 'Photography', 'Best Practices'],
      likes: 33,
      comments: 9,
      featured: false
    }
  ];

  const categories = ['All', 'Web Development', 'Community Service', 'Photography', 'Programming'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section id="blog" className="py-20">
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
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filteredPosts.filter(post => post.featured).map((post, index) => (
            <Card
              key={post.id}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
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
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="skill-badge text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
            <Card
              key={post.id}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
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
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground line-clamp-2 mb-4 text-sm">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="skill-badge text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
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