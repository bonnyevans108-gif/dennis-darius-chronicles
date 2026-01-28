import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code, Palette, Server, Camera, Heart, Zap } from 'lucide-react';

const SkillsSection = () => {
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

    const section = document.querySelector('#skills');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      skills: [
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 88 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'React.js', level: 80 }
      ]
    },
    {
      icon: Server,
      title: 'Backend Development',
      skills: [
        { name: 'Python', level: 82 },
        { name: 'Flask', level: 78 },
        { name: 'SQLAlchemy', level: 75 },
        { name: 'REST APIs', level: 80 }
      ]
    },
    {
      icon: Palette,
      title: 'Design & Tools',
      skills: [
        { name: 'Git / GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Responsive Design', level: 85 },
        { name: 'UI/UX Basics', level: 75 }
      ]
    },
    {
      icon: Camera,
      title: 'Photography',
      skills: [
        { name: 'Portrait Photography', level: 85 },
        { name: 'Event Photography', level: 80 },
        { name: 'Photo Editing', level: 88 },
        { name: 'Lightroom / Photoshop', level: 82 }
      ]
    },
    {
      icon: Heart,
      title: 'First Aid & Safety',
      skills: [
        { name: 'CPR Certification', level: 95 },
        { name: 'Emergency Response', level: 90 },
        { name: 'Community Training', level: 85 },
        { name: 'Risk Assessment', level: 80 }
      ]
    },
    {
      icon: Zap,
      title: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 88 },
        { name: 'Team Collaboration', level: 85 },
        { name: 'Communication', level: 90 },
        { name: 'Time Management', level: 82 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical abilities, creative skills, and community service expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className={`hero-card border-border/50 backdrop-blur-sm ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="skill-badge p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={isVisible ? skill.level : 0} 
                          className="h-2 transition-all duration-1000 ease-out"
                          style={{ transitionDelay: `${categoryIndex * 0.1 + 0.5}s` }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tech stack badges */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-semibold mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'HTML5', 'CSS3', 'JavaScript', 'React', 'Python', 'Flask',
              'SQLAlchemy', 'Git', 'GitHub', 'REST APIs', 'PostgreSQL', 'VS Code'
            ].map((tech) => (
              <div
                key={tech}
                className="skill-badge px-4 py-2 rounded-full text-sm font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;