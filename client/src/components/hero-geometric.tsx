"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
function BranchLeaf({
  className,
  delay = 0,
  width = 100,
  height = 100,
  rotate = 0,
  gradient = "from-green-500/[0.15]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <svg
          viewBox="0 0 100 100"
          className={cn(
            "absolute inset-0",
            "drop-shadow-[0_8px_32px_rgba(34,197,94,0.2)]"
          )}
        >
          <path
            d="M50,0 C70,25 95,40 95,65 C95,85 75,100 50,100 C25,100 5,85 5,65 C5,40 30,25 50,0 Z"
            className={cn(
              "fill-gradient-to-r to-transparent",
              gradient,
              "stroke-green-600/[0.3] stroke-2"
            )}
          />
          <path
            d="M50,100 C50,100 50,50 50,0"
            className="fill-none stroke-green-600/[0.3] stroke-2"
            strokeDasharray="5,5"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function BranchPath({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
      className={cn("absolute", className)}
    >
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        className="absolute"
      >
        <motion.path
          d="M150,20 Q100,80 150,150 Q200,220 150,280"
          stroke="#4ade80"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M150,150 Q180,170 220,160"
          stroke="#4ade80"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.path
          d="M150,150 Q120,170 80,160"
          stroke="#4ade80"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
        />
      </svg>
    </motion.div>
  );
}

export default function HeroGeometric({
  badge = "✨ Introducing Vraksh 🌱",
  title1 = "Grow Your",
  title2 = "Digital Presence 🌱",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/[0.2] via-transparent to-emerald-100/[0.2] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <BranchLeaf
          delay={0.3}
          width={200}
          height={200}
          rotate={12}
          gradient="from-green-300/[0.2]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <BranchLeaf
          delay={0.5}
          width={180}
          height={180}
          rotate={-15}
          gradient="from-emerald-300/[0.2]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <BranchLeaf
          delay={0.4}
          width={150}
          height={150}
          rotate={-8}
          gradient="from-lime-300/[0.2]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <BranchLeaf
          delay={0.6}
          width={120}
          height={120}
          rotate={20}
          gradient="from-green-200/[0.2]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <BranchLeaf
          delay={0.7}
          width={100}
          height={100}
          rotate={-25}
          gradient="from-teal-300/[0.2]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />

        <BranchPath className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 border border-white/[.25] mb-8 md:mb-12"
          >
            <span className="text-sm text-white/60 tracking-wide ">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-600">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-800 to-teal-400",
                  "pacifico-regular"
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              One link to connect all your content, social profiles, and
              websites in a beautiful, customizable bio page.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <div className="flex justify-center items-center relative w-full sm:w-auto  max-w-md h-12 pl-4 pr-4 rounded-lg bg-white/5 border border-white/30">
              <span className="text-white/70 tracking-wide">vraksh.bio /</span>
              <input
                placeholder="username"
                className="min-w-18 ml-1 outline-none border-none text-white bg-transparent placeholder:text-white/50"
              />
            </div>

            <Button
              size="lg"
              className="cursor-pointer w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              Claim Your Bio Link
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e0a] via-transparent to-[#0a2e0a]/80 pointer-events-none" />
    </div>
  );
}
