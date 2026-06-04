import {
  BadgeCheck,
  Brush,
  Code2,
  Database,
  Figma,
  Globe2,
  Layers3,
  LayoutGrid,
  Megaphone,
  MonitorSmartphone,
  Palette,
  ShoppingCart,
  ShoppingBag,
  Sparkles,
  Store,
  TerminalSquare,
  Wrench
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface DetailedService {
  title: string;
  description: string;
  points: string[];
  icon: typeof TerminalSquare;
}

export interface ServiceWorkflowStep {
  step: string;
  title: string;
  text: string;
}

export type WorkCategory =
  | "Web Development"
  | "UI Design"
  | "Graphic Design"
  | "E-commerce"
  | "Social Media"
  | "Full-Stack Systems";

export interface WorkProject {
  title: string;
  category: WorkCategory;
  description: string;
  tags: string[];
  status: string;
  previewClassName: string;
  slug?: string;
  result?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  featuredImageUrl?: string;
}

export interface WorkCaseStudyPoint {
  title: string;
  text: string;
}

export interface VisualWorkShowcase {
  title: string;
  subtitle: string;
  size: "tall" | "medium" | "compact";
  accentClassName: string;
  category?: string;
  imageUrl?: string;
}

export interface WorkTool {
  name: string;
  icon: typeof TerminalSquare;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "/contact" }
];

export const identityCards = [
  {
    title: "Developer",
    description: "I build modern, responsive, and scalable web experiences using React, Next.js, APIs, databases, and clean UI systems.",
    icon: Code2,
    accent: "from-sky-400/30 to-cyan-300/5"
  },
  {
    title: "Designer",
    description: "I craft premium social media creatives, brand visuals, layouts, product artwork, and UI concepts with strong visual direction.",
    icon: Palette,
    accent: "from-violet-400/30 to-fuchsia-300/5"
  },
  {
    title: "Digital Operator",
    description: "I support online brands with Shopify, WordPress, product management, campaign creatives, and social media handling.",
    icon: Megaphone,
    accent: "from-amber-300/25 to-orange-300/5"
  }
];

export const projects = [
  {
    title: "Eventify",
    type: "Full-stack platform",
    description: "A university club event platform for publishing events, student signups, JWT-secured flows, and university-specific management.",
    stack: ["React", "Node.js", "MongoDB", "JWT"],
    metric: "Student event ecosystem"
  },
  {
    title: "AutoFlash",
    type: "Booking system",
    description: "A vehicle service booking experience with OTP login, date/time constraints, service categories, quotations, and admin workflows.",
    stack: ["Next.js", "MongoDB", "SMS OTP", "PayHere"],
    metric: "Service booking flow"
  },
  {
    title: "Monsoon Lanka Tours",
    type: "Travel website",
    description: "A modern tour agency web experience built to attract international travelers visiting Sri Lanka with clean trip content and booking CTAs.",
    stack: ["WordPress", "Content", "UX", "SEO"],
    metric: "Tour lead generation"
  },
  {
    title: "Blanche Global",
    type: "E-commerce operations",
    description: "Shopify product handling, collection updates, creative direction, POS support, and promotional social content for a fashion brand.",
    stack: ["Shopify", "POS Pro", "Content", "Design"],
    metric: "Fashion commerce"
  }
];

export const designWork = [
  "Luxury skincare product visuals",
  "Fashion campaign creatives",
  "Social media post design",
  "Ad creative layouts",
  "Brand identity direction",
  "Website hero banners"
];

export const services = [
  {
    title: "Websites & Web Apps",
    description: "Modern portfolio sites, business websites, dashboards, booking systems, and e-commerce experiences.",
    icon: TerminalSquare
  },
  {
    title: "Brand & Social Content",
    description: "Social media posts, campaign visuals, product creatives, brand layouts, and content direction.",
    icon: Layers3
  },
  {
    title: "E-commerce Support",
    description: "Shopify and WordPress updates, product uploads, content changes, store maintenance, and digital operations.",
    icon: ShoppingBag
  }
];

