import Hero from '@/components/sections/hero';
import Expeditions from '@/components/sections/expedition';
import About from '@/components/sections/about';
import Team from '@/components/sections/team';
import Gallery from '@/components/sections/gallery';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Expeditions />
      <About />
      <Team />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}