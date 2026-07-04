import type { MouseEvent } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';

interface ContactMethod {
  id: number;
  name: string;
  value: string;
  href: string;
  description: string;
  icon: any;
  colorClass: string;
  bgGlow: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 1,
    name: 'GitHub',
    value: 'suryaprabhat',
    href: 'https://github.com/suryaprabhat',
    description: 'Explore my open-source contributions, Python projects, and repositories.',
    icon: FaGithub,
    colorClass: 'text-white hover:border-white/40',
    bgGlow: 'group-hover:bg-white/5',
  },
  {
    id: 2,
    name: 'LinkedIn',
    value: 'Surya Prabhat Maddala',
    href: 'https://www.linkedin.com/in/surya-prabhat-maddala-5178b22bb/',
    description: 'Connect with me for professional opportunities, updates, and networking.',
    icon: FaLinkedin,
    colorClass: 'text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5',
    bgGlow: 'group-hover:bg-blue-500/10',
  },
  {
    id: 3,
    name: 'Twitter / X',
    value: '@MaddalaPrabhat',
    href: 'https://x.com/MaddalaPrabhat',
    description: 'Follow me for dev updates, Python tricks, and system architecture thoughts.',
    icon: FaTwitter,
    colorClass: 'text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5',
    bgGlow: 'group-hover:bg-cyan-500/10',
  },
  {
    id: 4,
    name: 'Email',
    value: 'maddalasuryaprabhat@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=maddalasuryaprabhat@gmail.com',
    description: 'Drop me a direct email for collaboration, freelance work, or general inquiries.',
    icon: FaEnvelope,
    colorClass: 'text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/5',
    bgGlow: 'group-hover:bg-rose-500/10',
  },
];

const Contact = () => {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center px-6 pt-28 pb-16 overflow-hidden page-mount-enter">
      {/* Background Glow with float animation */}
      <div className="glow-blur bg-amber-500 w-[500px] h-[500px] top-[10%] left-[-15%] animate-float-slow" />
      <div className="glow-blur bg-blue-500 w-[500px] h-[500px] bottom-[5%] right-[-10%] animate-float-reverse" />

      <div className="max-w-4xl w-full z-10 space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Get in <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project idea, want to collaborate, or just want to say hi? Feel free to reach out through any channel!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {contactMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <a
                key={method.id}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card 
                  onMouseMove={handleMouseMove}
                  className={`glass-card spotlight-card h-full transition-all duration-300 border border-white/5 hover:border-white/20 ${method.colorClass}`}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-amber-500 tracking-wider uppercase block">
                        {method.name}
                      </span>
                      <CardTitle className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {method.value}
                      </CardTitle>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {method.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 group-hover:text-amber-400 transition-all pt-4">
                      Connect
                      <Send className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;
