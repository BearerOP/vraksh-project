"use client"

import { motion } from "framer-motion"
import { Palette, Zap, Layout, Link2, Share2, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

function AnimatedLeaf({
  className,
  delay = 0,
  size = 100,
  rotate = 0,
  gradient = "from-green-500/[0.15]",
}: {
  className?: string
  delay?: number
  size?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ width: size, height: size }}
        className="relative"
      >
        <svg viewBox="0 0 100 100" className={cn("absolute inset-0", "drop-shadow-[0_8px_32px_rgba(34,197,94,0.2)]")}>
          <path
            d="M50,0 C70,25 95,40 95,65 C95,85 75,100 50,100 C25,100 5,85 5,65 C5,40 30,25 50,0 Z"
            className={cn("fill-gradient-to-r to-transparent", gradient, "stroke-white/[0.15] stroke-2")}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

const features = [
  {
    icon: <Layout className="h-6 w-6" />,
    title: "Beautiful Templates",
    description: "Choose from dozens of stunning, customizable templates to showcase your content.",
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Unlimited Links",
    description: "Add as many links as you need to your social profiles, websites, and content.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Custom Themes",
    description: "Personalize your bio page with your brand colors, fonts, and imagery.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Optimized",
    description: "Your bio page looks perfect on any device, from smartphones to desktops.",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Track clicks, views, and engagement to optimize your online presence.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast Performance",
    description: "Lightning-fast loading times ensure visitors never have to wait.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#0a2e0a]">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] via-transparent to-emerald-500/[0.03]" />

      <AnimatedLeaf
        delay={0.2}
        size={200}
        rotate={15}
        gradient="from-green-500/[0.1]"
        className="left-[-5%] top-[10%]"
      />
      <AnimatedLeaf
        delay={0.4}
        size={150}
        rotate={-10}
        gradient="from-emerald-500/[0.1]"
        className="right-[-2%] bottom-[20%]"
      />

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Why Choose Vraksh?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10"
            >
              <div className="text-green-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

