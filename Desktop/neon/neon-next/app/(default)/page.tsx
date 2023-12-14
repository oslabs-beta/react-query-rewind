export const metadata = {
  title: 'Home - Neon',
  description: 'Page description',
}

import Hero from '@/components/hero'
import PressLogos from '@/components/press-logos'
import Features from '@/components/features'
import Features02 from '@/components/features-02'
import Pricing from '@/components/pricing'
import Testimonials from '@/components/testimonials'
import Resources from '@/components/resources'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <PressLogos />
      <Features />
      <Features02 />
      <Pricing />
      <Testimonials />
      <Resources />
      <Cta />
    </>
  )
}
