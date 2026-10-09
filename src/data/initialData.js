export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE NEON FESTIVAL 2026",
  subtitle: "Noche neón VIP, producción de sonido envolvente, show de luces láser, palcos y la experiencia de música electrónica más impactante del año.",
  venue: "Finca Villa Luisa",
  unlockedVenue: "Finca Villa Luisa",
  unlockedAddress: "Av. El Pital, Pereira, Risaralda",
  date: "2026-10-24",
  formattedDate: "Sábado, 24 de Octubre, 2026",
  time: "08:00 PM - 06:00 AM",
  category: "Festival / Neón",
  image: "/images/finca/IMG_0239.jpg",
  priceMin: 1500,
  tags: ["EDICIÓN ESPECIAL NEÓN ⚡", "BOLETAS TEST WOMPI $1.500 COP", "AFORO EXCLUSIVO 300 BOLETAS"],
  description: "Prepárate para el festival neón más impresionante del año. Eclipse Events presenta su producción oficial en Finca Villa Luisa: sonido de alta fidelidad, show láser, DJs de Melodic Techno & Progressive House, piscina nocturna y palcos VIP.",
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
    title: "Fachada Principal & Mansión",
    category: "Exterior",
    url: "/images/finca/IMG_0239.jpg",
    desc: "Vista real de la casa principal y sus instalaciones campestres en Finca Villa Luisa."
  },
  {
    id: "finca-2",
    title: "Piscina y Zonas Húmedas",
    category: "Piscina",
    url: "/images/finca/IMG_0240.jpg",
    desc: "Piscina campestre con vista panorámica a las montañas de Pereira."
  },
  {
    id: "finca-3",
    title: "Escenario Principal & Show Láser",
    category: "Escenario",
    url: "/images/finca/IMG_0241.jpg",
    desc: "Estructura para montaje de sonido envolvente, pantallas LED y efectos de iluminación láser."
  },
  {
    id: "finca-4",
    title: "Palco VIP & Lounge Exclusivo",
    category: "VIP",
    url: "/images/finca/IMG_0242.jpg",
    desc: "Terraza VIP cubierta con vista directa a la piscina y al show."
  },
  {
    id: "finca-5",
    title: "Zonas Verdes & Paisaje Cafetero",
    category: "Naturaleza",
    url: "/images/finca/IMG_0243.jpg",
    desc: "Amplias áreas verdes naturales y jardines rodeados por el paisaje de Pereira."
  },
  {
    id: "finca-6",
    title: "Parqueadero Privado Custodiado",
    category: "Acceso",
    url: "/images/finca/IMG_0244.jpg",
    desc: "Estacionamiento privado con control de acceso oficial para asistentes."
  }
];

export const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Finca+Villa+Luisa/@4.851732,-76.0227041,48386m/data=!3m1!1e3!4m10!1m2!2m1!1sfinca+villa+luisa!3m6!1s0x8e387f969ae79a53:0x23bb40ddf4358b4b!8m2!3d4.851732!4d-75.734313!15sChFmaW5jYSB2aWxsYSBsdWlzYZIBCnBsYXlncm91bmTgAQA!16s%2Fg%2F11fljjf5vq?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D";
