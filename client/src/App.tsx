import './App.css'
import HeroGeometric from './components/hero-geometric'
import { FeaturesSection } from "@/components/features-section"
import { ComponentShowcase } from "@/components/component-showcase"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

function App() {
  return (
 <>
<main>
      <HeroGeometric />
      <FeaturesSection />
      <ComponentShowcase />
      <Testimonials />
      <CTASection />
    </main>
 </>
  )
}
export default App
