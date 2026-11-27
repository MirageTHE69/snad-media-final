import Splash from "@/components/Splash";
import Hero from "@/components/Hero";
import Ride from "@/components/Ride";
import Clients from "@/components/Clients";
import Cinema from "@/components/Cinema";
import Acronym from "@/components/Acronym";
import Milestones from "@/components/Milestones";
import Studio from "@/components/Studio";
import Cast from "@/components/Cast";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Splash />
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
    </>
  );
}
