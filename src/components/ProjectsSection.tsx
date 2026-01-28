import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
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

    const section = document.querySelector('#projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Social Media App',
      description: 'React.js social media application design. Built using React functional components and React Hooks for a modern, responsive social platform.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      technologies: ['React', 'JavaScript', 'CSS', 'Hooks'],
      liveUrl: '#',
      githubUrl: 'https://github.com/mukoyadariu/Socia-Media-App',
      featured: true
    },
    {
      title: 'Recipe Finder',
      description: 'A web application that allows users to search for recipes and add comments to share their thoughts and feedback.',
      image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop',
      technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
      liveUrl: '#',
      githubUrl: 'https://github.com/mukoyadariu/RECIPE-FINDER',
      featured: true
    },
    {
      title: 'DDS Kitchen',
      description: 'Experience the ultimate culinary journey at DDS Kitchen—Australia\'s finest dining destination. Exquisite flavors crafted with passion.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: '#',
      githubUrl: 'https://github.com/mukoyadariu/DDS-KITCHEN',
      featured: true
    },
    {
      title: 'Pizza Restaurants API',
      description: 'Flask-based API for managing pizza restaurants and their menus. Provides endpoints for CRUD operations on restaurants, pizzas, and associations.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      technologies: ['Python', 'Flask', 'SQLAlchemy', 'REST API'],
      liveUrl: '#',
      githubUrl: 'https://github.com/mukoyadariu/PIZZA-RESTAURANTS'
    },
    {
      title: 'Unheard',
      description: 'Providing alternative perspectives on political discourse since 2023. A platform for diverse voices and viewpoints.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: '#',
      githubUrl: 'https://github.com/mukoyadariu/unheard'
    },
    {
      title: 'Chef Clinton',
      description: 'A professional chef portfolio website showcasing culinary expertise and services.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: '#',
      githubUrl: 'https://github.com/mukoyadariu/CHEF-CLINTON'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work including web applications, photography projects, 
            and community service initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="skill-badge text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex gap-4 w-full">
                  <Button size="sm" className="flex-1 group">
                    <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 group">
                    <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Code
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <Button size="lg" variant="outline" className="group">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;