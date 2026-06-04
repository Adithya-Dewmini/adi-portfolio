export type ContentStatus = "Published" | "Draft";
export type MessageStatus = "New" | "Read" | "Replied";
export type MediaUsage = "Project" | "Design Work" | "Page";

export interface AdminPageSummary {
  id: "home" | "work" | "services" | "contact";
  title: string;
  slug: string;
  status: ContentStatus;
  updatedAt: string;
  editorHref: string;
  previewHref: string;
}

export interface EditableIdentityCard {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface HomePageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  identityCards: EditableIdentityCard[];
  featuredWorkSectionTitle: string;
  featuredServicesSectionTitle: string;
  aboutPreviewText: string;
  finalCtaTitle: string;
  finalCtaText: string;
  showHero: boolean;
  showIdentityCards: boolean;
  showFeaturedWork: boolean;
  showFeaturedServices: boolean;
  showAboutPreview: boolean;
  showFinalCta: boolean;
}

export interface WorkPageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  workCategories: string[];
  featuredWorkSectionTitle: string;
  caseStudySectionTitle: string;
  designShowcaseSectionTitle: string;
  toolsSectionTitle: string;
  finalCtaTitle: string;
  finalCtaText: string;
}

export interface ServicesPageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  servicesGridTitle: string;
  processSectionTitle: string;
  audiencesSectionTitle: string;
  finalCtaTitle: string;
  finalCtaText: string;
}

export interface ContactPageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  emailDisplayText: string;
  emailAddress: string;
  whatsappDisplayText: string;
  whatsappNumber: string;
  whatsappLink: string;
  locationTitle: string;
  locationDescription: string;
  contactFormHeading: string;
  mapCardTitle: string;
  availabilityText: string;
  finalCtaTitle: string;
  finalCtaText: string;
  showContactForm: boolean;
  showMapCard: boolean;
  showWhatsAppCard: boolean;
}

export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  featuredImageUrl: string;
  liveUrl: string;
  githubUrl: string;
  status: ContentStatus;
  featured: boolean;
  showOnHome: boolean;
  showOnWorkPage: boolean;
  updatedAt: string;
}

export interface AdminDesignWork {
  id: string;
  title: string;
  slug: string;
  category: string;
  brandClient: string;
  description: string;
  imageUrl: string;
  toolsUsed: string[];
  status: ContentStatus;
  featured: boolean;
  showOnHome: boolean;
  showOnWorkPage: boolean;
  updatedAt: string;
}

export interface AdminService {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  bulletPoints: string[];
  status: ContentStatus;
  featured: boolean;
  showOnHome: boolean;
  showOnServicesPage: boolean;
  updatedAt: string;
}

export interface AdminTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  status: ContentStatus;
  featured: boolean;
  updatedAt: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: ContentStatus;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  preview: string;
  message: string;
  status: MessageStatus;
  receivedAt: string;
}

export interface AdminMediaItem {
  id: string;
  title: string;
  url: string;
  publicId?: string;
  usedIn: MediaUsage;
  updatedAt: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  fullName: string;
  professionalTitle: string;
  shortBio: string;
  location: string;
  email: string;
  whatsapp: string;
  phone: string;
  linkedIn: string;
  github: string;
  instagram: string;
  behance: string;
  cvUrl: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultOgImageUrl: string;
  darkModeEnabled: boolean;
  dashboardCompactMode: boolean;
}

export const adminPages: AdminPageSummary[] = [
  {
    id: "home",
    title: "Home",
    slug: "/",
    status: "Published",
    updatedAt: "2026-05-23",
    editorHref: "/admin/pages/home",
    previewHref: "/"
  },
  {
    id: "work",
    title: "Work",
    slug: "/work",
    status: "Published",
    updatedAt: "2026-05-23",
    editorHref: "/admin/pages/work",
    previewHref: "/work"
  },
  {
    id: "services",
    title: "Services",
    slug: "/services",
    status: "Published",
    updatedAt: "2026-05-23",
    editorHref: "/admin/pages/services",
    previewHref: "/services"
  },
  {
    id: "contact",
    title: "Contact",
    slug: "/contact",
    status: "Published",
    updatedAt: "2026-05-23",
    editorHref: "/admin/pages/contact",
    previewHref: "/contact"
  }
];

