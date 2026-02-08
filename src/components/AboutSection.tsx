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
      description: 'Crafting modern, responsive web applications with HTML, CSS, JavaScript, React, and Python.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Python', 'Flask']
    },
    {
      icon: Heart,
      title: 'Red Cross First Aid',
      description: 'Certified first aider passionate about helping others in emergency situations.',
      skills: ['CPR', 'Emergency Response', 'Community Service', 'Training']
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Capturing moments and telling stories through the lens of creativity.',
      skills: ['Portrait', 'Landscape', 'Event', 'Digital Editing']
    },
    {
      icon: GraduationCap,
      title: 'Continuous Learning',
      description: 'Currently studying at Pwani University and Moringa School, always evolving.',
      skills: ['Problem Solving', 'Innovation', 'Collaboration', 'Mentoring']
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
            I'm Darius Mukoya, a passionate junior web developer studying at Pwani University and Moringa School. 
            Welcome to my creative space where technology meets artistry and compassion. 
            I create meaningful digital solutions while serving my community.
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
            { number: '10+', label: 'Projects Completed' },
            { number: '2+', label: 'Years Learning' },
            { number: '100+', label: 'People Helped' },
            { number: '24/7', label: 'Ready to Code' }
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