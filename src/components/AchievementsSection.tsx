import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, Award, Medal, Crown } from 'lucide-react';

const AchievementsSection = () => {
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

    const section = document.getElementById('achievements');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      category: "Professional",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      items: [
        {
          title: "Full-Stack Developer Certification",
          organization: "Meta",
          year: "2024",
          description: "Completed comprehensive React and Node.js certification"
        },
        {
          title: "AWS Cloud Practitioner",
          organization: "Amazon Web Services",
          year: "2023",
          description: "Certified in cloud computing fundamentals and AWS services"
        },
        {
          title: "Best Student Project Award",
          organization: "University of Nairobi",
          year: "2024",
          description: "AI-powered web application for student management"
        }
      ]
    },
    {
      category: "Community & Service",
      icon: Star,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      items: [
        {
          title: "Red Cross First Aid Certified",
          organization: "Kenya Red Cross",
          year: "2023",
          description: "Certified in emergency first aid and CPR"
        },
        {
          title: "Youth Volunteer Leader",
          organization: "Local Community Center",
          year: "2022-2024",
          description: "Led tech workshops for underprivileged youth"
        },
        {
          title: "Blood Donation Champion",
          organization: "Kenya Red Cross",
          year: "2023",
          description: "Organized 5 successful blood donation drives"
        }
      ]
    },
    {
      category: "Technical Excellence",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      items: [
        {
          title: "Hackathon Winner",
          organization: "Nairobi Tech Week",
          year: "2024",
          description: "Built an innovative fintech solution in 48 hours"
        },
        {
          title: "Open Source Contributor",
          organization: "GitHub",
          year: "2023-2024",
          description: "100+ contributions to popular React libraries"
        },
        {
          title: "Photography Exhibition",
          organization: "Nairobi Gallery",
          year: "2023",
          description: "Featured photographer in 'Young Talents' exhibition"
        }
      ]
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "25+", icon: Target },
    { label: "Certifications", value: "8", icon: Award },
    { label: "Awards Won", value: "12", icon: Medal },
    { label: "Years Experience", value: "3+", icon: Crown }
  ];

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Achievements & Recognition
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Milestones that reflect my dedication to excellence and continuous growth
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Achievements by Category */}
        <div className="space-y-12">
          {achievements.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(categoryIndex + 1) * 300}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${category.bgColor} ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((achievement, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-border/50 hover:border-primary/30"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {achievement.title}
                      </CardTitle>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {achievement.organization}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{achievement.year}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;