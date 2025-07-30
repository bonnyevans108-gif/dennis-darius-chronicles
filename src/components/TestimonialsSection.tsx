import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Project Manager',
      company: 'TechCorp Solutions',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332d2e9?w=400&h=400&fit=crop&crop=face',
      content: 'Dennis is an exceptional developer with a keen eye for detail. His ability to translate complex requirements into beautiful, functional code is remarkable. The Red Cross project he worked on saved our team weeks of development time.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Senior Developer',
      company: 'Digital Innovations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      content: 'Working with Dennis has been a pleasure. His technical skills combined with his first aid expertise brought a unique perspective to our healthcare app project. He\'s reliable, creative, and always delivers quality work.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'UX Designer',
      company: 'Creative Studio',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      content: 'Dennis has an incredible ability to bridge the gap between design and development. His photography background gives him a great aesthetic sense, and his coding skills bring designs to life beautifully.',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'Red Cross Coordinator',
      company: 'Red Cross Kenya',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      content: 'Dennis is not only an excellent first aider but also brought his tech skills to modernize our training programs. His dedication to community service and innovation makes him a valuable team member.',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Startup Founder',
      company: 'GreenTech Startup',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      content: 'Dennis helped us build our MVP in record time. His full-stack expertise and problem-solving approach were exactly what our startup needed. Highly recommend for any web development project.',
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            What People <span className="text-primary">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Testimonials from colleagues, clients, and fellow volunteers who have worked with me 
            on various projects and community initiatives.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className={`hero-card border-border/50 backdrop-blur-sm ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <CardContent className="p-8 lg:p-12">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial content */}
                <blockquote className="text-lg lg:text-xl text-center mb-8 leading-relaxed">
                  "{currentData.content}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={currentData.image} alt={currentData.name} />
                    <AvatarFallback>{currentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">{currentData.name}</h4>
                    <p className="text-muted-foreground">{currentData.role}</p>
                    <p className="text-sm text-primary">{currentData.company}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="group"
                  >
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  </Button>

                  {/* Dots indicator */}
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonial 
                            ? 'bg-primary w-8' 
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="group"
                  >
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          {[
            { number: '98%', label: 'Client Satisfaction' },
            { number: '150+', label: 'Projects Delivered' },
            { number: '50+', label: 'Happy Clients' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 glow-text">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;