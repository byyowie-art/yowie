// Everything you'll want to change lives here.
const YOWIE = {
  price: 120, // EUR, shipping is added at checkout
  leadTime: { en: "2–3 weeks", es: "2–3 semanas" },

  // Checkout runs on Shopify (Starter plan). The Buy button opens Shopify's checkout with the
  // chosen size (its `variant` id below) in the basket; the colour rides along and shows on the
  // order in Shopify admin. The customer types their address there, Shopify adds the shipping
  // price from your shipping zones, and they pay with Apple Pay / Google Pay / PayPal / card.
  // Variant ids: Shopify admin → the product → add ".json" to the page address → variants → id.
  // A size without a variant id falls back to ordering by email.
  shopifyStore: "0fr1wz-w1.myshopify.com",

  instagram: "https://instagram.com/byyowie",
  email: "byyowie@gmail.com",

  // Gazzal Marilyn & Merinos. `code` is the yarn number (it's sent with the order),
  // `yarn` is the texture used for the swatch, `image` (optional) is a photo of the
  // finished pair in that colour — add one per colour after the photoshoot.
  // Once every colour has an `image`, "All colours" switches from yarn circles to photo boxes.
  // Delete any line to stop selling that colour.
  defaultColor: "8259",
  colors: [
    { code: "8251", name: "Snow", es: "Nieve", hex: "#f7f7f5" },
    { code: "8252", name: "Ice", es: "Hielo", hex: "#eef0f4" },
    { code: "8253", name: "Cloud", es: "Nube", hex: "#d6e2f2" },
    { code: "8254", name: "Turquoise", es: "Turquesa", hex: "#3fb0d6" },
    { code: "8255", name: "Orchid", es: "Orquídea", hex: "#d99be0" },
    { code: "8256", name: "Hot Pink", es: "Rosa fuerte", hex: "#e8457f" },
    { code: "8258", name: "Emerald", es: "Esmeralda", hex: "#1f9a4e" },
    { code: "8259", name: "Moss", es: "Musgo", hex: "#8fa63a", image: "assets/hero-green.jpg" },
    { code: "8260", name: "Mustard", es: "Mostaza", hex: "#b9a12a" },
    { code: "8261", name: "Pistachio", es: "Pistacho", hex: "#e2ec97" },
    { code: "8262", name: "Lemon Cream", es: "Crema limón", hex: "#eef2c4" },
    { code: "8263", name: "Tangerine", es: "Mandarina", hex: "#f57a1c" },
    { code: "8264", name: "Coral", es: "Coral", hex: "#f86c4f" },
    { code: "8266", name: "Raspberry", es: "Frambuesa", hex: "#c94a5c" },
    { code: "8267", name: "Burgundy", es: "Burdeos", hex: "#7a1f3d" },
    { code: "8269", name: "Pearl", es: "Perla", hex: "#ecebe8" },
    { code: "8270", name: "Cream", es: "Crema", hex: "#ede3cf" },
    { code: "8271", name: "Peach", es: "Melocotón", hex: "#f0cdb0" },
    { code: "8272", name: "Camel", es: "Camel", hex: "#a57c55" },
    { code: "8275", name: "Slate", es: "Pizarra", hex: "#7b8590" },
    { code: "8276", name: "Lavender Grey", es: "Gris lavanda", hex: "#b9bccd" },
    { code: "8277", name: "Sunshine", es: "Sol", hex: "#f7de1f" },
    { code: "8279", name: "Baby Blue", es: "Azul bebé", hex: "#9fcff2" },
    { code: "8281", name: "Black", es: "Negro", hex: "#1a1a1a" },
    { code: "8287", name: "Ballet Pink", es: "Rosa ballet", hex: "#f6d6dc" },
    { code: "8288", name: "Lilac", es: "Lila", hex: "#dcdaf0" },
    { code: "8289", name: "Fuchsia", es: "Fucsia", hex: "#f0306e" },
    { code: "8290", name: "Petrol", es: "Petróleo", hex: "#2f5f7a" },
    { code: "8291", name: "Gold", es: "Oro", hex: "#e3c63a" },
    { code: "8292", name: "Neon Lime", es: "Lima neón", hex: "#c4ef3a" },
  ].map((c) => ({ yarn: `assets/yarn/${c.code}.jpg`, ...c })),

  // EU size → foot length in cm (heel to longest toe). Adjust to your own pattern.
  sizes: [
    { eu: 35, cm: 22.5, variant: "59282535874895" },
    { eu: 36, cm: 23, variant: "59282535907663" },
    { eu: 37, cm: 23.5, variant: "59282535940431" },
    { eu: 38, cm: 24.5, variant: "59282535973199" },
    { eu: 39, cm: 25, variant: "59282536005967" },
    { eu: 40, cm: 25.5, variant: "59282536038735" },
    { eu: 41, cm: 26.5, variant: "59282536071503" },
    { eu: 42, cm: 27, variant: "59282536104271" },
    { eu: 43, cm: 27.5, variant: "59282567758159" },
  ],

  gallery: [
    "assets/hero-green.jpg",
    "assets/detail-green.jpg",
  ],
};

window.YOWIE = YOWIE;
