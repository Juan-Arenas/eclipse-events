import React, { useState } from 'react';
import { X, Lock, ShieldAlert, Sparkles, KeyRound } from 'lucide-react';

export default function SecretAdminAuthModal({ isOpen, onClose, onSuccessAuth }) {
  if (!isOpen) return null;

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'eclipse1409') {
      setError(false);
      setPassword('');
      onSuccessAuth();
      onClose();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyClick = (char) => {
    if (password.length < 15) {
      setPassword(prev => prev + char);
    }
  };

  const handleClear = () => {
    setPassword('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
      <div className={`relative w-full max-w-sm bg-[#0c0c14] border border-white/20 rounded-[40px] overflow-hidden shadow-[0_0_60px_rgba(255,0,51,0.3)] p-8 text-center transition-all ${isShaking ? 'animate-bounce' : ''}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* iPhone Style Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff0033] to-red-600 p-[2px] mx-auto mb-4 shadow-[0_0_25px_rgba(255,0,51,0.6)]">
          <div className="w-full h-full bg-[#08080c] rounded-full flex items-center justify-center">
            <Lock className="w-7 h-7 text-[#ff0033]" />
          </div>
        </div>

        <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
          Acceso Administrador
        </h3>
        <p className="text-slate-400 text-xs mt-1 mb-6">
          Ingresa la contraseña de organizador para gestionar el evento.
        </p>

        {/* Password Display Field */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
              autoFocus
              className={`w-full bg-white/5 border rounded-2xl px-4 py-3.5 text-center font-mono text-xl tracking-[0.3em] text-white placeholder-slate-600 focus:outline-none transition-all ${
                error
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                  : 'border-white/20 focus:border-[#ff0033]'
              }`}
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-bold flex items-center justify-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Contraseña incorrecta
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="w-1/3 btn-silver py-3 rounded-xl text-xs font-bold uppercase"
            >
              Borrar
            </button>
            <button
              type="submit"
              className="w-2/3 btn-neon-red py-3 rounded-xl text-xs font-black uppercase tracking-wider"
            >
              Ingresar
            </button>
          </div>
        </form>

        <p className="text-[10px] text-slate-500 font-mono mt-6">
          🔒 Área restringida exclusivamente para dueños de Eclipse Events
        </p>

      </div>
    </div>
  );
}