export const detailedServices: DetailedService[] = [
  {
    title: "Websites & Web Apps",
    description:
      "Modern portfolio sites, business websites, dashboards, booking systems, and custom web applications built with clean design and scalable code.",
    points: [
      "Portfolio and business websites",
      "Landing pages",
      "Admin dashboards",
      "Booking systems",
      "Full-stack web apps",
      "Responsive UI development"
    ],
    icon: TerminalSquare
  },
  {
    title: "Brand & Social Content",
    description:
      "Creative visual content designed to help brands look professional, consistent, and engaging across digital platforms.",
    points: [
      "Social media post designs",
      "Campaign visuals",
      "Product promotion creatives",
      "Brand layouts",
      "Ad creative concepts",
      "Content direction"
    ],
    icon: Layers3
  },
  {
    title: "E-commerce Support",
    description:
      "Support for Shopify and WordPress stores, including product handling, content updates, maintenance, and digital operations.",
    points: [
      "Shopify product uploads",
      "WordPress content updates",
      "Store maintenance",
      "Product page improvements",
      "Banner and collection updates",
      "E-commerce workflow support"
    ],
    icon: ShoppingBag
  },
  {
    title: "UI & Digital Design",
    description:
      "Clean and modern interface designs for websites, dashboards, mobile screens, and digital product experiences.",
    points: [
      "Website UI layouts",
      "Dashboard UI",
      "Mobile app screen concepts",
      "Design systems",
      "Wireframes",
      "User-focused layouts"
    ],
    icon: LayoutGrid
  },
  {
    title: "Social Media Handling",
    description:
      "Managing brand presentation across social media through planned content, creative posts, and consistent visual direction.",
    points: [
      "Content planning",
      "Post scheduling support",
      "Creative direction",
      "Campaign post ideas",
      "Brand consistency",
      "Monthly content support"
    ],
    icon: Megaphone
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing technical and content support to keep websites updated, clean, secure, and professional.",
    points: [
      "Website updates",
      "Bug fixes",
      "Content changes",
      "Performance checks",
      "Basic SEO updates",
      "Technical support"
    ],
    icon: Wrench
  }
];

export const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind CSS", "WordPress", "Shopify", "Photoshop", "Illustrator", "Meta Ads", "Content Planning"
];

export const process = [
  {
    step: "01",
    title: "Understand",
    text: "I study the brand, users, goals, content, and business direction before starting the creative or technical work."
  },
  {
    step: "02",
    title: "Design",
    text: "I shape the layout, visual style, user journey, and content structure with a premium and practical direction."
  },
  {
    step: "03",
    title: "Build",
    text: "I turn the idea into a responsive, fast, and maintainable digital product using modern technologies."
  },
  {
    step: "04",
    title: "Launch & Improve",
    text: "I test, polish, update, and support the final experience so it keeps working well after launch."
  }
];

export const serviceWorkflow: ServiceWorkflowStep[] = [
  {
    step: "01",
    title: "Understand",
    text: "I study the business, brand, audience, and project goals."
  },
  {
    step: "02",
    title: "Plan",
    text: "I define the content, layout, structure, and technical direction."
  },
  {
    step: "03",
    title: "Design & Build",
    text: "I create the visuals, interface, and development work with attention to detail."
  },
  {
    step: "04",
    title: "Launch & Improve",
    text: "I test, launch, maintain, and improve the final result over time."
  }
];

export const serviceAudiences = [
  "Startups",
  "Small businesses",
  "Personal brands",
  "E-commerce stores",
  "Agencies",
  "Freelance clients"
];

export const workFilterTabs = [
  "All",
  "Web Development",
  "UI Design",
  "Graphic Design",
  "E-commerce",
  "Social Media",
  "Full-Stack Systems"
] as const;

