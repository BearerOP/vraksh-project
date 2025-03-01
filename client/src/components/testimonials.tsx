"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function AnimatedCircle({
  className,
  delay = 0,
  size = 100,
  gradient = "from-green-500/[0.15]",
}: {
  className?: string
  delay?: number
  size?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width: size, height: size }}
        className={cn(
          "rounded-full",
          "bg-gradient-to-r to-transparent",
          gradient,
          "backdrop-blur-[2px] border border-white/[0.15]",
          "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
        )}
      />
    </motion.div>
  )
}

const testimonials = [
  {
    quote:
      "Vraksh has completely transformed how I share my content online. The nature-inspired themes perfectly match my brand.",
    author: "Emma Green",
    role: "Environmental Blogger",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote: "I've tried many link-in-bio tools, but Vraksh stands out with its beautiful design and powerful analytics.",
    author: "Michael Rivers",
    role: "Digital Creator",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The animated link paths are such a unique touch. My followers love the experience of visiting my Vraksh page.",
    author: "Sophia Woods",
    role: "Social Media Influencer",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a1e0a] to-[#0a2e0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

      <AnimatedCircle delay={0.2} size={200} gradient="from-green-500/[0.1]" className="left-[-5%] top-[10%]" />
      <AnimatedCircle delay={0.4} size={150} gradient="from-emerald-500/[0.1]" className="right-[-2%] bottom-[20%]" />
      <AnimatedCircle delay={0.6} size={100} gradient="from-lime-500/[0.1]" className="left-[20%] bottom-[10%]" />

      <div className="container relative z-10 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10"
            >
              <p className="text-white/80 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

