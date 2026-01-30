import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ColorSwatch = ({ label, color, canInteract = true, onLoginRequired }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!canInteract) {
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        canInteract ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-70'
      }`}
      title={canInteract ? 'Click to copy hex code' : 'Login to copy'}
    >
      <div 
        className={`w-16 h-16 rounded-full shadow-lg border border-white/10 relative flex items-center justify-center transition-all ${
          canInteract ? 'group-hover:ring-2 ring-offset-2 ring-blue-400' : ''
        }`}
        style={{ backgroundColor: color }}
      >
        {copied ? (
          <Check className="w-6 h-6 text-white drop-shadow-md" />
        ) : (
          <Copy className={`w-6 h-6 text-white drop-shadow-md transition-opacity ${
            canInteract ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
          }`} />
        )}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold opacity-70">{label}</p>
        <p className="text-xs font-mono opacity-50">{copied ? '✓ Copied!' : ''}</p>
      </div>
    </button>
  );
};

export default ColorSwatch;
