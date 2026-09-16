export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE NEON FESTIVAL 2026",
  subtitle: "El evento exclusivo del mes en nuestra Sede Secreta VIP. Música electrónica, iluminación neón y producción de máximo nivel.",
  venue: "Sede Secreta VIP (Zona Pereira)",
  unlockedVenue: "Finca Mi Terrenito",
  unlockedAddress: "Santa Rosa de Cabal - Pereira (Risaralda). Coordenadas GPS: 4.9158519, -75.626924",
  date: "2026-10-24",
  formattedDate: "Sábado, 24 de Octubre, 2026",
  time: "08:00 PM - 06:00 AM",
  category: "Electrónica / Festival VIP",
  image: "/images/finca_main.jpg",
  priceMin: 0,
  tags: ["PRÓXIMO EVENTO DEL MES", "PROMO PRIMEROS 20 COMPRADORES", "AFORO EXCLUSIVO"],
  description: "Prepárate para la noche más impactante del mes. Eclipse Events presenta en nuestra Sede Secreta VIP una producción gigantesca con sonido de alta fidelidad, show de fuegos fríos, DJs de Melodic Techno & Progressive House, piscina nocturna y zonas VIP exclusivas.",
  lineup: ["ALEXANDER SKY (Melodic Techno)", "NEON PULSE (Live Set)", "VALENTINA ROSS", "LUNAR ECHOES"],
  earlyBirdPromo: {
    enabled: true,
    totalQuota: 20,
    remainingStock: 14, // 14/20 cupos restantes
  },
  tiers: [
    { 
      id: "sencilla", 
      name: "Boleta General", 
      priceNormal: 25000,
      pricePromo: 19900,
      price: 0, // $0 COP when in Demo Test Mode
      quota: 500, 
      description: "Únicamente acceso al evento." 
    },
    { 
      id: "vip", 
      name: "Boleta VIP", 
      priceNormal: 28000,
      pricePromo: 24900,
      price: 0, // $0 COP when in Demo Test Mode
      quota: 150, 
      description: "Acceso preferencial al evento + 1 Cóctel de bienvenida incluido." 
    }
  ]
};

export const FINCA_PHOTOS = [
  {
    id: "finca-1",
    title: "Escenario Principal & Mansión Nocturna",
    category: "Nocturna",
    url: "/images/finca_main.jpg",
    desc: "Vista de la mansión iluminada en rojo neón con el escenario principal de eventos."
  },
  {
    id: "finca-2",
    title: "Piscina Neón & Zona de Cócteles",
    category: "Piscina",
    url: "/images/finca_pool.jpg",
    desc: "Piscina temperada con iluminación subacuática en rojo vivo y asoleadoras plateadas."
  },
  {
    id: "finca-3",
    title: "Espectáculo de Luces Láser",
    category: "Escenario",
    url: "/images/finca_stage.jpg",
    desc: "Montaje técnico de última generación con cañones láser y efectos de pirotecnia."
  },
  {
    id: "finca-4",
    title: "Palco VIP & Lounge Exclusivo",
    category: "VIP",
    url: "/images/finca_vip.jpg",
    desc: "Salón VIP elevado con servicio de mesa, sofás en cuero negro y acabados metálicos."
  }
];

export const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Finca+Mi+Terrenito/@4.9158615,-75.6269243,3a,74.8y/data=!3m8!1e2!3m6!1sCIABIhARGMsr6SiNoILgMCMHpPUT!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWlcGXqwQ34G1w0bGyjmBHfWvGvF055_UzClQuSlgsEkeP7_hKrCXKorIZSbfxt7k5X_wwBfIqzKjfWkwMkGVpB3d7Q28gyaAeFzs55QSbmZcqyui-CrBTVVE75yVeiSSDWm39VlfMsV95XG%3Dw203-h152-k-no!7i1600!8i1200!4m7!3m6!1s0x8e477f0030099ba3:0x4518ed58d1ca7593!8m2!3d4.9158519!4d-75.626924!10e5!16s%2Fg%2F11xmksv4dm?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D";
