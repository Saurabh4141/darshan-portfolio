import Build from "@/components/Build";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Toolkit from "@/components/Toolkit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Build />
      <Experience />
      <Toolkit />
      <Education />
      <Contact />
    </>
  );
}
