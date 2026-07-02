import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

const ExperienceSection = () => {
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

    const section = document.getElementById('experience');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      role: 'ICT Industrial Attachment',
      company: 'Business Registration Service',
      period: '15th June 2026 — Present',
      duration: '13 weeks',
      location: '17th Floor, 316 Upperhill Chambers, Nairobi, Kenya',
      description: 'Hands-on industrial attachment in ICT operations within a government service environment. Supporting digital systems, data management, and technical infrastructure while gaining real-world exposure to enterprise IT workflows and public-sector technology standards.',
      skills: ['System Administration', 'Data Management', 'Technical Support', 'IT Operations', 'Enterprise Systems']
    }
  ];

  return (
    <section id="experience" className="py-20 gradient-section">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4 glow-text">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional exposure and hands-on training that bridges academic learning with real-world industry practice
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Briefcase className="w-8 h-8" />
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-primary font-semibold mt-1">
                          <Building2 className="w-4 h-4" />
                          {exp.company}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 w-fit">
                        {exp.duration}
                      </Badge>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-accent/30 hover:bg-accent/50 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
