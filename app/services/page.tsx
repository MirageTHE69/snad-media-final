import type { Metadata } from "next";
import Link from "next/link";
import BazaarMap from "@/components/services/BazaarMap";
import RouteList from "@/components/services/RouteList";
import RideQuiz from "@/components/services/RideQuiz";
import Steps from "@/components/services/Steps";
import CtaBand from "@/components/services/CtaBand";
import { asset } from "@/lib/assets";
import { IMG, STEPS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services: The Bazaar",
  description: "Seven shops, one sorted bazaar. Media, brand, technology, research, identity, strategy and print from SNAD Media, Vadodara.",
};

export default function ServicesPage() {
  const map = asset("/img/pages/services/svc-map.webp");
  const parrot = asset("/img/pages/services/svc-quiz-parrot.webp");
  const icons = STEPS.map((_, i) => asset(IMG.step(i)));

  return (
    <main className="svc-page">
      <section className="svc-hero">
        <div className="svc-hero-text">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>Services</b></nav>
          <div className="pill pill-ink">The bazaar map</div>
          <h1 className="page-h1">Seven shops. <span className="red">One sorted bazaar.</span></h1>
          <p className="lead">Every service we offer has its own little shop on our street. Tap a pin to step inside, or scroll and we&apos;ll drive you past all seven.</p>
          <div className="hero-ctas-left">
            <a href="#route" className="btn btn-red btn-lg">Take the full ride ↓</a>
            <a href="#quiz" className="btn btn-yellow btn-lg">Help me choose</a>
          </div>
        </div>
        <div className="svc-hero-map" data-reveal="">
          <BazaarMap src={map} />
        </div>
      </section>
      <div className="border-strip" aria-hidden="true" />

      <section id="route" className="svc-route">
        <div className="center-head" data-reveal="">
          <div className="pill pill-yellow">The route</div>
          <h2 className="h2">Seven stops, <span className="red">one ride.</span></h2>
          <p className="lead">Hop on at any shop. Most brands visit two or three; the bold ones do the full loop.</p>
        </div>
        <RouteList />
      </section>

      <section id="quiz" className="svc-quiz">
        <div className="center-head" data-reveal="">
          <div className="pill pill-ink">Not sure which stop?</div>
          <h2 className="h2">Ask the <span className="yel">tota.</span></h2>
          <p className="lead lead-light">Our fortune-teller parrot has never been wrong. (Okay, once.)</p>
        </div>
        <RideQuiz parrot={parrot} />
      </section>

      <section className="svc-steps">
        <div className="center-head" data-reveal="">
          <div className="pill pill-red">Every ride, same promise</div>
          <h2 className="h2">How we <span className="red">drive.</span></h2>
        </div>
        <Steps icons={icons} signpost={null} variant="cards" />
      </section>

      <CtaBand title="Kahaan chalna hai?" accentText="Let’s go." line="Tell us where your brand needs to be. We’ll plan the route, you enjoy the ride." />
    </main>
  );
}
