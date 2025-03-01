"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-[#0a2e0a]">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Grow Your Online Presence?</h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are connecting with their audience through Vraksh's beautiful bio links.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
              Claim Your Bio Link
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 w-full sm:w-auto"
            >
              View Templates
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

