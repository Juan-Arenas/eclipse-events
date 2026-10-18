export const WHATSAPP_NUMBER = "313 523 8896";
export const WHATSAPP_RAW = "573135238896";
export const WHATSAPP_LINK = "https://wa.me/573135238896";
export const WHATSAPP_BUY_MESSAGE = "https://wa.me/573135238896?text=Hola%2C%20quiero%20comprar%20boletas%20para%20el%20evento%20de%20Eclipse%20Events%20del%2028%20de%20noviembre";
export const WHATSAPP_INFO_MESSAGE = "https://wa.me/573135238896?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20evento%20de%20Eclipse%20Events%20en%20Finca%20Hotel%20Villa%20Luisa";

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/h8N3erdc6PaDp6gy8?g_st=iw";

export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE FESTIVAL 2026",
  subtitle: "Noche neón VIP, producción de sonido envolvente, show de luces láser, palcos y la experiencia de música electrónica más impactante del año.",
  venue: "Finca Hotel Villa Luisa",
  unlockedVenue: "Finca Hotel Villa Luisa",
  unlockedAddress: "Vereda El Lembo, Santa Rosa de Cabal, Risaralda",
  date: "2026-11-28",
  formattedDate: "Sábado, 28 de Noviembre, 2026",
  time: "Hora por confirmar (Apertura 08:00 PM)",
  timeStatus: "PENDIENTE_CONFIRMAR",
  category: "Festival / Neón VIP",
  image: "/images/finca/IMG_0239.jpg",
  priceMin: 25000,
  tags: ["EDICIÓN ESPECIAL NEÓN ⚡", "SÁBADO 28 DE NOVIEMBRE", "AFORO EXCLUSIVO LIMITADO"],
  description: "Prepárate para la experiencia más impresionante del año. Eclipse Events presenta su producción oficial en Finca Hotel Villa Luisa: sonido envolvente de alta fidelidad, show láser de última generación, piscina tropical, áreas sociales y palcos VIP.",
  lineup: ["DJs Invitados (Por Confirmar)", "Show Láser Neón", "Sonido Envolvente VIP", "Zona Experiencial"],
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
      pricePromo: 20000,
      price: 25000,
      quota: 300, 
      description: "Acceso general al evento y zonas comunes." 
    },
    { 
      id: "vip", 
      name: "Entrada VIP", 
      priceNormal: 35000,
      pricePromo: 30000,
      price: 35000,
      quota: 100, 
      description: "Acceso preferencial exclusivo y zona VIP." 
    },
    { 
      id: "2x1", 
      name: "2x1 Mujeres", 
      priceNormal: 40000,
      pricePromo: 35000,
      price: 40000,
      quota: 50, 
      description: "Ingreso para dos mujeres con una sola entrada." 
    }
  ]
};

export const FINCA_PHOTOS = [
  {
    id: "finca-1",
    title: "Fachada Principal & Instalaciones",
    category: "Exterior",
    url: "/images/finca/IMG_0239.jpg",
    desc: "Vista real de las instalaciones campestres en Finca Hotel Villa Luisa, Vereda El Lembo, Santa Rosa de Cabal."
  },
  {
    id: "finca-2",
    title: "Piscina y Zonas Húmedas",
    category: "Piscina",
    url: "/images/finca/IMG_0240.jpg",
    desc: "Piscina campestre con entorno natural en Finca Hotel Villa Luisa."
  },
  {
    id: "finca-3",
    title: "Escenario Principal & Show Láser",
    category: "Escenario",
    url: "/images/finca/IMG_0241.jpg",
    desc: "Área de montaje de sonido envolvente, pantallas y show de luces láser."
  },
  {
    id: "finca-4",
    title: "Palco VIP & Lounge Exclusivo",
    category: "VIP",
    url: "/images/finca/IMG_0242.jpg",
    desc: "Terraza VIP cubierta con vista directa a la zona del show."
  },
  {
    id: "finca-5",
    title: "Zonas Verdes & Paisaje Cafetero",
    category: "Naturaleza",
    url: "/images/finca/IMG_0243.jpg",
    desc: "Amplias áreas verdes naturales en Santa Rosa de Cabal, Risaralda."
  },
  {
    id: "finca-6",
    title: "Parqueadero Privado Custodiado",
    category: "Acceso",
    url: "/images/finca/IMG_0244.jpg",
    desc: "Estacionamiento privado con control de acceso oficial en Finca Hotel Villa Luisa."
  }
];

