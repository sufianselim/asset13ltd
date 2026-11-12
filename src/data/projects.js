export const projects = [
  {
    slug: "riverside-residences",
    title: "Riverside Residences",
    status: "Ongoing",
    statusKey: "ongoing",
    location: "To be announced",
    type: "Residential housing",
    completion: "To be announced",
    featured: true,
    isSample: true,
    short:
      "A collection of contemporary family homes arranged around a quiet landscaped courtyard.",
    heroDescription:
      "A collection of contemporary family homes arranged around a quiet, landscaped courtyard — planned for privacy, daylight, and easy everyday living.",
    cover: "/images/project-riverside.jpg",
    coverAlt: "Contemporary family home with a pitched roof and planted front garden",
    overview: [
      "Riverside Residences is a residential concept built around a simple idea: a calm, landscaped setting with homes that open generously to light and outdoor space. The arrangement favours a small, coherent community over a dense layout.",
      "A collection of family homes is grouped around a shared courtyard, reducing through-traffic and creating a protected central space for residents. Each home has a clear entrance, practical storage, and a direct relationship to the garden."
    ],
    designIntent: [
      "Inside, living and sleeping areas are clearly separated, with open-plan living space oriented toward the courtyard. Windows are positioned to capture daylight without compromising privacy, and circulation is kept simple and efficient.",
      "The material palette prioritises durability and low maintenance — warm masonry, timber, and muted metalwork chosen to weather naturally and improve with age rather than date quickly."
    ],
    features: [
      "Three and four-bedroom homes",
      "Landscaped shared courtyard",
      "Private off-street parking",
      "Efficient building envelope",
      "Considered storage throughout",
      "Direct garden access"
    ],
    gallery: [
      {
        src: "/images/project-riverside.jpg",
        alt: "Contemporary family home exterior with pitched roof and planted garden",
        caption: "Riverside Residences — exterior concept"
      },
      {
        src: "/images/gallery-1.jpg",
        alt: "Bright living space opening onto a garden",
        caption: "Living space with natural light and garden outlook"
      },
      {
        src: "/images/gallery-2.jpg",
        alt: "Interior detail with warm timber joinery and neutral finishes",
        caption: "Considered interior finishes and joinery"
      }
    ]
  },
  {
    slug: "garden-court",
    title: "The Garden Court",
    status: "Upcoming",
    statusKey: "upcoming",
    location: "To be announced",
    type: "Residential apartments",
    completion: "To be announced",
    featured: true,
    isSample: true,
    short:
      "A low-rise residential address designed around greenery, daylight, and a sense of calm.",
    heroDescription:
      "A low-rise residential address designed around greenery, daylight, and a sense of calm — with a planted courtyard at its centre.",
    cover: "/images/project-garden-court.jpg",
    coverAlt: "Low-rise residential building with deep terraces and surrounding greenery",
    overview: [
      "The Garden Court is conceived as a quieter alternative to the typical apartment block: a low-rise collection of homes arranged around a planted central courtyard, with daylight and greenery treated as essential parts of the plan.",
      "The courtyard acts as the social heart of the project — a shared, shaded space that residents can cross, sit in, or look onto. Entrances are grouped around it, making the building easy to navigate and giving each home a clear sense of address."
    ],
    designIntent: [
      "Apartments are planned with cross-ventilation and dual aspects where possible, reducing reliance on mechanical cooling. Living spaces face the garden, while bedrooms are positioned for privacy and quiet.",
      "Planting is integral rather than decorative: mature trees, deep balconies, and low-maintenance landscaping work together to soften the building and improve the experience of everyday life."
    ],
    features: [
      "One to three-bedroom apartments",
      "Planted central courtyard",
      "Cross-ventilation and natural daylight",
      "Secure entry and resident parking",
      "Shared roof terrace",
      "Low-maintenance landscaping"
    ],
    gallery: [
      {
        src: "/images/project-garden-court.jpg",
        alt: "Low-rise residential building with deep terraces and surrounding greenery",
        caption: "The Garden Court — exterior concept"
      },
      {
        src: "/images/gallery-2.jpg",
        alt: "Interior living space with warm neutral finishes and natural light",
        caption: "Interior living space with warm, neutral finishes"
      },
      {
        src: "/images/interior.jpg",
        alt: "Calm contemporary interior opening to a planted outlook",
        caption: "Calm interiors opening to planted outlooks"
      }
    ]
  },
  {
    slug: "harbor-view-terraces",
    title: "Harbor View Terraces",
    status: "Upcoming",
    statusKey: "upcoming",
    location: "To be announced",
    type: "Terraced housing",
    completion: "To be announced",
    featured: true,
    isSample: true,
    short:
      "Terraced homes conceived for outlook and privacy, with generous indoor-outdoor living.",
    heroDescription:
      "Terraced homes conceived for outlook and privacy, with generous indoor-outdoor living and a strong connection to the landscape.",
    cover: "/images/project-harbor-view.jpg",
    coverAlt: "Terraced home with wide glazing and a private outdoor terrace",
    overview: [
      "Harbor View Terraces is a study in balance: a row of terraced homes that feels private and generous without turning its back on its setting. Each home is oriented to make the most of outlook, daylight, and outdoor space.",
      "The terraces step gently across the site, creating variations in view and giving each home a distinct relationship with the landscape. Living areas open directly onto terraces, extending the usable space of the home and encouraging everyday outdoor living."
    ],
    designIntent: [
      "Internally, the homes are arranged around a simple, efficient plan: a generous living and dining space at the heart, quieter bedrooms above, and practical storage throughout. Wide glazing and carefully placed openings bring light deep into the plan.",
      "Externally, the material palette is restrained and durable — masonry, timber, and dark metalwork — chosen to age gracefully and reduce maintenance over time."
    ],
    features: [
      "Terraced three-bedroom homes",
      "Generous terraces and balconies",
      "Open-plan living and dining",
      "Private resident parking",
      "Durable external materials",
      "Landscaped approach and shared paths"
    ],
    gallery: [
      {
        src: "/images/project-harbor-view.jpg",
        alt: "Terraced home with wide glazing and a private outdoor terrace",
        caption: "Harbor View Terraces — exterior concept"
      },
      {
        src: "/images/gallery-3.jpg",
        alt: "Living area opening onto a terrace through wide glazing",
        caption: "Indoor-outdoor living with generous glazing"
      },
      {
        src: "/images/gallery-1.jpg",
        alt: "Light-filled living space with a garden outlook",
        caption: "Light-filled living space with garden outlook"
      }
    ]
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug) {
  return projects.filter((project) => project.slug !== slug);
}
