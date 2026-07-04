import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Terminal, Code, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'terminal'>('profile');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const profileCode = `class Developer:
    def __init__(self):
        self.name = "M. Surya Prabhath"
        self.role = "Full-Stack Web Developer & Problem Solver"
        self.education = "CSE Undergrad"
        
        self.passions = [
            "Algorithmic Efficiency",
            "Clean User Interfaces",
            "Real-Time Systems"
        ]
        
        self.tech_stack = {
            "problem_solving": ["Python", "Data Structures", "Algorithms"],
            "web_development": ["TypeScript", "React.js", "Node.js", "Express.js"],
            "tools": ["Git", "GitHub", "Docker", "SEO Optimization"]
        }

    def get_status(self):
        return "Solving algorithmic problems and building clean web apps."`;

  const terminalLines = [
    "python3 -m venv env",
    "source env/bin/activate",
    "(env) python3 -m unittest solution_test.py",
    "Running 3 algorithmic test cases for BinarySearch...",
    "SUCCESS: Test Case 1: Target found in array. -> Success (0.02ms)",
    "SUCCESS: Test Case 2: Target not present in array. -> Success (0.01ms)",
    "SUCCESS: Test Case 3: Boundary check for single element. -> Success (0.01ms)",
    "--------------------------------------------------",
    "OK: All 3 algorithmic tests passed successfully!",
    "Complexity Analysis:",
    "  - Time Complexity: O(log N)",
    "  - Space Complexity: O(1)"
  ];

  useEffect(() => {
    if (activeTab === 'terminal') {
      setTerminalOutput([]);
      setTypingIndex(0);
      setCurrentLine('');
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'terminal') return;

    if (typingIndex < terminalLines.length) {
      const line = terminalLines[typingIndex];
      let charIndex = 0;
      
      const interval = setInterval(() => {
        if (charIndex < line.length) {
          setCurrentLine((prev) => prev + line[charIndex]);
          charIndex++;
        } else {
          clearInterval(interval);
          setTerminalOutput((prev) => [...prev, line]);
          setCurrentLine('');
          setTypingIndex((prev) => prev + 1);
        }
      }, 25);

      return () => clearInterval(interval);
    }
  }, [activeTab, typingIndex]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden page-mount-enter">
      {/* Background Glowing Spots (Warm Amber & Steel Blue) with floating drift animation */}
      <div className="glow-blur bg-amber-500 w-[400px] h-[400px] top-[10%] left-[-10%] animate-float-slow" />
      <div className="glow-blur bg-blue-500 w-[500px] h-[500px] bottom-[5%] right-[-10%] animate-float-reverse" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Hero Text */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-amber-400 font-semibold w-fit hover:bg-amber-500/5 transition-all duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algorithmic Problem Solver & Full-Stack Developer</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
            Hi, I'm <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">M. Surya Prabhath</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-normal leading-relaxed">
            A full-stack web developer and algorithm enthusiast. I solve complex programmatic challenges using Python, design clean user experiences with React, and build real-time applications.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/projects">
              <Button className="bg-amber-500 hover:bg-amber-600 hover:scale-[1.03] transition-all duration-300 text-black font-semibold shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center gap-2">
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:scale-[1.03] transition-all duration-300">Get in Touch</Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Python IDE/Terminal Card */}
        <div className="lg:col-span-5 w-full">
          <Card className="w-full border border-white/5 rounded-lg shadow-2xl bg-slate-950/60 backdrop-blur-md hover:border-amber-500/10 transition-all duration-500">
            {/* Header / Tab Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
              {/* Window Controls */}
              <div className="flex space-x-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 inline-block"></span>
              </div>

              {/* Tabs */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${
                    activeTab === 'profile'
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  profile.py
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${
                    activeTab === 'terminal'
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  terminal.sh
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div className="p-5 font-mono text-xs md:text-sm min-h-[340px] flex flex-col justify-start overflow-auto custom-scrollbar">
              {activeTab === 'profile' ? (
                <pre className="text-left text-blue-300 leading-relaxed overflow-x-auto whitespace-pre custom-scrollbar">
                  <code>{profileCode}</code>
                </pre>
              ) : (
                <div className="text-left text-amber-300 space-y-2 select-none overflow-x-auto text-[11px] md:text-xs custom-scrollbar">
                  {terminalOutput.map((line, idx) => {
                    let colorClass = 'text-gray-300';
                    if (line.startsWith('python') || line.startsWith('source') || line.startsWith('(')) {
                      colorClass = 'text-blue-400';
                    } else if (line.startsWith('SUCCESS') || line.startsWith('OK') || line.includes('passed')) {
                      colorClass = 'text-emerald-400';
                    }
                    return (
                      <div key={idx} className={colorClass}>
                        {line}
                      </div>
                    );
                  })}
                  {typingIndex < terminalLines.length && (
                    <div className="text-blue-400">
                      {terminalLines[typingIndex].startsWith('python') || terminalLines[typingIndex].startsWith('source') ? '$ ' : ''}
                      {currentLine}
                      <span className="w-2 h-4 bg-white ml-0.5 inline-block animate-pulse"></span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Home;
