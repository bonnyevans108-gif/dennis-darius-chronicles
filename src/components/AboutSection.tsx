import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Code, Camera, GraduationCap } from 'lucide-react';

const AboutSection = () => {
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

    const section = document.querySelector('#about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building scalable, production-ready web applications with React, TypeScript, Python, and modern cloud tooling.',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Flask', 'PostgreSQL']
    },
    {
      icon: Heart,
      title: 'Certified First Aider',
      description: 'Red Cross certified first responder — bringing calm decision-making and reliability under pressure to every team.',
      skills: ['CPR', 'Emergency Response', 'Leadership', 'Training']
    },
    {
      icon: Camera,
      title: 'Professional Photography',
      description: 'Commercial and event photographer with a sharp eye for visual storytelling, branding, and content production.',
      skills: ['Portrait', 'Event', 'Branding', 'Adobe Suite']
    },
    {
      icon: GraduationCap,
      title: 'Always Shipping',
      description: 'Continuously learning, contributing to open-source, and shipping side projects. Ready to deliver value from day one.',
      skills: ['Problem Solving', 'Collaboration', 'Agile', 'Ownership']
    }
  ];

  return (
    <section id="about" className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm Darius Mukoya — a software engineer and web developer trained at Moringa School and Pwani University.
            I build fast, accessible web products with React, TypeScript, and Python, and I'm actively open to full-time,
            contract, and freelance opportunities where I can ship real impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className={`hero-card border-border/50 backdrop-blur-sm ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="skill-badge p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="skill-badge">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          {[
            { number: '15+', label: 'Projects Shipped' },
            { number: '3+', label: 'Years Experience' },
            { number: '20+', label: 'Happy Clients' },
            { number: '100%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
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

export default AboutSection;