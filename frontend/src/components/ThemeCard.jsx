import { Check } from 'lucide-react';

export default function ThemeCard({ theme, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${
        active 
          ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50' 
          : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex gap-1">
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: theme.colors.bg, border: '1px solid rgba(0,0,0,0.1)' }}
        />
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: theme.colors.primary }}
        />
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: theme.colors.accent }}
        />
      </div>
      <div className="flex-1">
        <span className={`font-medium block ${active ? 'text-indigo-900' : 'text-gray-700'}`}>
          {theme.name}
        </span>
        <span className="text-xs text-gray-500 line-clamp-1">{theme.description}</span>
      </div>
      {active && (
        <Check className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}
