import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, ArrowDown } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';
import dennisPortrait from '@/assets/dennis-portrait.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const roles = [
    'Web Developer',
    'Red Cross First Aider',
    'Photographer',
    'Software Engineer',
    'Problem Solver'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" style={{ background: 'var(--gradient-plum-medium)' }} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                <span className="glow-text">Darius </span>
                <span className="text-primary">Mukoya</span>
              </h1>
              
              <div className="text-xl lg:text-2xl text-muted-foreground">
                I am a <TypewriterEffect words={roles} />
              </div>
              
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Welcome to my creative space! Here, technology meets artistry and compassion. Building meaningful digital experiences at Pwani University.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="group">
                <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="/DENNIS_MUKOYA_CV.docx" download>
                  <Download className="mr-2 h-5 w-5 group-hover:bounce transition-transform" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Social links */}
            <div className="flex space-x-6 pt-4">
              <a
                href="https://github.com/mukoyadariu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/fw.darius._"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                Instagram
              </a>
              <a
                href="https://darius-2023.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                Portfolio
              </a>
            </div>
          </div>

          {/* Image */}
          <div className={`flex justify-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative">
              <div className="liquid-container w-80 h-80 lg:w-96 lg:h-96 overflow-hidden">
                <img
                  src={dennisPortrait}
                  alt="Darius Mukoya"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 skill-badge px-4 py-2 rounded-full text-sm font-medium animate-floating">
                🚀 React
              </div>
              <div className="absolute -bottom-4 -left-4 skill-badge px-4 py-2 rounded-full text-sm font-medium animate-floating" style={{ animationDelay: '2s' }}>
                ❤️ First Aid
              </div>
              <div className="absolute top-1/4 -left-8 skill-badge px-4 py-2 rounded-full text-sm font-medium animate-floating" style={{ animationDelay: '4s' }}>
                📸 Photography
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToNext}
            className="rounded-full"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;