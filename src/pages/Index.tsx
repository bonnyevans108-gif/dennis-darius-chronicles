import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import GallerySection from '@/components/GallerySection';
import HobbiesSection from '@/components/HobbiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <BlogSection />
        <GallerySection />
        <HobbiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