export const selectedWork: WorkProject[] = [
  {
    title: "Eventify",
    category: "Full-Stack Systems",
    description: "A university club event platform for publishing events, managing RSVPs, and improving student engagement.",
    tags: ["Next.js", "Node.js", "MongoDB", "JWT"],
    status: "Platform System",
    previewClassName: "from-sky-400/25 via-cyan-300/10 to-transparent",
    slug: "eventify",
    featured: true,
    result: "Student event ecosystem",
    featuredImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
  },
  {
    title: "AutoFlash",
    category: "Web Development",
    description: "A vehicle service booking and quotation system with service flows, booking slots, and digital customer experience.",
    tags: ["Next.js", "API Routes", "MongoDB", "PayHere"],
    status: "Booking Experience",
    previewClassName: "from-violet-500/25 via-sky-400/10 to-transparent",
    slug: "autoflash",
    featured: true,
    result: "Service booking flow",
    featuredImageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
  },
  {
    title: "Monsoon Lanka Tours",
    category: "Web Development",
    description: "A travel agency website designed for international tourists exploring Sri Lanka tour packages and inquiry-based bookings.",
    tags: ["WordPress", "Travel Website", "UI Content"],
    status: "Business Website",
    previewClassName: "from-emerald-400/20 via-sky-400/10 to-transparent",
    slug: "monsoon-lanka-tours",
    featuredImageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    title: "Blanche Global",
    category: "E-commerce",
    description: "Shopify fashion store support including product handling, website updates, POS support, and digital content coordination.",
    tags: ["Shopify", "POS Pro", "Product Uploads"],
    status: "Commerce Support",
    previewClassName: "from-amber-300/20 via-orange-300/10 to-transparent",
    slug: "blanche-global",
    featuredImageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
  },
  {
    title: "La Rocher Ceylon",
    category: "Social Media",
    description: "Skincare brand visual content, product-focused creatives, captions, and campaign-ready social media presentation.",
    tags: ["Graphic Design", "Content", "Product Visuals"],
    status: "Brand Campaign",
    previewClassName: "from-pink-400/20 via-violet-400/10 to-transparent",
    slug: "la-rocher-ceylon"
  },
  {
    title: "Creative Brand Visuals",
    category: "Graphic Design",
    description: "A selection of social media posts, product promotions, campaign visuals, and brand-focused digital designs.",
    tags: ["Photoshop", "Illustrator", "Social Media"],
    status: "Visual Collection",
    previewClassName: "from-fuchsia-400/20 via-sky-400/10 to-transparent",
    slug: "creative-brand-visuals"
  }
];

export const workCaseStudyPoints: WorkCaseStudyPoint[] = [
  {
    title: "Problem",
    text: "The challenge or business need behind the project."
  },
  {
    title: "Solution",
    text: "The design, development, or digital support I provided."
  },
  {
    title: "Tools",
    text: "The technologies, platforms, and creative tools used."
  },
  {
    title: "Result",
    text: "The final outcome, improvement, or value created."
  }
];

export const visualWorkShowcase: VisualWorkShowcase[] = [
  {
    title: "Social media posts",
    subtitle: "Campaign-ready layouts for consistent brand publishing.",
    size: "tall",
    accentClassName: "from-sky-400/20 via-violet-400/12 to-white/5",
    category: "Social Content"
  },
  {
    title: "Product ad designs",
    subtitle: "Visuals shaped for product focus and conversion intent.",
    size: "medium",
    accentClassName: "from-rose-400/18 via-fuchsia-400/12 to-white/5",
    category: "Product Creative"
  },
  {
    title: "Website banners",
    subtitle: "Hero banners and promotional web assets with strong hierarchy.",
    size: "compact",
    accentClassName: "from-cyan-400/18 via-sky-400/12 to-white/5",
    category: "Web Visuals"
  },
  {
    title: "Brand identity layouts",
    subtitle: "Structured design systems for cleaner brand presentation.",
    size: "medium",
    accentClassName: "from-violet-400/18 via-indigo-400/12 to-white/5",
    category: "Brand Design"
  },
  {
    title: "E-commerce campaign creatives",
    subtitle: "Store-ready visuals for launches, offers, and collections.",
    size: "tall",
    accentClassName: "from-amber-300/18 via-orange-300/12 to-white/5",
    category: "Commerce Support"
  },
  {
    title: "UI concepts",
    subtitle: "Interface explorations for modern apps and digital products.",
    size: "compact",
    accentClassName: "from-emerald-400/18 via-cyan-400/12 to-white/5",
    category: "UI Design"
  }
];

export const workTools: WorkTool[] = [
  { name: "Next.js", icon: Globe2 },
  { name: "React", icon: MonitorSmartphone },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: LayoutGrid },
  { name: "Node.js", icon: TerminalSquare },
  { name: "PostgreSQL", icon: Database },
  { name: "Neon", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "Firebase", icon: Database },
  { name: "Shopify", icon: Store },
  { name: "WordPress", icon: Globe2 },
  { name: "Photoshop", icon: Brush },
  { name: "Illustrator", icon: Palette },
  { name: "Canva", icon: Figma },
  { name: "Meta Ads", icon: ShoppingCart }
];

export const highlights = [
  { label: "Focus", value: "Code + Design + Digital" },
  { label: "Based in", value: "Sri Lanka" },
  { label: "Role", value: "Software Engineering Undergraduate" },
  { label: "Style", value: "Modern, clean, premium" }
];

export const trustPoints = [
  "Full-stack project thinking",
  "Design-first visual direction",
  "Real brand and e-commerce experience",
  "Social media and campaign understanding"
];

export const badgeIcon = BadgeCheck;
export const sparkIcon = Sparkles;
