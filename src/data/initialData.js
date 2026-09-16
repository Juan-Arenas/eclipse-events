export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE HALLOWEEN FESTIVAL 2026",
  subtitle: "Noche de disfraces VIP, producción de luces neón, palcos y la experiencia de Halloween más impactante del año.",
  venue: "Zona Campestre (Pereira / Santa Rosa)",
  unlockedVenue: "Finca Mi Terrenito",
  unlockedAddress: "Santa Rosa de Cabal - Pereira (Risaralda). Coordenadas GPS: 4.9158519, -75.626924",
  date: "2026-10-30",
  formattedDate: "Viernes, 30 de Octubre, 2026",
  time: "08:00 PM - 06:00 AM",
  category: "Halloween / Festival VIP",
  image: "/images/finca/IMG_0239.jpg",
  priceMin: 0,
  tags: ["EDICIÓN ESPECIAL HALLOWEEN 🎃", "PROMO PRIMEROS 20 COMPRADORES", "AFORO EXCLUSIVO 300 BOLETAS"],
  description: "Prepárate para la fiesta de disfraces más grande de la región. Eclipse Events presenta la producción oficial de Halloween en nuestra sede campestre: sonido de alta fidelidad, show láser, concurso de disfraces, DJs de Melodic Techno & Progressive House, piscina nocturna y palcos VIP.",
  lineup: ["ALEXANDER SKY (Melodic Techno)", "NEON PULSE (Live Set)", "VALENTINA ROSS", "LUNAR ECHOES"],
  earlyBirdPromo: {
    enabled: true,
    totalQuota: 20,
    remainingStock: 14, // 14/20 cupos restantes con precio especial
  },
  tiers: [
    { 
      id: "sencilla", 
      name: "Boleta General", 
      priceNormal: 25000,
      pricePromo: 19900,
      price: 0, // $0 COP when in Demo Test Mode
      quota: 300, 
      description: "Únicamente acceso al evento." 
    },
    { 
      id: "vip", 
      name: "Boleta VIP", 
      priceNormal: 28000,
      pricePromo: 24900,
      price: 0, // $0 COP when in Demo Test Mode
      quota: 100, 
      description: "Acceso preferencial al evento + 1 Cóctel de bienvenida incluido." 
    }
  ]
};

export const FINCA_PHOTOS = [
  {
    id: "finca-1",
    title: "Escenario Principal & Mansión Nocturna",
    category: "Nocturna",
    url: "/images/finca/IMG_0239.jpg",
    desc: "Vista real de la mansión iluminada con montaje para producción de eventos VIP."
  },
  {
    id: "finca-2",
    title: "Piscina Neón & Zona de Cócteles",
    category: "Piscina",
    url: "/images/finca/IMG_0240.jpg",
    desc: "Piscina campestre con zona de asoleadoras e iluminación ambiente nocturna."
  },
  {
    id: "finca-3",
    title: "Montaje Técnico & Luces Láser",
    category: "Escenario",
    url: "/images/finca/IMG_0241.jpg",
    desc: "Estructura para montaje de sonido envolvente de alta fidelidad y efectos de pirotecnia fría."
  },
  {
    id: "finca-4",
    title: "Palco VIP & Lounge Exclusivo",
    category: "VIP",
    url: "/images/finca/IMG_0242.jpg",
    desc: "Salón VIP elevado reservado con atención de meseros y atención personalizada."
  },
  {
    id: "finca-5",
    title: "Zonas Verdes & Arquitectura Campestre",
    category: "Instalaciones",
    url: "/images/finca/IMG_0243.jpg",
    desc: "Amplias áreas verdes y espacios abiertos ideales para eventos de gran aforo."
  },
  {
    id: "finca-6",
    title: "Parqueadero Privado Custodiado",
    category: "Acceso",
    url: "/images/finca/IMG_0244.jpg",
    desc: "Estacionamiento privado dentro de las instalaciones con control de acceso por QR."
  }
];

export const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Finca+Mi+Terrenito/@4.9158615,-75.6269243,3a,74.8y/data=!3m8!1e2!3m6!1sCIABIhARGMsr6SiNoILgMCMHpPUT!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWlcGXqwQ34G1w0bGyjmBHfWvGvF055_UzClQuSlgsEkeP7_hKrCXKorIZSbfxt7k5X_wwBfIqzKjfWkwMkGVpB3d7Q28gyaAeFzs55QSbmZcqyui-CrBTVVE75yVeiSSDWm39VlfMsV95XG%3Dw203-h152-k-no!7i1600!8i1200!4m7!3m6!1s0x8e477f0030099ba3:0x4518ed58d1ca7593!8m2!3d4.9158519!4d-75.626924!10e5!16s%2Fg%2F11xmksv4dm?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D";
