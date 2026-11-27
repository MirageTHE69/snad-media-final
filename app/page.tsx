import { SoundProvider } from "@/components/SoundProvider";
import Splash from "@/components/Splash";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ride from "@/components/Ride";
import Clients from "@/components/Clients";
import Cinema from "@/components/Cinema";
import Acronym from "@/components/Acronym";
import Milestones from "@/components/Milestones";
import Studio from "@/components/Studio";
import Cast from "@/components/Cast";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Tiger from "@/components/Tiger";
import GlobalFx from "@/components/GlobalFx";

export default function Home() {
  return (
    <SoundProvider>
      <div data-root="" className="root">
        <Splash />
        <Nav />
        <main>
          <Hero />
          <div className="border-strip" aria-hidden="true" />
          <Ride />
          <Clients />
          <Cinema />
          <Acronym />
          <Milestones />
          <Studio />
          <Cast />
          <Contact />
        </main>
        <Footer />
        <Tiger />
        <GlobalFx />
      </div>
    </SoundProvider>
  );
}