export const homePageContent: HomePageContent = {
  heroBadge: "Available for web, design & digital projects",
  heroTitle: "I design, build & grow digital brands.",
  heroSubtitle:
    "Software engineering undergraduate, full-stack web developer, graphic designer, freelancer, and social media creative — combining code, visuals, and digital strategy into premium online experiences.",
  primaryCtaText: "View selected work",
  primaryCtaLink: "/work",
  secondaryCtaText: "Start a project",
  secondaryCtaLink: "/contact",
  identityCards: [
    {
      id: "identity-developer",
      title: "Developer",
      description: "I build modern, responsive, and scalable web experiences using React, Next.js, APIs, databases, and clean UI systems.",
      enabled: true
    },
    {
      id: "identity-designer",
      title: "Designer",
      description: "I craft premium social media creatives, brand visuals, layouts, product artwork, and UI concepts with strong visual direction.",
      enabled: true
    },
    {
      id: "identity-digital-operator",
      title: "Digital Operator",
      description: "I support online brands with Shopify, WordPress, product management, campaign creatives, and social media handling.",
      enabled: true
    }
  ],
  featuredWorkSectionTitle: "Not just projects — digital systems with purpose.",
  featuredServicesSectionTitle: "One person who understands the full digital journey.",
  aboutPreviewText:
    "I combine code, design, and digital execution to help brands launch polished websites, campaigns, and creative systems.",
  finalCtaTitle: "Have a brand, website, or idea to build?",
  finalCtaText: "Let’s create something that looks premium, works smoothly, and helps your digital presence stand out.",
  showHero: true,
  showIdentityCards: true,
  showFeaturedWork: true,
  showFeaturedServices: true,
  showAboutPreview: true,
  showFinalCta: true
};

export const workPageContent: WorkPageContent = {
  heroBadge: "Selected Work",
  heroTitle: "A collection of websites, systems, designs, and digital brand work.",
  heroSubtitle:
    "Explore the projects, digital experiences, visual content, and e-commerce work I’ve created across software development, design, and online brand support.",
  primaryCtaText: "View Projects",
  primaryCtaLink: "#projects",
  secondaryCtaText: "View Design Work",
  secondaryCtaLink: "#design-work",
  workCategories: ["All", "Web Development", "UI Design", "Graphic Design", "E-commerce", "Social Media", "Full-Stack Systems"],
  featuredWorkSectionTitle: "Selected work across development, design, commerce, and digital brand support.",
  caseStudySectionTitle: "How I Present My Work",
  designShowcaseSectionTitle: "Selected Visual Work",
  toolsSectionTitle: "Tools behind the work",
  finalCtaTitle: "Have a project that needs both design and development?",
  finalCtaText: "I can help shape the idea, design the experience, build the website, and support the digital content around it."
};

export const servicesPageContent: ServicesPageContent = {
  heroBadge: "Services",
  heroTitle: "Digital services built for brands that need design, development, and growth.",
  heroSubtitle:
    "From modern websites and web applications to brand visuals, e-commerce support, and social media content, I help businesses create a complete digital presence.",
  primaryCtaText: "Start a Project",
  primaryCtaLink: "/contact",
  secondaryCtaText: "View My Work",
  secondaryCtaLink: "/work",
  servicesGridTitle: "Detailed support across code, design, content, and digital operations.",
  processSectionTitle: "How I Work",
  audiencesSectionTitle: "Who I Can Help",
  finalCtaTitle: "Have a project in mind?",
  finalCtaText:
    "Whether you need a website, digital design support, social media creatives, or e-commerce assistance, I can help you build a stronger online presence."
};

export const contactPageContent: ContactPageContent = {
  heroBadge: "Contact",
  heroTitle: "Let’s build something meaningful together.",
  heroSubtitle:
    "Whether you need a website, web application, brand visuals, e-commerce support, or social media content, I’m open to freelance work, collaborations, and opportunities.",
  emailDisplayText: "hello@nadunpeiris.com",
  emailAddress: "hello@nadunpeiris.com",
  whatsappDisplayText: "+94 77 000 0000",
  whatsappNumber: "+94 77 000 0000",
  whatsappLink: "https://wa.me/94770000000",
  locationTitle: "Based in Sri Lanka",
  locationDescription: "Available for local and remote freelance projects.",
  contactFormHeading: "Leave a message",
  mapCardTitle: "Sri Lanka",
  availabilityText: "Remote & freelance available",
  finalCtaTitle: "Ready to start?",
  finalCtaText:
    "Send me a message with your idea, and I’ll help you shape it into a clean, professional digital experience.",
  showContactForm: true,
  showMapCard: true,
  showWhatsAppCard: true
};

