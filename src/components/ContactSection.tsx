import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Coffee, Download, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MpesaPaymentModal from './MpesaPaymentModal';

const ContactSection = () => {
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+254793932805',
      href: 'tel:+254793932805'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'dennisdarius43@gmail.com',
      href: 'mailto:dennisdarius43@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kilifi, Kenya',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 glow-text">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to work together? Let's discuss your project or just say hello. 
            I'm always excited to connect with fellow developers and potential collaborators.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="hero-card border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Let's Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-center space-x-4 p-4 rounded-lg skill-badge group"
                    >
                      <div className="skill-badge p-3 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full group"
                onClick={() => setIsMpesaModalOpen(true)}
              >
                <Coffee className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Buy Me a Coffee
              </Button>
              <Button variant="outline" size="lg" className="w-full group">
                <Download className="mr-2 h-5 w-5 group-hover:bounce transition-transform" />
                Download My CV
              </Button>
            </div>

            {/* Social Links */}
            <Card className="hero-card border-border/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/mukoyadariu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-badge px-4 py-2 rounded-full text-sm font-medium hover:scale-110 transition-transform"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/fw.darius._"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-badge px-4 py-2 rounded-full text-sm font-medium hover:scale-110 transition-transform"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://darius-2023.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-badge px-4 py-2 rounded-full text-sm font-medium hover:scale-110 transition-transform"
                  >
                    Portfolio
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="hero-card border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50"
                />
                
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-background/50"
                />
                
                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <MpesaPaymentModal 
        isOpen={isMpesaModalOpen} 
        onClose={() => setIsMpesaModalOpen(false)} 
      />
    </section>
  );
};

export default ContactSection;