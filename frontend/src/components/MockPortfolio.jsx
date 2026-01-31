import { Briefcase } from 'lucide-react';

const MockPortfolio = ({ theme, canInteract, onSave }) => {
  const { colors, name } = theme;

  return (
    <div 
      className="w-full rounded-xl overflow-hidden shadow-2xl transition-colors duration-500 border border-black/5"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Warning Banner */}
      {!canInteract && (
        <div className="bg-yellow-500 text-yellow-900 text-center py-2 px-4 text-sm font-medium">
          ⚠️ Login to copy or save this theme
        </div>
      )}

      {/* Mock Navigation */}
      <nav className="p-6 flex justify-between items-center" style={{ borderBottom: `1px solid ${colors.subtext}30` }}>
        <div className="font-bold text-xl tracking-tight">
          PORTFOLIO<span style={{ color: colors.primary }}>.</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <span style={{ color: colors.primary }} className="cursor-pointer">About</span>
          <span className="opacity-70 hover:opacity-100 cursor-pointer">Work</span>
          <span className="opacity-70 hover:opacity-100 cursor-pointer">Contact</span>
          
        </div>
      </nav>

      {/* Mock Hero */}
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2"
            style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
          >
            Available for hire
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Design that <span style={{ color: colors.secondary }}>speaks</span>.<br/>
            Code that <span style={{ color: colors.accent }}>works</span>.
          </h1>
          <p className="text-lg leading-relaxed max-w-md" style={{ color: colors.subtext }}>
            I'm a creative developer building unique digital experiences with clean code and bold colors.
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              className="px-6 py-3 rounded-lg font-bold shadow-lg transform hover:-translate-y-1 transition-transform"
              style={{ backgroundColor: colors.primary, color: colors.bg === '#ffffff' ? '#fff' : colors.bg }}
            >
              View Projects
            </button>
            <button 
              className="px-6 py-3 rounded-lg font-bold border-2 hover:bg-black/5 transition-colors"
              style={{ borderColor: colors.text, color: colors.text }}
            >
              Contact Me
            </button>
          </div>
        </div>
        
        {/* Mock Graphic Element */}
        <div className="flex-1 w-full max-w-sm aspect-square relative">
          <div 
            className="absolute inset-0 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: colors.secondary }}
          />
          <div 
            className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-30 blur-2xl"
            style={{ backgroundColor: colors.accent }}
          />
          <div 
            className="w-full h-full rounded-2xl relative z-10 flex items-center justify-center border border-white/10 backdrop-blur-sm"
            style={{ backgroundColor: colors.surface }}
          >
            <div className="grid grid-cols-2 gap-4 p-4 w-full h-full">
              <div className="rounded-xl opacity-50" style={{ backgroundColor: colors.bg }}></div>
              <div className="rounded-xl opacity-80" style={{ backgroundColor: colors.primary }}></div>
              <div className="rounded-xl opacity-80" style={{ backgroundColor: colors.accent }}></div>
              <div className="rounded-xl opacity-50" style={{ backgroundColor: colors.secondary }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Project Cards */}
      <div className="p-8 md:p-12" style={{ backgroundColor: `${colors.surface}50` }}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Briefcase size={20} style={{ color: colors.primary }}/> 
          Selected Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div 
              key={i}
              className="p-6 rounded-xl border transition-all hover:shadow-xl"
              style={{ backgroundColor: colors.surface, borderColor: `${colors.subtext}20` }}
            >
              <div className="w-full h-32 mb-4 rounded-lg opacity-20" style={{ backgroundColor: colors.text }}></div>
              <h4 className="font-bold text-lg mb-2">Project Name {i}</h4>
              <p className="text-sm mb-4" style={{ color: colors.subtext }}>
                A conceptual dashboard featuring data visualization and real-time updates.
              </p>
              <div className="flex gap-2 text-xs font-mono">
                <span style={{ color: colors.secondary }}>React</span>
                <span style={{ color: colors.secondary }}>Tailwind</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Save Button */}
      <div className="p-4 border-t flex justify-end" style={{ borderColor: `${colors.subtext}30` }}>
        <button
          onClick={onSave}
          disabled={!canInteract}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            canInteract
              ? 'hover:opacity-90 cursor-pointer shadow-lg'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: colors.primary, color: colors.bg }}
        >
          Save Theme
        </button>
      </div>
    </div>
  );
};

export default MockPortfolio;