export const adminProjects: AdminProject[] = [
  {
    id: "proj-eventify",
    title: "Eventify",
    slug: "eventify",
    category: "Full-Stack Systems",
    shortDescription: "Student event publishing and registration platform.",
    fullDescription: "A university club event platform that helps clubs manage event publishing, student registrations, and internal approvals with a clean multi-role workflow.",
    problem: "Student organizations needed a central place to publish events and manage participant interest without relying on scattered forms and chats.",
    solution: "Built a full-stack event workflow with role-based dashboards, event approval states, and registration tracking.",
    result: "Reduced manual coordination for campus events and gave organizers a single operational dashboard.",
    techStack: ["Next.js", "Node.js", "MongoDB", "JWT"],
    featuredImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    liveUrl: "https://example.com/eventify",
    githubUrl: "https://github.com/example/eventify",
    status: "Published",
    featured: true,
    showOnHome: true,
    showOnWorkPage: true,
    updatedAt: "2026-05-21"
  },
  {
    id: "proj-autoflash",
    title: "AutoFlash",
    slug: "autoflash",
    category: "Web Development",
    shortDescription: "Vehicle service booking and quotation workflow.",
    fullDescription: "A service booking system for vehicle care, including OTP login, date controls, service categories, quotation requests, and admin follow-up tools.",
    problem: "Customers needed a reliable way to request and manage service appointments without repeated phone calls.",
    solution: "Designed a structured booking flow with guided service selection, availability logic, and quote handling.",
    result: "Improved booking clarity and made the service desk process easier to manage operationally.",
    techStack: ["Next.js", "API Routes", "MongoDB", "PayHere"],
    featuredImageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    liveUrl: "https://example.com/autoflash",
    githubUrl: "https://github.com/example/autoflash",
    status: "Published",
    featured: true,
    showOnHome: true,
    showOnWorkPage: true,
    updatedAt: "2026-05-19"
  },
  {
    id: "proj-monsoon-lanka-tours",
    title: "Monsoon Lanka Tours",
    slug: "monsoon-lanka-tours",
    category: "Web Development",
    shortDescription: "Travel agency site for inquiry-led Sri Lanka tours.",
    fullDescription: "A travel website built for an agency targeting international tourists, with modern layout structure, clear package content, and inquiry-ready calls to action.",
    problem: "The brand needed a more polished online presence to build trust with international travelers.",
    solution: "Created a conversion-focused website structure with premium visuals, clear destinations, and straightforward inquiry paths.",
    result: "Improved the presentation of tours and made the business easier to discover and contact online.",
    techStack: ["WordPress", "Travel Website", "UI Content"],
    featuredImageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    liveUrl: "https://example.com/monsoon-lanka-tours",
    githubUrl: "",
    status: "Published",
    featured: false,
    showOnHome: false,
    showOnWorkPage: true,
    updatedAt: "2026-05-18"
  },
  {
    id: "proj-blanche-global",
    title: "Blanche Global",
    slug: "blanche-global",
    category: "E-commerce",
    shortDescription: "Shopify operational support and digital store coordination.",
    fullDescription: "A commerce operations workflow built around Shopify store updates, visual merchandising, promotional assets, and point-of-sale support.",
    problem: "The brand needed day-to-day product, campaign, and storefront support that aligned with its premium identity.",
    solution: "Handled structured product uploads, collection maintenance, promotional design work, and coordinated campaign publishing.",
    result: "Kept store presentation consistent and improved the speed of merchandising and launch tasks.",
    techStack: ["Shopify", "POS Pro", "Product Uploads"],
    featuredImageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    liveUrl: "https://example.com/blanche-global",
    githubUrl: "",
    status: "Draft",
    featured: false,
    showOnHome: false,
    showOnWorkPage: true,
    updatedAt: "2026-05-17"
  }
];

