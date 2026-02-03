import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderKanban, MessageSquare, Image, Eye, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  blogPosts: { total: number; published: number };
  projects: { total: number; published: number };
  testimonials: { total: number; published: number };
  galleryImages: { total: number; published: number };
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    blogPosts: { total: 0, published: 0 },
    projects: { total: 0, published: 0 },
    testimonials: { total: 0, published: 0 },
    galleryImages: { total: 0, published: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogRes, projectsRes, testimonialsRes, galleryRes] = await Promise.all([
          supabase.from('blog_posts').select('id, published'),
          supabase.from('projects').select('id, published'),
          supabase.from('testimonials').select('id, published'),
          supabase.from('gallery_images').select('id, published'),
        ]);

        setStats({
          blogPosts: {
            total: blogRes.data?.length || 0,
            published: blogRes.data?.filter(p => p.published).length || 0,
          },
          projects: {
            total: projectsRes.data?.length || 0,
            published: projectsRes.data?.filter(p => p.published).length || 0,
          },
          testimonials: {
            total: testimonialsRes.data?.length || 0,
            published: testimonialsRes.data?.filter(p => p.published).length || 0,
          },
          galleryImages: {
            total: galleryRes.data?.length || 0,
            published: galleryRes.data?.filter(p => p.published).length || 0,
          },
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Blog Posts',
      icon: FileText,
      total: stats.blogPosts.total,
      published: stats.blogPosts.published,
      href: '/admin/blog',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Projects',
      icon: FolderKanban,
      total: stats.projects.total,
      published: stats.projects.published,
      href: '/admin/projects',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Testimonials',
      icon: MessageSquare,
      total: stats.testimonials.total,
      published: stats.testimonials.published,
      href: '/admin/testimonials',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Gallery Images',
      icon: Image,
      total: stats.galleryImages.total,
      published: stats.galleryImages.published,
      href: '/admin/gallery',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your admin dashboard. Manage your website content from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isLoading ? '...' : stat.total}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Eye className="h-4 w-4" />
                <span>{isLoading ? '...' : stat.published} published</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/admin/blog" 
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Write Blog Post</p>
          </a>
          <a 
            href="/admin/projects" 
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <FolderKanban className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Add Project</p>
          </a>
          <a 
            href="/admin/testimonials" 
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Add Testimonial</p>
          </a>
          <a 
            href="/admin/gallery" 
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Image className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Upload Image</p>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
