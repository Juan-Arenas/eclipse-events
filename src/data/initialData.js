export const WHATSAPP_NUMBER = "313 523 8896";
export const WHATSAPP_RAW = "573135238896";
export const WHATSAPP_LINK = "https://wa.me/573135238896";
export const WHATSAPP_BUY_MESSAGE = "https://wa.me/573135238896?text=Hola%2C%20quiero%20comprar%20boletas%20para%20el%20evento%20de%20Eclipse%20Events%20del%2028%20de%20noviembre";
export const WHATSAPP_INFO_MESSAGE = "https://wa.me/573135238896?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20evento%20de%20Eclipse%20Events%20en%20Finca%20Villa%20Amparo";

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/zi85FJz6SCFdGt1w9?g_st=iw";

export const UNDERACCESS_BUY_LINK = "https://api.underaccess.com/functions/v1/comprar?org=eclipseevents&event=eclipse-fest&r=ef5f0e8e-169b-4a8e-a187-8c43c6f82b5b";

export const INITIAL_MONTHLY_EVENT = {
  id: "evt-monthly-main",
  title: "ECLIPSE FESTIVAL 2026",
  subtitle: "Noche neón VIP, producción de sonido envolvente, show de luces láser, palcos y la experiencia de música electrónica más impactante del año.",
  venue: "Finca Villa Amparo",
  unlockedVenue: "Finca Villa Amparo",
  unlockedAddress: "Finca Villa Amparo, Santa Rosa de Cabal, Risaralda",
  date: "2026-11-28",
  formattedDate: "Sábado, 28 de Noviembre, 2026",
  time: "Hora por confirmar (Apertura 08:00 PM)",
  timeStatus: "PENDIENTE_CONFIRMAR",
  category: "Festival / Neón VIP",
  image: "/images/flyer.jpeg",
  priceMin: 32000,
  tags: ["EDICIÓN ESPECIAL NEÓN ⚡", "SÁBADO 28 DE NOVIEMBRE", "AFORO EXCLUSIVO LIMITADO"],
  description: "Prepárate para la experiencia más impresionante del año. Eclipse Events presenta su producción oficial en Finca Villa Amparo: sonido envolvente de alta fidelidad, show láser de última generación, piscina campestre, áreas sociales y palcos VIP.",
  lineup: ["DJs Invitados (Por Confirmar)", "Show Láser Neón", "Sonido Envolvente VIP", "Zona Experiencial"],
  earlyBirdPromo: {
    enabled: true,
    totalQuota: 20,
    remainingStock: 14,
  },
  tiers: [
    {
      id: "sencilla",
      name: "General",
      priceNormal: 32000,
      pricePromo: 32000,
      price: 32000,
      quota: 300,
      description: "Acceso general al evento y zonas comunes."
    },
    {
      id: "vip",
      name: "VIP + Eclipse drinks",
      priceNormal: 38000,
      pricePromo: 38000,
      price: 38000,
      quota: 100,
      description: "Acceso preferencial exclusivo, zona VIP y Eclipse drinks."
    },
    {
      id: "2x1",
      name: "2x1 MUJERES",
      priceNormal: 39000,
      pricePromo: 39000,
      price: 39000,
      quota: 50,
      description: "Ingreso para dos mujeres con una sola entrada."
    }
  ]
};

export const FINCA_PHOTOS = [
  {
    id: "finca-1",
    title: "Piscina Principal & Zona Húmeda",
    category: "Piscina",
    url: "/images/finca/finca_1.jpg",
    desc: "Piscina campestre con tobogán, kiosko social y amplias zonas verdes para disfrutar del festival al aire libre en Villa Amparo."
  },
  {
    id: "finca-2",
    title: "Deck de Hamacas & Zona Chill",
    category: "Instalaciones",
    url: "/images/finca/finca_2.jpg",
    desc: "Terraza cubierta en madera equipada con hamacas para el relax y descanso de los asistentes."
  },
  {
    id: "finca-3",
    title: "Salón de Juegos & Billar Panorámico",
    category: "VIP",
    url: "/images/finca/finca_3.jpg",
    desc: "Área social y de entretenimiento techada con mesa de billar y espectacular vista panorámica a las montañas de Santa Rosa de Cabal."
  },
  {
    id: "finca-4",
    title: "Mirador Artístico & Jardines",
    category: "Zonas Verdes",
    url: "/images/finca/finca_4.jpg",
    desc: "Explanada campestre con jardines naturales, mirador panorámico con esculturas artísticas y paisaje cafetero."
  }
];