export const adminDesignWorks: AdminDesignWork[] = [
  {
    id: "design-luxe-skincare",
    title: "Luxe Skincare Launch Visuals",
    slug: "luxe-skincare-launch-visuals",
    category: "Graphic Design",
    brandClient: "Velora Beauty",
    description: "Premium product launch creatives built for social ads, story formats, and website hero sections.",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    toolsUsed: ["Photoshop", "Illustrator", "Figma"],
    status: "Published",
    featured: true,
    showOnHome: true,
    showOnWorkPage: true,
    updatedAt: "2026-05-20"
  },
  {
    id: "design-fashion-campaign",
    title: "Seasonal Fashion Campaign Kit",
    slug: "seasonal-fashion-campaign-kit",
    category: "Social Media",
    brandClient: "Blanche Global",
    description: "Campaign-ready fashion visuals for product drops, stories, sale banners, and feed content.",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    toolsUsed: ["Photoshop", "Lightroom"],
    status: "Published",
    featured: true,
    showOnHome: true,
    showOnWorkPage: true,
    updatedAt: "2026-05-18"
  },
  {
    id: "design-ui-concepts",
    title: "Creative Brand Visuals",
    slug: "creative-brand-visuals",
    category: "UI Design",
    brandClient: "Internal Showcase",
    description: "A selection of social media posts, product promotions, campaign visuals, and interface concepts.",
    imageUrl: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28",
    toolsUsed: ["Figma", "Illustrator", "Photoshop"],
    status: "Draft",
    featured: false,
    showOnHome: false,
    showOnWorkPage: true,
    updatedAt: "2026-05-16"
  }
];

export const adminServices: AdminService[] = [
  {
    id: "service-websites-web-apps",
    title: "Websites & Web Apps",
    slug: "websites-web-apps",
    iconName: "TerminalSquare",
    shortDescription: "Modern portfolio sites, business websites, dashboards, booking systems, and custom web experiences.",
    fullDescription: "Modern portfolio sites, business websites, dashboards, booking systems, and custom web applications built with clean design and scalable code.",
    bulletPoints: ["Portfolio and business websites", "Landing pages", "Admin dashboards", "Booking systems", "Full-stack web apps", "Responsive UI development"],
    status: "Published",
    featured: true,
    showOnHome: true,
    showOnServicesPage: true,
    updatedAt: "2026-05-21"
  },
  {
    id: "service-brand-social-content",
    title: "Brand & Social Content",
    slug: "brand-social-content",
    iconName: "Layers3",
    shortDescription: "Creative visual content for social, product promotions, campaigns, and brand direction.",
    fullDescription: "Creative visual content designed to help brands look professional, consistent, and engaging across digital platforms.",
    bulletPoints: ["Social media post designs", "Campaign visuals", "Product promotion creatives", "Brand layouts", "Ad creative concepts", "Content direction"],
    status: "Published",
    featured: true,
    showOnHome: true,
    showOnServicesPage: true,
    updatedAt: "2026-05-20"
  },
  {
    id: "service-ecommerce-support",
    title: "E-commerce Support",
    slug: "ecommerce-support",
    iconName: "ShoppingBag",
    shortDescription: "Operational support for Shopify and WordPress stores.",
    fullDescription: "Support for Shopify and WordPress stores, including product handling, content updates, maintenance, and digital operations.",
    bulletPoints: ["Shopify product uploads", "WordPress content updates", "Store maintenance", "Product page improvements", "Banner and collection updates", "E-commerce workflow support"],
    status: "Draft",
    featured: false,
    showOnHome: true,
    showOnServicesPage: true,
    updatedAt: "2026-05-18"
  },
  {
    id: "service-ui-digital-design",
    title: "UI & Digital Design",
    slug: "ui-digital-design",
    iconName: "LayoutGrid",
    shortDescription: "Interface design for websites, dashboards, mobile screens, and product concepts.",
    fullDescription: "Clean and modern interface designs for websites, dashboards, mobile screens, and digital product experiences.",
    bulletPoints: ["Website UI layouts", "Dashboard UI", "Mobile app screen concepts", "Design systems", "Wireframes", "User-focused layouts"],
    status: "Published",
    featured: false,
    showOnHome: false,
    showOnServicesPage: true,
    updatedAt: "2026-05-17"
  }
];

export const adminTestimonials: AdminTestimonial[] = [
  {
    id: "testimonial-001",
    name: "Ayesha Fernando",
    role: "Founder",
    company: "Studio North",
    quote: "The work felt premium from both the design and development side. Communication was clear and the final delivery was polished.",
    status: "Published",
    featured: true,
    updatedAt: "2026-05-22"
  },
  {
    id: "testimonial-002",
    name: "Nimal Perera",
    role: "Store Manager",
    company: "Blanche Global",
    quote: "Reliable support on product uploads, campaigns, and storefront updates made a real difference to our internal workflow.",
    status: "Draft",
    featured: false,
    updatedAt: "2026-05-20"
  }
];

