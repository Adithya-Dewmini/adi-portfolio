import { getHomePagePublicData } from "@/lib/cms";
import {
  AboutSection,
  ContactSection,
  DesignSection,
  Footer,
  Hero,
  Navbar,
  ProcessSection,
  ServicesSection,
  WorkSection
} from "@/components/sections";

export default async function Home() {
  const { pageContent, projects, services, designWorks, identityCards } = await getHomePagePublicData();

  return (
    <main>
      <Navbar />
      <div className="relative overflow-hidden bg-[#070A12]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[960px] bg-[radial-gradient(circle_at_76%_12%,rgba(139,92,246,0.2),transparent_34%),radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.14),transparent_34%),linear-gradient(180deg,rgba(7,10,18,0),rgba(7,10,18,0.86)_70%,#070A12_100%)]" />
        {pageContent.showHero ? (
          <Hero
            badge={pageContent.heroBadge}
            title={pageContent.heroTitle}
            subtitle={pageContent.heroSubtitle}
            primaryCtaText={pageContent.primaryCtaText}
            primaryCtaLink={pageContent.primaryCtaLink}
            secondaryCtaText={pageContent.secondaryCtaText}
            secondaryCtaLink={pageContent.secondaryCtaLink}
            identityCards={identityCards}
            showIdentityCards={pageContent.showIdentityCards}
          />
        ) : null}
        {pageContent.showAboutPreview ? <AboutSection /> : null}
      </div>
      {pageContent.showFeaturedWork ? (
        <WorkSection items={projects} />
      ) : null}
      <DesignSection items={designWorks} />
      {pageContent.showFeaturedServices ? (
        <ServicesSection title={pageContent.featuredServicesSectionTitle} items={services} />
      ) : null}
      <ProcessSection />
      {pageContent.showFinalCta ? <ContactSection title={pageContent.finalCtaTitle} text={pageContent.finalCtaText} /> : null}
      <Footer />
    </main>
  );
}
