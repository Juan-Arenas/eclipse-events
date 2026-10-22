export const WHATSAPP_NUMBER = "313 523 8896";
export const WHATSAPP_RAW = "573135238896";
export const WHATSAPP_LINK = "https://wa.me/573135238896";
export const WHATSAPP_BUY_MESSAGE = "https://wa.me/573135238896?text=Hola%2C%20quiero%20comprar%20boletas%20para%20el%20evento%20de%20Eclipse%20Events%20del%2028%20de%20noviembre";
export const WHATSAPP_INFO_MESSAGE = "https://wa.me/573135238896?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20evento%20de%20Eclipse%20Events%20en%20Finca%20Hotel%20Villa%20Luisa";

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/h8N3erdc6PaDp6gy8?g_st=iw";

export const UNDERACCESS_BUY_LINK = "https://api.underaccess.com/functions/v1/comprar?org=eclipseevents&event=eclipse-fest&r=ef5f0e8e-169b-4a8e-a187-8c43c6f82b5b";

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
  image: "/images/finca/finca_1.jpg",
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
    title: "Panorámica General & Chalet Campestre",
    category: "Instalaciones",
    url: "/images/finca/finca_1.jpg",
    desc: "Vista panorámica de la finca con extensos jardines, senderos adoquinados, arquitectura tipo chalet y piscina."
  },
  {
    id: "finca-2",
    title: "Piscina & Zona Húmeda Panorámica",
    category: "Piscina",
    url: "/images/finca/finca_2.jpg",
    desc: "Piscina campestre con cerramiento panorámico en vidrio templado y vista abierta a la naturaleza."
  },
  {
    id: "finca-3",
    title: "Sendero & Palmeras Neón VIP",
    category: "Nocturna",
    url: "/images/finca/finca_3.jpg",
    desc: "Iluminación neón especial en palmeras y sendero principal hacia las cabañas durante la noche."
  },
  {
    id: "finca-4",
    title: "Cancha Abierta & Zona de Escenario",
    category: "Escenario",
    url: "/images/finca/finca_4.jpg",
    desc: "Gran explanada verde de césped natural para la producción de tarima principal, sonido y show láser."
  },
  {
    id: "finca-5",
    title: "Salón de Juegos & Lounge Techado",
    category: "VIP",
    url: "/images/finca/finca_5.jpg",
    desc: "Zona social y de entretenimiento con mesas de billar, tenis de mesa y espacio lounge cubierto."
  },
  {
    id: "finca-6",
    title: "Senderos Iluminados & Cabañas",
    category: "Acceso",
    url: "/images/finca/finca_6.jpg",
    desc: "Recorrido nocturno por senderos de adoquín rodeados de pinos y arquitectura campestre iluminada."
  }
];

