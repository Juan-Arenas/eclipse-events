export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE NEON FESTIVAL 2026",
  subtitle: "Noche neón VIP, producción de sonido envolvente, show de luces láser, palcos y la experiencia de música electrónica más impactante del año.",
  venue: "Sede Campestre (En Tu Entrada Digital)",
  unlockedVenue: "Sede Campestre Exclusiva",
  unlockedAddress: "Ubicación confidencial desbloqueada en tu pase digital al comprar",
  date: "2026-10-24",
  formattedDate: "Sábado, 24 de Octubre, 2026",
  time: "08:00 PM - 06:00 AM",
  category: "Festival VIP / Neón",
  image: "/images/finca/IMG_0239.jpg",
  priceMin: 1,
  tags: ["EDICIÓN ESPECIAL NEÓN ⚡", "BOLETAS TEST WOMPI $1 COP", "AFORO EXCLUSIVO 300 BOLETAS"],
  description: "Prepárate para el festival neón más impresionante del año. Eclipse Events presenta su producción oficial: sonido de alta fidelidad, show láser, DJs de Melodic Techno & Progressive House, piscina nocturna y palcos VIP.",
  lineup: ["ALEXANDER SKY (Melodic Techno)", "NEON PULSE (Live Set)", "VALENTINA ROSS", "LUNAR ECHOES"],
  earlyBirdPromo: {
    enabled: true,
    totalQuota: 20,
    remainingStock: 14,
  },
  tiers: [
    { 
      id: "sencilla", 
      name: "Boleta General", 
      priceNormal: 1,
      pricePromo: 1,
      price: 1, // $1 COP para pruebas con Wompi
      quota: 300, 
      description: "Únicamente acceso al evento." 
    },
    { 
      id: "vip", 
      name: "Boleta VIP", 
      priceNormal: 1,
      pricePromo: 1,
      price: 1, // $1 COP para pruebas con Wompi
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

export const GOOGLE_MAPS_LINK = "#";
