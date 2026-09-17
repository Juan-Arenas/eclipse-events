import React, { useState } from 'react';
import { X, LayoutDashboard, Edit3, PlusCircle, CheckCircle2, QrCode, Zap, ToggleLeft, ToggleRight, Music, Trash2, Plus } from 'lucide-react';

export default function AdminDashboardModal({ 
  isOpen, 
  onClose, 
  monthlyEvent, 
  onUpdateMonthlyEvent, 
  tickets,
  onTicketPurchased,
  currentSeatIndex,
  isDemoZeroMode,
  setIsDemoZeroMode,
  openQRModal 
}) {
  if (!isOpen) return null;

  const [tab, setTab] = useState('manual_issue');

  const [manualData, setManualData] = useState({
    name: '',
    dni: '',
    email: '',
    tierType: 'sencilla'
  });
  const [issuedSuccess, setIssuedSuccess] = useState(null);

  const [formData, setFormData] = useState({
    title: monthlyEvent?.title || '',
    subtitle: monthlyEvent?.subtitle || '',
    venue: monthlyEvent?.venue || 'Sede Campestre (En Tu Entrada Digital)',
    date: monthlyEvent?.date || '',
    time: monthlyEvent?.time || '08:00 PM - 06:00 AM',
    category: monthlyEvent?.category || 'Electrónica / Festival VIP',
    image: monthlyEvent?.image || '/images/finca_main.jpg',
    lineupStr: monthlyEvent?.lineup ? monthlyEvent.lineup.join(', ') : 'ALEXANDER SKY, NEON PULSE, VALENTINA ROSS',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // DJs & Artists Lineup State
  const [artistsList, setArtistsList] = useState(monthlyEvent?.lineup || [
    "ALEXANDER SKY (Melodic Techno)",
    "NEON PULSE (Live Set)",
    "VALENTINA ROSS",
    "LUNAR ECHOES"
  ]);
  const [newArtistName, setNewArtistName] = useState('');
  const [artistsSavedSuccess, setArtistsSavedSuccess] = useState(false);

  const handleAddArtist = (e) => {
    e.preventDefault();
    if (!newArtistName.trim()) return;
    const updated = [...artistsList, newArtistName.trim()];
    setArtistsList(updated);
    setNewArtistName('');
  };

  const handleRemoveArtist = (indexToRemove) => {
    const updated = artistsList.filter((_, idx) => idx !== indexToRemove);
    setArtistsList(updated);
  };

  const handleSaveArtists = () => {
    const updated = {
      ...monthlyEvent,
      lineup: artistsList
    };
    onUpdateMonthlyEvent(updated);
    setArtistsSavedSuccess(true);
    setTimeout(() => setArtistsSavedSuccess(false), 3000);
  };

  const handleManualIssueSubmit = (e) => {
    e.preventDefault();
    if (!manualData.name || !manualData.dni) {
      alert("Por favor completa el nombre y la cédula del comprador.");
      return;
    }

    const seatFormatted = "AFORO GENERAL";
    const ticketId = `ECLIPSE-MAN-${Math.floor(100000 + Math.random() * 900000)}`;
    const qrHash = `ECLIPSE-TICKET-${ticketId}-${manualData.dni}-${Date.now()}`;
    const backupCode = `BAC-ECL-${Math.floor(1000 + Math.random() * 9000)}-${manualData.dni.slice(-4)}`;

    const isVip = manualData.tierType === 'vip';

    const newTicket = {
      id: ticketId,
      qrHash: qrHash,
      backupCode: backupCode,
      seatNumber: seatFormatted,
      eventId: monthlyEvent.id,
      eventTitle: monthlyEvent.title,
      eventDate: monthlyEvent.formattedDate,
      eventTime: monthlyEvent.time,
      venue: "Sede Campestre (En Tu Entrada Digital)",
      fullAddress: "Ubicación Confidencial Activada",
      mapsUrl: "#",
      tierName: isVip ? "Boleta VIP" : "Boleta General",
      tierDescription: isVip ? "Acceso preferencial + Eclipse Drinks Adicional incluido." : "Únicamente acceso al evento.",
      quantity: 1,
      totalPrice: isDemoZeroMode ? 0 : 1,
      holderName: manualData.name,
      holderDni: manualData.dni,
      holderEmail: manualData.email || 'venta_presencial@eclipse.com',
      status: 'VALIDA',
      purchaseDate: new Date().toLocaleDateString('es-CO')
    };

    onTicketPurchased(newTicket);
    setIssuedSuccess(newTicket);
    setManualData({ name: '', dni: '', email: '', tierType: 'sencilla' });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    const lineupArray = formData.lineupStr.split(',').map(s => s.trim()).filter(Boolean);

    const updated = {
      ...monthlyEvent,
      title: formData.title,
      subtitle: formData.subtitle,
      venue: formData.venue,
      date: formData.date,
      formattedDate: formData.date ? new Date(formData.date).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : monthlyEvent.formattedDate,
      time: formData.time,
      category: formData.category,
      image: formData.image,
      lineup: lineupArray
    };

    onUpdateMonthlyEvent(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c14] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 flex items-center justify-center text-[#ff0033]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-2xl text-white">
                  Panel de Control Dueños VIP
                </h3>
              </div>
              <p className="text-slate-400 text-xs">
                Modo $0 COP de prueba, descuentos de 20 primeros compradores y emisión de boletas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DEMO ZERO PRICE TOGGLE BANNER FOR OWNERS */}
        <div className="px-6 py-3 bg-[#ff0033]/15 border-b border-[#ff0033]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff0033]" />
            <span className="text-xs font-bold text-white">
              Modo de Precios Actual: <strong className="text-emerald-400">{isDemoZeroMode ? "PRUEBAS $0 COP" : "PRECIOS REALES CON PROMO 20 COMPRADORES"}</strong>
            </span>
          </div>

          <button
            onClick={() => setIsDemoZeroMode(!isDemoZeroMode)}
            className="btn-silver px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase flex items-center gap-2 border border-white/20"
          >
            <span>Cambiar Modo</span>
            {isDemoZeroMode ? (
              <ToggleLeft className="w-5 h-5 text-emerald-400" />
            ) : (
              <ToggleRight className="w-5 h-5 text-[#ff0033]" />
            )}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('manual_issue')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                tab === 'manual_issue' ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <PlusCircle className="w-4 h-4" /> Emitir Boleta Manual
            </button>

            <button
              onClick={() => setTab('edit_event')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                tab === 'edit_event' ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Edit3 className="w-4 h-4" /> Editar Evento
            </button>

            <button
              onClick={() => setTab('artists')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                tab === 'artists' ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Music className="w-4 h-4" /> DJs & Artistas
            </button>

            <button
              onClick={() => setTab('metrics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                tab === 'metrics' ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              Boletas ({tickets.length})
            </button>
          </div>

          <button
            onClick={() => { onClose(); openQRModal(); }}
            className="btn-silver px-3.5 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 border border-white/20"
          >
            <QrCode className="w-4 h-4 text-[#ff0033]" />
            <span>Escáner QR Puerta</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* TAB 1: MANUAL ISSUE */}
          {tab === 'manual_issue' && (
            <div className="space-y-6">
              
              {issuedSuccess && (
                <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-slate-100 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Boleta oficial emitida exitosamente!</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Se emitió la boleta oficial para <strong>{issuedSuccess.holderName}</strong> (C.C. {issuedSuccess.holderDni}) con acceso a <strong className="text-emerald-400">{issuedSuccess.seatNumber}</strong>.
                  </p>
                </div>
              )}

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <h4 className="font-heading font-black text-xl text-white mb-1">
                  Emitir Boleta Oficial (Venta Presencial / Externa)
                </h4>
                <p className="text-slate-400 text-xs">
                  Ingresa los datos del comprador para emitir una boleta oficial de acceso general y generar su código QR único.
                </p>
              </div>

              <form onSubmit={handleManualIssueSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Nombre Completo del Comprador *</label>
                    <input
                      type="text"
                      required
                      value={manualData.name}
                      onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                      placeholder="Ej. Andrés Gómez"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Cédula ID *</label>
                    <input
                      type="text"
                      required
                      value={manualData.dni}
                      onChange={(e) => setManualData({ ...manualData, dni: e.target.value })}
                      placeholder="Ej. 1098765432"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Tipo de Boleta</label>
                    <select
                      value={manualData.tierType}
                      onChange={(e) => setManualData({ ...manualData, tierType: e.target.value })}
                      className="w-full bg-[#12121c] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    >
                      <option value="sencilla">Boleta General (Entrada)</option>
                      <option value="vip">Boleta VIP (Entrada + Eclipse Drinks Adicional)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Correo (Opcional)</label>
                    <input
                      type="email"
                      value={manualData.email}
                      onChange={(e) => setManualData({ ...manualData, email: e.target.value })}
                      placeholder="comprador@email.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Emitir Boleta Oficial</span>
                </button>
              </form>
            </div>
          )}

          {tab === 'edit_event' && (
            <form onSubmit={handleSaveSubmit} className="space-y-6">
              {savedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Cambios guardados!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Nombre del Próximo Evento *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Categoría</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider"
              >
                Guardar Cambios
              </button>
            </form>
          )}

          {/* TAB: DJS & ARTISTAS */}
          {tab === 'artists' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-black text-xl text-white mb-1 flex items-center gap-2">
                    <Music className="w-5 h-5 text-[#ff0033]" />
                    Gestión de DJs & Artistas del Festival
                  </h4>
                  <p className="text-slate-400 text-xs">
                    Agrega, elimina o actualiza los DJs que se muestran en el cartel oficial de la web en tiempo real.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 text-[#ff0033] text-xs font-bold font-mono">
                  {artistsList.length} Artistas
                </span>
              </div>

              {artistsSavedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Lineup de DJs y Artistas guardado exitosamente en la web!</span>
                </div>
              )}

              {/* Form to add new artist */}
              <form onSubmit={handleAddArtist} className="flex gap-2">
                <input
                  type="text"
                  value={newArtistName}
                  onChange={(e) => setNewArtistName(e.target.value)}
                  placeholder="Nombre del DJ / Artista (ej: ALEXANDER SKY - Melodic Techno)"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                />
                <button
                  type="submit"
                  className="btn-silver px-5 py-3 rounded-xl text-xs font-bold uppercase flex items-center gap-2 border border-white/20 hover:border-[#ff0033] hover:text-[#ff0033] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar DJ</span>
                </button>
              </form>

              {/* List of current artists */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lineup Actual en el Cartel:</p>
                {artistsList.length === 0 ? (
                  <p className="text-xs text-slate-400 bg-white/5 p-4 rounded-xl">No hay DJs en la lista. Agrega al menos uno.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {artistsList.map((artist, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff0033]/50 transition-all"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className="w-6 h-6 rounded-full bg-[#ff0033]/20 text-[#ff0033] flex items-center justify-center text-xs font-black font-mono flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate">
                            {artist}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveArtist(idx)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors flex-shrink-0 ml-2"
                          title="Eliminar DJ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save button */}
              <button
                type="button"
                onClick={handleSaveArtists}
                className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Guardar y Publicar Lineup de DJs</span>
              </button>
            </div>
          )}

          {/* TAB 3: METRICS */}
          {tab === 'metrics' && (
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-lg text-white mb-3">Lista de Boletas Emitidas</h4>
              {tickets.length === 0 ? (
                <p className="text-xs text-slate-400 bg-white/5 p-4 rounded-xl">No hay boletas emitidas aún.</p>
              ) : (
                <div className="overflow-x-auto bg-white/5 rounded-2xl border border-white/10">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-white/10 text-slate-200 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Acceso</th>
                        <th className="p-3">Comprador</th>
                        <th className="p-3">Cédula</th>
                        <th className="p-3">Tipo Boleta</th>
                        <th className="p-3">Estado QR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-mono">
                      {tickets.map(t => (
                        <tr key={t.id}>
                          <td className="p-3 font-bold text-[#ff0033]">{t.seatNumber || 'AFORO GENERAL'}</td>
                          <td className="p-3 font-sans text-white">{t.holderName}</td>
                          <td className="p-3">{t.holderDni}</td>
                          <td className="p-3 text-white font-bold">{t.tierName}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              t.status === 'VALIDA' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
