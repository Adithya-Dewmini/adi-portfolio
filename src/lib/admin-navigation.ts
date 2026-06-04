import {
  BriefcaseBusiness,
  FileImage,
  FilePenLine,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  MessageSquareMore,
  Newspaper,
  PanelsTopLeft,
  Settings2,
  ShieldCheck,
  Star,
  type LucideIcon
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }]
  },
  {
    title: "Pages",
    items: [
      { label: "Pages", href: "/admin/pages", icon: PanelsTopLeft },
      { label: "Home Page", href: "/admin/pages/home", icon: FilePenLine },
      { label: "Work Page", href: "/admin/pages/work", icon: FolderKanban },
      { label: "Services Page", href: "/admin/pages/services", icon: BriefcaseBusiness },
      { label: "Contact Page", href: "/admin/pages/contact", icon: MessageSquareMore }
    ]
  },
  {
    title: "Content",
    items: [
      { label: "Projects", href: "/admin/content/projects", icon: FolderKanban },
      { label: "Design Work", href: "/admin/content/design-work", icon: FileImage },
      { label: "Services", href: "/admin/content/services", icon: BriefcaseBusiness },
      { label: "Testimonials", href: "/admin/content/testimonials", icon: Star },
      { label: "Blog Posts", href: "/admin/content/blog-posts", icon: Newspaper }
    ]
  },
  {
    title: "Operations",
    items: [
      { label: "Messages", href: "/admin/messages", icon: MessageSquareMore },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
      { label: "Site Settings", href: "/admin/settings", icon: Settings2 }
    ]
  }
];

export const adminRouteMeta = [
  {
    href: "/admin/pages/home",
    title: "Home Page Editor",
    description: "Manage the home page hero, identity cards, preview sections, and final call to action."
  },
  {
    href: "/admin/pages/work",
    title: "Work Page Editor",
    description: "Edit work page copy, category structure, and which projects or design pieces appear on the page."
  },
  {
    href: "/admin/pages/services",
    title: "Services Page Editor",
    description: "Control the services page messaging, section headings, and which services are featured."
  },
  {
    href: "/admin/pages/contact",
    title: "Contact Page Editor",
    description: "Manage contact page content, availability messaging, and visibility of contact blocks."
  },
  {
    href: "/admin/content/projects",
    title: "Projects",
    description: "Manage development projects, case-study fields, page visibility, and publishing status."
  },
  {
    href: "/admin/content/design-work",
    title: "Design Work",
    description: "Organize design work entries, categories, visibility settings, and publishing status."
  },
  {
    href: "/admin/content/services",
    title: "Services",
    description: "Review service content, featured flags, ordering placeholders, and publication state."
  },
  {
    href: "/admin/content/testimonials",
    title: "Testimonials",
    description: "Manage client quotes, featured flags, and publishing visibility for testimonials."
  },
  {
    href: "/admin/content/blog-posts",
    title: "Blog Posts",
    description: "Prepare future content pieces, draft excerpts, categories, and publishing state."
  },
  {
    href: "/admin/messages",
    title: "Messages",
    description: "Review incoming portfolio inquiries, message status, and inbox actions."
  },
  {
    href: "/admin/media",
    title: "Media Library",
    description: "Browse mock media items, copy asset URLs, and track where visuals are used."
  },
  {
    href: "/admin/settings",
    title: "Site Settings",
    description: "Manage site identity, personal details, contact links, SEO defaults, and admin preferences."
  },
  {
    href: "/admin/pages",
    title: "Pages",
    description: "Manage the editable public pages, publishing state, and quick preview links."
  },
  {
    href: "/admin/dashboard",
    title: "Dashboard",
    description: "Track content totals, page publishing status, recent activity, and key admin actions."
  },
  {
    href: "/admin",
    title: "Dashboard",
    description: "Track content totals, page publishing status, recent activity, and key admin actions."
  }
];

