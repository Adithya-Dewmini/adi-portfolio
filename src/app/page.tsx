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
      {pageContent.showFeaturedWork ? (
        <WorkSection items={projects} />
      ) : null}
      <DesignSection items={designWorks} />
      {pageContent.showFeaturedServices ? (
        <ServicesSection title={pageContent.featuredServicesSectionTitle} items={services} />
      ) : null}
      <ProcessSection />
      {pageContent.showAboutPreview ? <AboutSection text={pageContent.aboutPreviewText} /> : null}
      {pageContent.showFinalCta ? <ContactSection title={pageContent.finalCtaTitle} text={pageContent.finalCtaText} /> : null}
      <Footer />
    </main>
  );
}
