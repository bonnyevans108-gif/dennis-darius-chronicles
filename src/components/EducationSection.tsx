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

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Central tree trunk/timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary to-primary/50 transform -translate-x-1/2"></div>
            
            {education.map((edu, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index}
                  className={`relative mb-20 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 400}ms` }}
                >
                  {/* Tree node/circle on trunk */}
                  <div className="absolute left-1/2 top-8 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10 transform -translate-x-1/2"></div>
                  
                  {/* Branch line from trunk to content */}
                  <div className={`absolute top-10 w-16 h-0.5 bg-primary/40 z-5 ${
                    isLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3'
                  }`}></div>
                  
                  {/* Content container */}
                  <div className={`w-1/2 ${isLeft ? 'pr-20' : 'pl-20 ml-auto'} group`}>
                    <div className={`bg-card rounded-xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/30 ${
                      isLeft ? 'hover:-translate-x-2' : 'hover:translate-x-2'
                    }`}>
                      {/* Header */}
                      <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                            <GraduationCap className="w-6 h-6" />
                          </div>
                          <div className={isLeft ? 'text-left' : 'text-right'}>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-primary font-semibold mt-1">{edu.institution}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20">
                          <Award className="w-3 h-3" />
                          {edu.grade}
                        </Badge>
                      </div>
                      
                      {/* Period and location */}
                      <div className={`flex items-center gap-6 text-sm text-muted-foreground mb-4 ${
                        isLeft ? 'justify-start' : 'justify-end'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-muted-foreground leading-relaxed mb-6 ${
                        isLeft ? 'text-left' : 'text-right'
                      }`}>
                        {edu.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className={`font-semibold text-foreground mb-3 flex items-center gap-2 ${
                          isLeft ? 'justify-start' : 'justify-end flex-row-reverse'
                        }`}>
                          <div className="w-1 h-4 bg-primary rounded"></div>
                          Key Achievements
                        </h4>
                        <div className={`flex flex-wrap gap-2 ${
                          isLeft ? 'justify-start' : 'justify-end'
                        }`}>
                          {edu.achievements.map((achievement, i) => (
                            <Badge key={i} variant="outline" className="bg-accent/30 hover:bg-accent/50 transition-colors">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Coursework */}
                      <div>
                        <h4 className={`font-semibold text-foreground mb-3 flex items-center gap-2 ${
                          isLeft ? 'justify-start' : 'justify-end flex-row-reverse'
                        }`}>
                          <div className="w-1 h-4 bg-primary rounded"></div>
                          Relevant Coursework
                        </h4>
                        <div className={`flex flex-wrap gap-2 ${
                          isLeft ? 'justify-start' : 'justify-end'
                        }`}>
                          {edu.coursework.map((course, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-muted/50 hover:bg-muted transition-colors">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Tree end decoration */}
            <div className="absolute left-1/2 -bottom-8 w-6 h-6 bg-primary/30 rounded-full border-4 border-background transform -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;