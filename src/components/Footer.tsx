import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' }
    ],
    services: [
      { name: 'Web Development', href: '#' },
      { name: 'Photography', href: '#' },
      { name: 'First Aid Training', href: '#' },
      { name: 'Consulting', href: '#' }
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/mukoyadariu' },
      { name: 'Instagram', href: 'https://www.instagram.com/fw.darius._' },
      { name: 'Portfolio', href: 'https://darius-2023.netlify.app/' }
    ]
  };

  const partnerships = [
    { name: 'Red Cross', logo: '🏥' },
    { name: 'TechCorp', logo: '💻' },
    { name: 'Creative Studio', logo: '🎨' },
    { name: 'StartupHub', logo: '🚀' },
    { name: 'PhotoPro', logo: '📸' },
    { name: 'DevCommunity', logo: '👥' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border" style={{ background: 'linear-gradient(135deg, hsl(270 61% 28% / 0.1), hsl(355 56% 64% / 0.08))' }}>
      {/* Partnership Section */}
      <div className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Trusted <span className="text-primary">Partners</span>
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnerships.map((partner) => (
              <div
                key={partner.name}
                className="skill-badge p-4 rounded-lg flex items-center space-x-3 group cursor-pointer"
              >
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="font-bold text-2xl glow-text">
                Darius<span className="text-primary">Mukoya</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to my creative space! Here, technology meets artistry and compassion. 
                Junior web developer at Pwani University.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+254793932805</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>dennisdarius43@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Kilifi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 animated-underline"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 animated-underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {footerLinks.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="skill-badge px-3 py-2 rounded-lg text-sm text-center hover:scale-105 transition-transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Follow me for updates on my latest projects and community work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-border gradient-section-alt">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Darius Mukoya. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-primary animate-pulse" />
              <span>in Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;