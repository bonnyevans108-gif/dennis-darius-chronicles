import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const EducationSection = () => {
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

    const section = document.getElementById('education');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Nairobi",
      period: "2020 - 2024",
      location: "Nairobi, Kenya",
      grade: "First Class Honors",
      description: "Specialized in software engineering, data structures, algorithms, and web development. Completed capstone project on AI-driven web applications.",
      achievements: ["Dean's List", "Outstanding Student Award", "Tech Innovation Prize"],
      coursework: ["Data Structures", "Software Engineering", "AI & Machine Learning", "Database Systems", "Web Development"]
    },
    {
      degree: "Kenya Certificate of Secondary Education",
      institution: "Nairobi School",
      period: "2016 - 2019",
      location: "Nairobi, Kenya",
      grade: "A- (83 points)",
      description: "Excelled in Mathematics, Physics, and Computer Studies. Led the school's computer club and organized coding workshops.",
      achievements: ["Mathematics Olympiad Winner", "Computer Club President", "Best STEM Student"],
      coursework: ["Mathematics", "Physics", "Chemistry", "Computer Studies", "English"]
    }
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Education Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic path that shaped my technical foundation and passion for innovation
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                        {edu.degree}
                      </CardTitle>
                      <p className="text-primary font-semibold mt-1">{edu.institution}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {edu.grade}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {edu.location}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, i) => (
                      <Badge key={i} variant="outline" className="bg-accent/50">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Relevant Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
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

export default EducationSection;