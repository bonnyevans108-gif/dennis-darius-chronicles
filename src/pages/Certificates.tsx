import { useState } from 'react';
import { ArrowLeft, Award, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CustomCursor from '@/components/CustomCursor';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  image: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "First Aid & CPR Certification",
    issuer: "Kenya Red Cross Society",
    date: "2023",
    category: "Health & Safety",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
    description: "Certified in basic first aid, CPR, and emergency response procedures."
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    issuer: "Moringa School",
    date: "2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    description: "Comprehensive training in HTML, CSS, JavaScript, and responsive design."
  },
  {
    id: 3,
    title: "React.js Professional",
    issuer: "Udemy",
    date: "2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    description: "Advanced React.js concepts including hooks, context, and state management."
  },
  {
    id: 4,
    title: "Python Programming",
    issuer: "Coursera",
    date: "2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    description: "Python fundamentals, data structures, and Flask web framework."
  },
  {
    id: 5,
    title: "Photography Masterclass",
    issuer: "Creative Arts Institute",
    date: "2023",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=400&fit=crop",
    description: "Portrait photography, lighting techniques, and post-processing skills."
  },
  {
    id: 6,
    title: "Digital Marketing Basics",
    issuer: "Google Digital Garage",
    date: "2023",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "SEO, social media marketing, and content strategy fundamentals."
  }
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...new Set(certificates.map(c => c.category))];
  
  const filteredCerts = filter === 'All' 
    ? certificates 
    : certificates.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <div className="font-bold text-xl glow-text">
              Darius<span className="text-primary">Mukoya</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Achievements</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Certificates & <span className="text-primary">Credentials</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my professional certifications and achievements across technology, 
              health & safety, and creative fields.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, index) => (
              <Card 
                key={cert.id}
                className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {cert.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCerts.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No certificates found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title}
                className="w-full aspect-video object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedCert(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-3">
                {selectedCert.category}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{selectedCert.title}</h2>
              <p className="text-muted-foreground mb-4">
                Issued by <span className="text-foreground font-medium">{selectedCert.issuer}</span> • {selectedCert.date}
              </p>
              <p className="text-muted-foreground">
                {selectedCert.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
