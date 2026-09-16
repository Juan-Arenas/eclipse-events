import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Lock, Image as ImageIcon } from 'lucide-react';
import { FINCA_PHOTOS } from '../data/initialData';

export default function FincaGalleryModal({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  if (!isOpen) return null;

  const categories = ["Todas", "Piscina", "Escenario", "VIP", "Nocturna"];

  const filteredPhotos = selectedCategory === "Todas" 
    ? FINCA_PHOTOS 
    : FINCA_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#0c0c14] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 text-[#ff0033] text-[11px] font-bold uppercase tracking-wider">
                Galería Oficial HD
              </span>
              <span className="text-slate-400 text-xs font-mono">Finca Mi Terrenito</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Colección Completa de Instalaciones
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Categories Bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-[#ff0033]" />
            <span>Ubicación exacta disponible en tu ticket</span>
          </div>
        </div>

        {/* Photos Lightbox Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative h-60 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#ff0033] transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
              
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-[#ff0033] font-mono font-bold uppercase tracking-widest block mb-1">
                  {photo.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-white leading-tight">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-black/60 text-center text-xs text-slate-400">
          Instalaciones Oficiales: <span className="text-white font-semibold">Finca Mi Terrenito</span>
        </div>

      </div>

      {/* Lightbox Fullview Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1))}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0))}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[75vh] p-2">
            <img
              src={filteredPhotos[activePhotoIndex].url}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <div className="text-center mt-4">
              <h3 className="font-heading font-black text-2xl text-white">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-slate-300 text-sm mt-1 max-w-lg mx-auto">
                {filteredPhotos[activePhotoIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