export const adminBlogPosts: AdminBlogPost[] = [
  {
    id: "blog-001",
    title: "Designing better portfolio websites for creative professionals",
    slug: "designing-better-portfolio-websites",
    excerpt: "Thoughts on balancing strong visual presentation with useful content structure in portfolio projects.",
    category: "Design",
    status: "Draft",
    updatedAt: "2026-05-23"
  },
  {
    id: "blog-002",
    title: "What makes a practical small-business website work",
    slug: "practical-small-business-website-principles",
    excerpt: "A breakdown of content clarity, speed, trust signals, and responsive presentation for client websites.",
    category: "Development",
    status: "Draft",
    updatedAt: "2026-05-21"
  }
];

export const contactMessages: ContactMessage[] = [
  {
    id: "msg-001",
    name: "Ayesha Fernando",
    email: "ayesha@example.com",
    subject: "Portfolio website inquiry",
    preview: "Looking for a premium portfolio rebuild for my brand studio.",
    message: "Hi, I’m looking for a premium portfolio rebuild for my brand studio. I want something cleaner, more editorial, and easier to update. Can you help with both design and development?",
    status: "New",
    receivedAt: "2026-05-23 09:15"
  },
  {
    id: "msg-002",
    name: "Nimal Perera",
    email: "nimal@example.com",
    subject: "E-commerce support package",
    preview: "Need help with product uploads and Shopify campaign visuals.",
    message: "We need help with product uploads, campaign graphics, and storefront updates for an upcoming launch. Looking for ongoing support, not a one-time task.",
    status: "Read",
    receivedAt: "2026-05-22 17:40"
  },
  {
    id: "msg-003",
    name: "Sana Rahman",
    email: "sana@example.com",
    subject: "UI design collaboration",
    preview: "Interested in working together on a SaaS landing page redesign.",
    message: "I’m interested in collaborating on a SaaS landing page redesign. The brand direction is already there, but the interface and content flow need significant improvement.",
    status: "Replied",
    receivedAt: "2026-05-22 11:05"
  }
];

export const adminMediaItems: AdminMediaItem[] = [
  {
    id: "media-001",
    title: "Eventify dashboard preview",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    usedIn: "Project",
    updatedAt: "2026-05-21"
  },
  {
    id: "media-002",
    title: "Skincare product campaign visual",
    url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    usedIn: "Design Work",
    updatedAt: "2026-05-20"
  },
  {
    id: "media-003",
    title: "Contact page availability card",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    usedIn: "Page",
    updatedAt: "2026-05-18"
  },
  {
    id: "media-004",
    title: "Services hero background",
    url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    usedIn: "Page",
    updatedAt: "2026-05-17"
  }
];

export const recentActivity: RecentActivityItem[] = [
  {
    id: "activity-001",
    title: "Home page draft refreshed",
    description: "Hero copy and final CTA text were updated in the mock home page editor content.",
    time: "1 hour ago"
  },
  {
    id: "activity-002",
    title: "New message received",
    description: "A fresh portfolio inquiry arrived from Ayesha Fernando through the contact form.",
    time: "Today"
  },
  {
    id: "activity-003",
    title: "Work page selection reviewed",
    description: "Featured project visibility was adjusted for the work page showcase.",
    time: "Yesterday"
  },
  {
    id: "activity-004",
    title: "Media asset added",
    description: "A new project preview image was added to the media library mock set.",
    time: "2 days ago"
  }
];

export const siteSettings: SiteSettings = {
  siteName: "Nadun Peiris Portfolio",
  tagline: "Creative developer building premium digital experiences.",
  logoUrl: "https://example.com/logo.svg",
  faviconUrl: "https://example.com/favicon.png",
  fullName: "Nadun Peiris",
  professionalTitle: "Creative Full-Stack Developer",
  shortBio: "Full-stack developer, designer, freelancer, and digital creative helping brands build polished online experiences.",
  location: "Sri Lanka",
  email: "hello@nadunpeiris.com",
  whatsapp: "+94 77 000 0000",
  phone: "+94 77 000 0000",
  linkedIn: "https://www.linkedin.com/in/nadunpeiris",
  github: "https://github.com/nadunpeiris",
  instagram: "https://www.instagram.com/nadunpeiris",
  behance: "https://www.behance.net/nadunpeiris",
  cvUrl: "https://example.com/nadun-peiris-cv.pdf",
  defaultMetaTitle: "Nadun Peiris | Creative Full-Stack Developer",
  defaultMetaDescription: "Portfolio of Nadun Peiris — code, design, digital brand work, and modern portfolio experiences.",
  defaultOgImageUrl: "https://example.com/og-image.jpg",
  darkModeEnabled: true,
  dashboardCompactMode: false
};
