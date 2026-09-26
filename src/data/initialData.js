export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE NEON FESTIVAL 2026",
  subtitle: "Noche neón VIP, producción de sonido envolvente, show de luces láser, palcos y la experiencia de música electrónica más impactante del año.",
  venue: "Finca Mi Terrenito",
  unlockedVenue: "Finca Mi Terrenito",
  unlockedAddress: "Ubicación pública de la finca",
  date: "2026-10-24",
  formattedDate: "Sábado, 24 de Octubre, 2026",
  time: "08:00 PM - 06:00 AM",
  category: "Festival / Neón",
  image: "/images/finca/IMG_0239.jpg",
  priceMin: 1500,
  tags: ["EDICIÓN ESPECIAL NEÓN ⚡", "BOLETAS TEST WOMPI $1.500 COP", "AFORO EXCLUSIVO 300 BOLETAS"],
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
      name: "Entrada Normal", 
      priceNormal: 25000,
      pricePromo: 15000,
      price: 25000,
      quota: 300, 
      description: "Acceso general al evento." 
    },
    { 
      id: "vip", 
      name: "Entrada VIP", 
      priceNormal: 35000,
      pricePromo: 25000,
      price: 35000,
      quota: 100, 
      description: "Acceso preferencial." 
    },
    { 
      id: "2x1", 
      name: "2x1 Mujeres", 
      priceNormal: 40000,
      pricePromo: 30000,
      price: 40000,
      quota: 50, 
      description: "Ingreso para dos mujeres con una sola entrada." 
    }
  ]
};

export const FINCA_PHOTOS = [
  {
    id: "finca-1",
    title: "Fachada Principal",
    category: "Exterior",
    url: "/images/finca/IMG_0239.jpg",
    desc: "Vista real de la casa principal y sus instalaciones."
  },
  {
    id: "finca-2",
    title: "Piscina y Zonas Húmedas",
    category: "Piscina",
    url: "/images/finca/IMG_0240.jpg",
    desc: "Piscina campestre rodeada de zonas verdes."
  },
  {
    id: "finca-3",
    title: "Área Social",
    category: "Social",
    url: "/images/finca/IMG_0241.jpg",
    desc: "Amplia área social cubierta y zonas comunes."
  },
  {
    id: "finca-4",
    title: "Zonas de Estar",
    category: "Descanso",
    url: "/images/finca/IMG_0242.jpg",
    desc: "Múltiples zonas de descanso y esparcimiento al aire libre."
  },
  {
    id: "finca-5",
    title: "Zonas Verdes",
    category: "Naturaleza",
    url: "/images/finca/IMG_0243.jpg",
    desc: "Amplias áreas verdes naturales y jardines."
  },
  {
    id: "finca-6",
    title: "Parqueadero Privado",
    category: "Acceso",
    url: "/images/finca/IMG_0244.jpg",
    desc: "Estacionamiento privado dentro de las instalaciones."
  }
];

export const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Finca+Mi+Terrenito/@4.9158519,-75.6294989,756m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e477f0030099ba3:0x4518ed58d1ca7593!8m2!3d4.9158519!4d-75.626924!16s%2Fg%2F11xmksv4dm?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D";
