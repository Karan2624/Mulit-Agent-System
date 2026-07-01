"use client"
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Premium Timeline Step Component
const TimelineStep = ({ num, title, state, desc, isLast }) => {
  const statusMap = {
    waiting: { dot: "bg-white/10 border-white/5", text: "text-white/40", title: "text-white/60", line: "bg-white/10" },
    running: { dot: "bg-orange-500 shadow-[0_0_15px_rgba(255,140,50,0.6)] border-orange-400 animate-pulse", text: "text-orange-400", title: "text-white", line: "bg-gradient-to-b from-orange-500 to-white/10" },
    done: { dot: "bg-emerald-500 border-emerald-400", text: "text-emerald-500", title: "text-white/80", line: "bg-emerald-500" },
  };
  const style = statusMap[state];

  return (
    <div className="relative pl-10 pb-10">
      {/* The Timeline Line */}
      {!isLast && <div className={`absolute left-[11px] top-8 bottom-[-8px] w-[2px] rounded-full ${style.line} transition-all duration-700`} />}
      
      {/* The Dot */}
      <div className={`absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full border-2 ${style.dot} transition-all duration-500 z-10 flex items-center justify-center bg-[#050508]`}>
        {state === 'done' && <span className="text-[10px] text-[#050508] font-bold">✓</span>}
      </div>

      {/* Content */}
      <div className={`transition-all duration-500 ${state === 'waiting' ? 'opacity-60' : 'opacity-100'}`}>
        <div className="flex items-center gap-4 mb-1">
          <span className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-orange-500/80">{num}</span>
          <span className={`font-['Syne'] text-[1.1rem] font-bold ${style.title}`}>{title}</span>
          <span className={`ml-auto font-mono text-[0.65rem] tracking-[0.15em] uppercase ${style.text}`}>
            {state === 'running' ? 'Working...' : state}
          </span>
        </div>
        <div className="text-[0.85rem] text-white/40 font-light">{desc}</div>
      </div>
    </div>
  );
};

export default function ResearchMind() {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState(null);
  const [pipelineState, setPipelineState] = useState('waiting');

  const handleResearch = async () => {
    if (!topic.trim()) return;
    setPipelineState('running');
    setResults(null); 
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setResults(data.data);
      setPipelineState('done');
    } catch (error) {
      console.error("Failed:", error);
      alert("Failed to connect. Is FastAPI running on port 8000?");
      setPipelineState('waiting');
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-orange-500/30 selection:text-white">
      
      {/* Premium Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-orange-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#ff4000]/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block border border-orange-500/20 bg-orange-500/5 rounded-full px-4 py-1.5 font-mono text-[0.65rem] font-medium tracking-[0.2em] uppercase text-orange-400 mb-8 backdrop-blur-sm">
            Autonomous Multi-Agent System
          </div>
          <h1 className="font-['Syne'] text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-white">Research</span>
            <span className="bg-gradient-to-r from-orange-400 to-[#ff4000] bg-clip-text text-transparent">Mind</span>
          </h1>
          <p className="text-[1.1rem] font-light text-white/50 max-w-[500px] mx-auto leading-relaxed">
            Four specialized AI agents collaborate to search, scrape, analyze, and draft polished research reports on demand.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: The Command Bar */}
          <div className="lg:col-span-7 pt-4">
            
            {/* Glowing Command Input */}
            <div className="relative group mb-8">
              {/* Outer glow that brightens on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-[#ff4000] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              {/* Actual Input Container */}
              <div className="relative flex items-center bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                <input 
                  className="w-full bg-transparent text-white pl-6 py-4 outline-none text-[1.05rem] placeholder-white/30 font-light"
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                  placeholder="Ask the agents to research a topic..."
                  onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
                />
                <button 
                  className="bg-white text-black hover:bg-orange-400 hover:text-black font-['Syne'] font-bold text-[0.95rem] tracking-[0.04em] rounded-xl px-8 py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] flex-shrink-0"
                  onClick={handleResearch}
                  disabled={pipelineState === 'running' || !topic.trim()}
                >
                  {pipelineState === 'running' ? 'Processing...' : 'Run Pipeline'}
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex gap-3 flex-wrap items-center">
              <span className="font-mono text-[0.65rem] text-white/40 tracking-[0.15em] mr-2 uppercase">Try exploring</span>
              {["Solid-state EV batteries", "CRISPR in agriculture", "Fusion net-energy"].map(ex => (
                <button 
                  key={ex}
                  onClick={() => setTopic(ex)}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 text-[0.75rem] text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: The Timeline */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="font-mono text-[0.75rem] font-medium tracking-[0.2em] uppercase text-white/40 mb-10">
              Agent Activity
            </h3>
            
            <div>
              <TimelineStep num="01" title="Search Agent" state={pipelineState === 'waiting' ? 'waiting' : 'done'} desc="Scouring the web for recent data" />
              <TimelineStep num="02" title="Reader Agent" state={pipelineState === 'waiting' ? 'waiting' : pipelineState === 'running' ? 'running' : 'done'} desc="Scraping and analyzing deep content" />
              <TimelineStep num="03" title="Writer Chain" state={pipelineState === 'waiting' ? 'waiting' : pipelineState === 'running' ? 'running' : 'done'} desc="Synthesizing context into a draft" />
              <TimelineStep num="04" title="Critic Chain" state={pipelineState === 'waiting' ? 'waiting' : pipelineState === 'running' ? 'running' : 'done'} desc="Reviewing and scoring the final report" isLast={true} />
            </div>
          </div>
        </div>

        {/* Results Area */}
        {results && (
          <div className="mt-24 space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            
            {/* Final Report Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] blur opacity-50"></div>
              <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl">
                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-8">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <span className="text-xl">📝</span>
                  </div>
                  <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white tracking-tight">Final Research Report</h2>
                </div>
                <div className="markdown-body">
                  <ReactMarkdown>{results.report}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Critic Feedback Card */}
            <div className="relative">
              <div className="relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <span className="text-lg"></span>
                  </div>
                  <h2 className="font-['Syne'] text-xl font-bold text-white/80">Critic Feedback</h2>
                </div>
                <div className="markdown-body opacity-80 text-[0.9rem]">
                  <ReactMarkdown>{results.feedback}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}