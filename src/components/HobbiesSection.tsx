import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Gamepad2, Music, Book, Plane, Dumbbell, Heart, Code } from 'lucide-react';

const HobbiesSection = () => {
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

    const section = document.getElementById('hobbies');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const hobbies = [
    {
      name: "Photography",
      icon: Camera,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Capturing life's beautiful moments through the lens. Specializing in portrait, landscape, and street photography.",
      skills: ["Portrait Photography", "Landscape", "Street Photography", "Photo Editing"],
      experience: "5+ years",
      highlight: "Featured in Nairobi Gallery Exhibition"
    },
    {
      name: "Gaming",
      icon: Gamepad2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Passionate gamer exploring virtual worlds and strategic challenges. Love both competitive and story-driven games.",
      skills: ["Strategy Games", "FPS", "RPG", "Puzzle Games"],
      experience: "10+ years",
      highlight: "Local tournament winner"
    },
    {
      name: "Music Production",
      icon: Music,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Creating beats and melodies in my free time. Exploring electronic music production and sound design.",
      skills: ["Beat Making", "Sound Design", "Mixing", "Digital Audio"],
      experience: "3+ years",
      highlight: "Released 2 electronic tracks"
    },
    {
      name: "Reading",
      icon: Book,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      description: "Avid reader of tech books, sci-fi novels, and personal development literature. Always learning something new.",
      skills: ["Technical Books", "Sci-Fi", "Biographies", "Self-Development"],
      experience: "Lifelong",
      highlight: "50+ books read annually"
    },
    {
      name: "Travel",
      icon: Plane,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      description: "Exploring new cultures and places. Love documenting travel experiences through photography and blogging.",
      skills: ["Travel Planning", "Cultural Exploration", "Adventure Sports", "Travel Photography"],
      experience: "8+ years",
      highlight: "Visited 15+ countries"
    },
    {
      name: "Fitness",
      icon: Dumbbell,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Maintaining physical and mental health through regular workouts and outdoor activities.",
      skills: ["Weight Training", "Cardio", "Hiking", "Yoga"],
      experience: "4+ years",
      highlight: "Marathon finisher"
    },
    {
      name: "Volunteering",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      description: "Giving back to the community through various volunteer activities and social causes.",
      skills: ["Community Service", "Teaching", "First Aid", "Event Organization"],
      experience: "6+ years",
      highlight: "500+ volunteer hours"
    },
    {
      name: "Side Projects",
      icon: Code,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Building experimental apps and tools in my spare time. Love exploring new technologies and frameworks.",
      skills: ["Web Apps", "Mobile Apps", "API Development", "Open Source"],
      experience: "4+ years",
      highlight: "10+ personal projects"
    }
  ];

  return (
    <section id="hobbies" className="py-20 gradient-section-alt">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Hobbies & Interests
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Beyond coding - the activities and passions that fuel my creativity and keep me balanced
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 border-border/50 hover:border-primary/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${hobby.bgColor} ${hobby.color}`}>
                    <hobby.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {hobby.name}
                  </CardTitle>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {hobby.experience}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-accent/50">
                    {hobby.highlight}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hobby.description}
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Skills & Areas</h4>
                  <div className="flex flex-wrap gap-1">
                    {hobby.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
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

export default HobbiesSection;