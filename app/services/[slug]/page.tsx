import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopHero, Shelf, Proof, Faq, NextStop } from "@/components/services/Detail";
import Steps from "@/components/services/Steps";
import CtaBand from "@/components/services/CtaBand";
import { accent } from "@/lib/data";
import { asset } from "@/lib/assets";
import { DETAIL_SERVICES, IMG, STEPS, serviceBySlug, stopFor } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return DETAIL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = serviceBySlug(slug);
  if (!svc) return {};
  const stop = stopFor(svc);
  return { title: `${stop.name}: ${stop.service}`, description: `${svc.tagline} ${svc.intro}` };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = serviceBySlug(slug);
  if (!svc || !svc.detail) notFound();
  const stop = stopFor(svc);

  const interior = asset(IMG.interior(slug));
  const keeper = asset(IMG.keeper(slug));
  const items = svc.items.map((it) => asset(IMG.item(slug, it.key)));
  const icons = STEPS.map((_, i) => asset(IMG.step(i)));
  const signpost = asset("/img/pages/services/signpost.webp");

  return (
    <main
      className="svc-detail"
      style={{ ["--c" as string]: accent(stop), ["--ct" as string]: stop.badgeText } as React.CSSProperties}
    >
      <ShopHero svc={svc} stop={stop} interior={interior} />
      <div className="border-strip" aria-hidden="true" />
      <Shelf svc={svc} stop={stop} keeper={keeper} items={items} />
      <section className="howwe">
        <div className="center-head" data-reveal="">
          <div className="pill pill-ink">How we make it</div>
          <h2 className="h2">Four stops <span className="shop-accent-text">to sorted.</span></h2>
        </div>
        <Steps icons={icons} signpost={signpost} variant="signposts" />
      </section>
      <Proof svc={svc} />
      <Faq faqs={svc.faqs} />
      <NextStop svc={svc} />
      <CtaBand title={`Need ${stop.name}?`} accentText="Hop in." line={`Tell us what you need from ${stop.name.split(" ")[0] === "SNAD" ? "the Printing Press" : stop.name}. We'll come back with a plan, usually before your chai goes cold.`} />
    </main>
  );
}
