"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type React from "react"

function FloatingElement({
  className,
  delay = 0,
  children,
}: {
  className?: string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function ComponentShowcase() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a2e0a] to-[#0a1e0a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_80%)]" />

      <FloatingElement delay={0.2} className="left-[10%] top-[20%]">
        <Badge variant="secondary" className="bg-green-500/20 text-white border-green-500/30">
          New
        </Badge>
      </FloatingElement>
      <FloatingElement delay={0.4} className="right-[15%] top-[30%]">
        <Switch />
      </FloatingElement>
      <FloatingElement delay={0.6} className="left-[20%] bottom-[25%]">
        <Button variant="outline" size="sm" className="border-green-500/30 text-white">
          Follow
        </Button>
      </FloatingElement>

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Showcase Your Content</h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 max-w-md"
          >
            <div className="relative mx-auto w-[280px] h-[560px]">
              <div className="absolute inset-0 rounded-3xl border-8 border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden shadow-xl">
                <div className="p-4 bg-gradient-to-b from-green-900/80 to-green-800/50">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src="/placeholder.svg?height=80&width=80" alt="Profile" width={80} height={80} />
                    </div>
                  </div>
                  <h3 className="text-center text-white font-bold text-xl">@naturelover</h3>
                  <p className="text-center text-white/70 text-sm mt-1">Plant enthusiast & eco-blogger</p>
                </div>

                <div className="p-4 space-y-3">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                          stroke="#4ade80"
                          strokeWidth="2"
                        />
                        <path
                          d="M9 12l2 2 4-4"
                          stroke="#4ade80"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">My Blog</span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                          stroke="#4ade80"
                          strokeWidth="2"
                        />
                        <path
                          d="M9 12l2 2 4-4"
                          stroke="#4ade80"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">Instagram</span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                          stroke="#4ade80"
                          strokeWidth="2"
                        />
                        <path
                          d="M9 12l2 2 4-4"
                          stroke="#4ade80"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">YouTube Channel</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-1/2 max-w-md"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Customizable Bio Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70">
                  Create a beautiful, branded bio page that showcases all your content in one place.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">Custom domain support</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">Animated link effects</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">Nature-inspired themes</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">Detailed analytics</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">Create Your Bio Link</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

