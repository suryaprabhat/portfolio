import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FolderGit2, AlertCircle, Award, Code } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  link: string;
  techStack: string[];
}

interface LanguageInfo {
  name: string;
  percentage: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // LeetCode & GitHub stats with live state initialized to null for loading indicator
  const [stats, setStats] = useState<{
    github: { publicRepos: number | null, languages: LanguageInfo[] },
    leetcode: {
      totalSolved: number | null,
      easySolved: number | null,
      mediumSolved: number | null,
      hardSolved: number | null,
      ranking: string | null,
    }
  }>({
    github: { publicRepos: null, languages: [] },
    leetcode: {
      totalSolved: null,
      easySolved: null,
      mediumSolved: null,
      hardSolved: null,
      ranking: null,
    }
  });

  const leetcodeUsername = 'Surya_Prabhat';

  useEffect(() => {
    // 1. Fetch Projects List
    fetch(`${API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // 2. Fetch Live Stats from Backend
    fetch(`${API_URL}/api/stats`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then((data) => {
        setStats({
          github: { 
            publicRepos: data.github.publicRepos,
            languages: data.github.languages || []
          },
          leetcode: {
            totalSolved: data.leetcode.totalSolved,
            easySolved: data.leetcode.easySolved,
            mediumSolved: data.leetcode.mediumSolved,
            hardSolved: data.leetcode.hardSolved,
            ranking: data.leetcode.ranking
          }
        });
      })
      .catch((err) => {
        console.error('Failed to load live stats:', err);
        // Fallback to static numbers on error
        setStats({
          github: { 
            publicRepos: 30,
            languages: [
              { name: 'Python', percentage: 45 },
              { name: 'JavaScript', percentage: 25 },
              { name: 'TypeScript', percentage: 15 },
              { name: 'HTML/CSS', percentage: 15 }
            ]
          },
          leetcode: {
            totalSolved: 203,
            easySolved: 157,
            mediumSolved: 46,
            hardSolved: 0,
            ranking: '789,252'
          }
        });
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

  // Safe percentage calculator to avoid division by zero
  const getPercentage = (solved: number | null) => {
    if (solved === null) return 0;
    const total = stats.leetcode.totalSolved || 1;
    return (solved / total) * 100;
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center px-6 pt-28 pb-16 overflow-hidden page-mount-enter">
      {/* Background Blurs */}
      <div className="glow-blur bg-amber-500 w-[500px] h-[500px] top-[10%] right-[-10%] animate-float-slow" />
      <div className="glow-blur bg-blue-500 w-[500px] h-[500px] bottom-[10%] left-[-15%] animate-float-reverse" />

      <div className="max-w-5xl w-full z-10 space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Problem Solving & <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcasing of my algorithmic expertise on LeetCode and curated projects hosted on GitHub.
          </p>
        </div>

        {/* Profile Statistics Dashboard (LeetCode + GitHub) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          
          {/* LeetCode Card */}
          <Card className="glass-card border border-white/5 shadow-xl overflow-hidden flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-xs text-amber-400 font-semibold w-fit">
                <Award className="w-3.5 h-3.5" />
                <span>LeetCode Stats</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black text-white">
                    {stats.leetcode.totalSolved !== null ? (
                      stats.leetcode.totalSolved
                    ) : (
                      <span className="inline-block w-12 h-8 bg-white/10 rounded animate-pulse"></span>
                    )}
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Solved Questions</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400/90 font-medium block">
                    {stats.leetcode.ranking !== null ? (
                      `Rank #${stats.leetcode.ranking}`
                    ) : (
                      <span className="inline-block w-20 h-4 bg-white/10 rounded animate-pulse"></span>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2.5">
                {/* Easy */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-400 text-[11px]">Easy</span>
                    <span className="text-gray-400 text-[11px]">
                      {stats.leetcode.easySolved !== null ? (
                        `${stats.leetcode.easySolved} Solved`
                      ) : (
                        '...'
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${getPercentage(stats.leetcode.easySolved)}%` }}></div>
                  </div>
                </div>
                {/* Medium */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-400 text-[11px]">Medium</span>
                    <span className="text-gray-400 text-[11px]">
                      {stats.leetcode.mediumSolved !== null ? (
                        `${stats.leetcode.mediumSolved} Solved`
                      ) : (
                        '...'
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${getPercentage(stats.leetcode.mediumSolved)}%` }}></div>
                  </div>
                </div>
                {/* Hard */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-rose-400 text-[11px]">Hard</span>
                    <span className="text-gray-400 text-[11px]">
                      {stats.leetcode.hardSolved !== null ? (
                        `${stats.leetcode.hardSolved} Solved`
                      ) : (
                        '...'
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${getPercentage(stats.leetcode.hardSolved)}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <a 
                href={`https://leetcode.com/u/${leetcodeUsername}/`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs flex items-center justify-center gap-1.5">
                  View LeetCode Profile
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </CardFooter>
          </Card>

          {/* GitHub Card */}
          <Card className="glass-card border border-white/5 shadow-xl overflow-hidden flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div className="inline-flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-semibold w-fit">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>GitHub Stats</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black text-white">
                    {stats.github.publicRepos !== null ? (
                      stats.github.publicRepos
                    ) : (
                      <span className="inline-block w-12 h-8 bg-white/10 rounded animate-pulse"></span>
                    )}
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Public Repositories</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-blue-400/90 font-medium block">User: @suryaprabhat</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Languages Share:</span>
                
                {stats.github.publicRepos !== null && stats.github.languages && stats.github.languages.length > 0 ? (
                  <>
                    <div className="flex h-3 w-full bg-white/5 rounded-full overflow-hidden">
                      {stats.github.languages.map((lang) => {
                        let bgColor = 'bg-gray-500';
                        if (lang.name === 'Python') bgColor = 'bg-blue-500';
                        else if (lang.name === 'JavaScript') bgColor = 'bg-yellow-500';
                        else if (lang.name === 'TypeScript') bgColor = 'bg-blue-400';
                        else if (lang.name === 'HTML') bgColor = 'bg-orange-600';
                        else if (lang.name === 'CSS') bgColor = 'bg-purple-600';
                        else if (lang.name === 'C++') bgColor = 'bg-rose-500';
                        else if (lang.name === 'Java') bgColor = 'bg-red-500';
                        
                        return (
                          <div 
                            key={lang.name}
                            className={`${bgColor} h-full transition-all duration-500`} 
                            style={{ width: `${lang.percentage}%` }} 
                            title={`${lang.name}: ${lang.percentage}%`}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                      {stats.github.languages.slice(0, 4).map((lang) => {
                        let dotColor = 'bg-gray-500';
                        if (lang.name === 'Python') dotColor = 'bg-blue-500';
                        else if (lang.name === 'JavaScript') dotColor = 'bg-yellow-500';
                        else if (lang.name === 'TypeScript') dotColor = 'bg-blue-400';
                        else if (lang.name === 'HTML') dotColor = 'bg-orange-600';
                        else if (lang.name === 'CSS') dotColor = 'bg-purple-600';
                        else if (lang.name === 'C++') dotColor = 'bg-rose-500';
                        else if (lang.name === 'Java') dotColor = 'bg-red-500';

                        return (
                          <div key={lang.name} className="flex items-center gap-1 text-[10px] text-gray-400">
                            <span className={`w-2 h-2 rounded-full ${dotColor} inline-block`}></span>
                            {lang.name} ({lang.percentage}%)
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/10 rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse"></div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <a 
                href="https://github.com/suryaprabhat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button size="sm" variant="outline" className="w-full border-white/10 text-gray-300 hover:text-white text-xs flex items-center justify-center gap-1.5">
                  View GitHub Profile
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </CardFooter>
          </Card>

        </div>

        {/* Section Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" />
            Featured Repositories
          </span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-60 rounded-xl bg-white/5 border border-white/5 animate-pulse flex flex-col justify-between p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-white/10 rounded w-2/3"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
                <div className="h-8 bg-white/10 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass rounded-xl p-8 border border-red-500/20 max-w-md mx-auto text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Failed to load projects</h3>
            <p className="text-sm text-gray-400">⚠️ {error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </div>
        )}

        {/* Project Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project._id}
                onMouseMove={handleMouseMove}
                className="glass-card spotlight-card group flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </CardTitle>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/25 transition-all">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 leading-relaxed text-sm">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                </div>
                
                <CardFooter className="flex flex-col items-start gap-4 pt-0">
                  {/* Tech stack badges */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Link action */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors pt-2 group/link"
                    >
                      Visit Repository
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
