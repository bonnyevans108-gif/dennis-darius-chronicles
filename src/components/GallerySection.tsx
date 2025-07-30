import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Heart, Download, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#gallery');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'Mountain Sunrise',
      category: 'Landscape',
      description: 'Captured during an early morning hike in the Kenyan highlands',
      camera: 'Canon EOS R5',
      settings: 'f/8, 1/125s, ISO 100',
      likes: 124,
      views: 1250,
      featured: true
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      title: 'Tech Professional',
      category: 'Portrait',
      description: 'Corporate headshot session for a fellow developer',
      camera: 'Sony A7 III',
      settings: 'f/2.8, 1/200s, ISO 400',
      likes: 89,
      views: 890,
      featured: true
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      title: 'Red Cross Training',
      category: 'Event',
      description: 'Documenting first aid training session in rural Kenya',
      camera: 'Canon EOS R6',
      settings: 'f/4, 1/160s, ISO 800',
      likes: 156,
      views: 2100,
      featured: false
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      title: 'Urban Architecture',
      category: 'Architecture',
      description: 'Modern buildings in Nairobi\'s business district',
      camera: 'Fujifilm X-T4',
      settings: 'f/11, 1/250s, ISO 200',
      likes: 67,
      views: 780,
      featured: false
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1494790108755-2616b332d2e9?w=800&h=600&fit=crop',
      title: 'Creative Portrait',
      category: 'Portrait',
      description: 'Studio portrait with creative lighting techniques',
      camera: 'Canon EOS R5',
      settings: 'f/1.8, 1/125s, ISO 250',
      likes: 203,
      views: 1800,
      featured: true
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'Wildlife Safari',
      category: 'Wildlife',
      description: 'African wildlife in their natural habitat',
      camera: 'Canon EOS R6',
      settings: 'f/5.6, 1/500s, ISO 1600',
      likes: 298,
      views: 3200,
      featured: false
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      title: 'Community Event',
      category: 'Event',
      description: 'Local community gathering and celebration',
      camera: 'Sony A7 III',
      settings: 'f/3.5, 1/200s, ISO 640',
      likes: 145,
      views: 1450,
      featured: false
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      title: 'Tech Workspace',
      category: 'Lifestyle',
      description: 'Modern workspace setup for developers',
      camera: 'Fujifilm X-T4',
      settings: 'f/2.8, 1/60s, ISO 320',
      likes: 112,
      views: 1120,
      featured: false
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'Sunset Silhouette',
      category: 'Landscape',
      description: 'Golden hour photography at the coast',
      camera: 'Canon EOS R5',
      settings: 'f/16, 1/60s, ISO 100',
      likes: 187,
      views: 2300,
      featured: true
    }
  ];

  const categories = ['All', 'Portrait', 'Landscape', 'Event', 'Architecture', 'Wildlife', 'Lifestyle'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const currentImage = selectedImage ? filteredImages.find(img => img.id === selectedImage) : null;

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my photography work spanning portraits, landscapes, events, and community documentation. 
            Each image tells a story and captures a moment in time.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'hero' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              <Camera className="mr-2 h-4 w-4" />
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Images */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {filteredImages.filter(image => image.featured).map((image, index) => (
            <Card
              key={image.id}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center space-y-2">
                    <Eye className="h-8 w-8 mx-auto" />
                    <p className="text-sm font-medium">View Full Size</p>
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
                <Badge variant="secondary" className="absolute top-4 right-4">
                  {image.category}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {image.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{image.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{image.views}</span>
                    </div>
                  </div>
                  <span className="text-xs">{image.camera}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.filter(image => !image.featured).map((image, index) => (
            <Card
              key={image.id}
              className={`hero-card border-border/50 backdrop-blur-sm overflow-hidden group cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.05 + 0.5}s` }}
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                  {image.category}
                </Badge>
              </div>
              
              <CardContent className="p-3">
                <h4 className="font-medium mb-1 group-hover:text-primary transition-colors text-sm">
                  {image.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{image.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{image.views}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          {[
            { number: '500+', label: 'Photos Taken' },
            { number: '50+', label: 'Events Covered' },
            { number: '25+', label: 'Happy Clients' },
            { number: '5', label: 'Years Experience' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 glow-text">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
          <Button variant="hero" size="lg" className="group">
            <Camera className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Book a Photo Session
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black/95 border-none">
          {currentImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Image */}
              <div className="flex flex-col items-center justify-center w-full h-full p-8">
                <img
                  src={currentImage.src}
                  alt={currentImage.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Image info */}
                <div className="mt-6 text-center text-white space-y-2">
                  <h3 className="text-2xl font-bold">{currentImage.title}</h3>
                  <p className="text-gray-300">{currentImage.description}</p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <span>{currentImage.camera}</span>
                    <span>{currentImage.settings}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{currentImage.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{currentImage.views}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;