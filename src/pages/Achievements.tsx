import { Trophy, Laptop, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AchievementItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  date: string;
  color: string;
}

const achievementsData: AchievementItem[] = [
  {
    id: 1,
    title: 'National-Level SEO Hackathon',
    subtitle: 'CSE Department, ANITS',
    description: 'Active participant in a highly competitive national-level hackathon, optimizing content structures, performance metrics, and organic visibility strategies.',
    icon: Laptop,
    date: 'Hackathon Participant',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 2,
    title: 'National-Level ML Workshop & Hackathon',
    subtitle: 'CSE Department, ANITS',
    description: 'Participated in intensive sessions covering Artificial Intelligence, Machine Learning, and Data Science, applying predictive models to solve real-world dataset challenges.',
    icon: Calendar,
    date: 'Workshop & Hackathon',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Bhagavad Gita Contest',
    subtitle: 'ISKCON (District Level)',
    description: 'Awarded 2nd Prize in a district-level recitation and knowledge context, demonstrating strong memorization, comprehension, and philosophical articulation.',
    icon: Trophy,
    date: '2nd Prize Winner',
    color: 'from-amber-500 to-orange-500',
  },
];

const Achievements = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center px-6 pt-28 pb-16 overflow-hidden page-mount-enter">
      {/* Background Blurs */}
      <div className="glow-blur bg-amber-500 w-[500px] h-[500px] top-[10%] left-[-10%] animate-float-slow" />
      <div className="glow-blur bg-blue-500 w-[500px] h-[500px] bottom-[10%] right-[-10%] animate-float-reverse" />

      <div className="max-w-4xl w-full z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Honors & <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Achievements</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A history of workshops, hackathons, and certifications I have participated in.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-8 pb-4">
          {achievementsData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="relative pl-8 md:pl-10">
                {/* Timeline node dot */}
                <span className={`absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-black border-2 border-amber-500 shadow-md shadow-amber-500/20 text-amber-400`}>
                  <IconComponent className="w-4 h-4" />
                </span>

                {/* Date tag for large screens */}
                <div className="hidden md:block absolute right-[102%] top-2 text-right w-24">
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-1">
                    {item.date}
                  </span>
                </div>

                {/* Achievement Card */}
                <Card className="glass-card max-w-2xl">
                  <CardHeader className="pb-2">
                    {/* Small mobile date tag */}
                    <div className="md:hidden mb-2">
                      <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </CardTitle>
                    <span className="text-sm text-amber-400/90 font-medium">
                      {item.subtitle}
                    </span>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300 leading-relaxed">
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
