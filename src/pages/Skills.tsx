import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Monitor, Server, Database, Wrench, Users, ShieldAlert, Cpu } from 'lucide-react';

interface Skill {
  _id: string;
  name: string;
  category: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const categoryIcons: Record<string, any> = {
  Frontend: Monitor,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  'Soft Skills': Users,
  Other: Cpu,
};

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch skills');
        return res.json();
      })
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center px-6 pt-28 pb-16 overflow-hidden page-mount-enter">
      {/* Background Glow with slow float animation */}
      <div className="glow-blur bg-amber-500 w-[500px] h-[500px] top-[10%] left-[-10%] animate-float-slow" />
      <div className="glow-blur bg-blue-500 w-[500px] h-[500px] bottom-[5%] right-[-10%] animate-float-reverse" />

      <div className="max-w-5xl w-full z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            My <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Tech Stack</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive breakdown of technologies, frameworks, and tools I use to build scalable products.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-44 rounded-xl bg-white/5 border border-white/5 animate-pulse p-6 space-y-4">
                <div className="h-6 bg-white/10 rounded w-1/3"></div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="h-8 bg-white/10 rounded w-20"></div>
                  <div className="h-8 bg-white/10 rounded w-24"></div>
                  <div className="h-8 bg-white/10 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass rounded-xl p-8 border border-red-500/20 max-w-md mx-auto text-center space-y-4">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Could not load skills</h3>
            <p className="text-sm text-gray-400">⚠️ {error}</p>
          </div>
        )}

        {/* Skills Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(grouped).map(([category, items]) => {
              const IconComponent = categoryIcons[category] || Cpu;
              return (
                <Card
                  key={category}
                  onMouseMove={handleMouseMove}
                  className="glass-card spotlight-card flex flex-col justify-between"
                >
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-amber-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl font-bold">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <div
                          key={skill._id}
                          className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 cursor-default select-none shadow-sm shadow-black/10"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;