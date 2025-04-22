export type User = {
  _id: string;
  username: string;
  email: string;
  authProvider: string;
  providerId: string;
  imageUrl: string;
  description: string;
  authKey: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};

export type SocialIcon = {
  name: string;
  url: string;
  icon: string;
};

export type BranchItem = {
  _id: string;
  branchId: string;
  title: string;
  index: number;
  url: string;
  style: string;
  active: boolean;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Branch = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  socialIcons: SocialIcon[];
  items: BranchItem[];
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;

  //Template Fields
  templateId: string;
  backgroundImageUrl: string;
  titleColor: string;
  descriptionColor: string;
  linkTextColor: string;
  linkBorderSize: string;
  linkBackgroundColor: string;
  titleFont: string;
  descriptionFont: string;
  buttonTextFont: string;
  avatarRounded: string;
};

export interface TemplateConfig {
  name: string;
  subtitleClass: string;
  id: string;
  className: string;
  textClass: string;
  profileClass: string;
  linkClass: string;
  backgroundImage?: string;
  titleClass: string;
}

export const templateConfigs: TemplateConfig[] = [
  {
    id: "default",
    name: "Default",
    className: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-indigo-200",
    textClass: "text-gray-800",
    linkClass: "bg-white hover:bg-indigo-50 border border-indigo-200 rounded-xl shadow-sm",
    profileClass: "bg-indigo-500 text-white",
    titleClass: "text-gray-900 font-semibold",
    subtitleClass: "text-gray-600",
    backgroundImage: "/template-bg/bg-01.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    className: "bg-gradient-to-b from-gray-800 via-white to-gray-800 border-gray-200",
    textClass: "text-gray-700",
    linkClass:
      "backdrop-blur-sm border border-gray-300 hover:bg-gray-50 rounded-md shadow-sm",
    profileClass: "bg-gray-200 text-gray-800",
    titleClass: "text-gray-900 font-light",
    subtitleClass: "text-gray-500",
    backgroundImage: "/template-bg/bg-26.png",
  },
  {
    id: "gradient",
    name: "Gradient",
    className: "bg-gradient-to-br from-indigo-900 via-purple-500 to-pink-500 text-white",
    textClass: "text-white",
    linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/30 border border-white/40 text-white",
    titleClass: "text-white font-medium",
    subtitleClass: "text-white/90",
    backgroundImage: "/template-bg/bg-03.png",
  },
  {
    id: "dark",
    name: "Dark",
    className: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-gray-700",
    textClass: "text-white",
    linkClass:
      "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg shadow-sm",
    profileClass: "bg-gray-800 border border-gray-700 text-white",
    titleClass: "text-white font-bold",
    subtitleClass: "text-gray-300",
    backgroundImage: "/template-bg/bg-04.png",
  },
  {
    id: "rounded",
    name: "Rounded",
    className: "bg-gradient-to-br from-[#a2d2ff] via-[#bde0fe] to-[#ffafcc] border-[#ffc8dd]",
    textClass: "text-gray-900",
    linkClass: "bg-white hover:bg-[#ffc8dd]/20 rounded-full shadow-sm",
    profileClass: "bg-[#ffafcc] text-white",
    titleClass: "text-gray-900 font-semibold",
    subtitleClass: "text-gray-700",
    backgroundImage: "/template-bg/bg-05.png",
  },
  {
    id: "glass",
    name: "Glassmorphism",
    className: "bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl",
    textClass: "text-gray-900",
    linkClass: "bg-white/40 hover:bg-white/50 backdrop-blur-md rounded-xl shadow-sm",
    profileClass:
      "bg-white/40 backdrop-blur-md border border-white/50 text-gray-900",
    titleClass: "text-gray-900 font-medium",
    subtitleClass: "text-gray-700",
    backgroundImage: "/template-bg/bg-06.png",
  },
  {
    id: "neon",
    name: "Neon",
    className: "bg-black border bg-gradient-radial from-[#ff00e0] via-[#00fcff] to-[#000000] border-[#ff00e0]",
    textClass: "text-[#ff00e0]",
    linkClass:
      "bg-pink-500/10 hover:bg-pink-500/20 border border-[#ff00e0] rounded-lg shadow-sm",
    profileClass: "bg-[#ff00e0]/20 border border-[#ff00e0] text-[#ff00e0]",
    titleClass: "text-[#ff00e0] font-bold tracking-wide",
    subtitleClass: "text-[#ff00e0]/70",
    backgroundImage: "/template-bg/bg-07.png",
  },
  {
    id: "futuristic",
    name: "Futuristic",
    className: "bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white",
    textClass: "text-white",
    linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl shadow-sm",
    profileClass: "bg-white/30 border border-white/40 text-white",
    titleClass: "text-white font-extrabold uppercase tracking-widest",
    subtitleClass: "text-white/90",
    backgroundImage: "/template-bg/bg-08.png",
  },
  {
    id: "pastel",
    name: "Pastel",
    className: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300",
    textClass: "text-pink-800",
    linkClass: "bg-white hover:bg-pink-50 border border-pink-200 rounded-xl shadow-sm",
    profileClass: "bg-pink-300 text-white",
    titleClass: "text-pink-900 font-medium",
    subtitleClass: "text-pink-700",
    backgroundImage: "/template-bg/bg-05.png",
  },

  {
    id: "cyberpunk",
    name: "Cyberpunk",
    className: "bg-black bg-gradient-to-t from-[#00bbf9]/70 via-[#0f0]/40 to-[#ff006e]/70 text-[#0f0] border-[#0f0]",
    textClass: "text-[#0f0]",
    linkClass:
      "bg-[#0f0]/10 hover:bg-[#0f0]/20 border border-[#0f0] rounded-lg shadow-inner",
    profileClass: "bg-[#0f0]/20 border border-[#0f0] text-[#0f0]",
    titleClass: "text-[#0f0] font-extrabold uppercase",
    subtitleClass: "text-[#0f0]/70",
    backgroundImage: "/template-bg/bg-26.png",
  },
  {
    id: "vintage",
    name: "Vintage",
    className: "bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300",
    textClass: "text-amber-900",
    linkClass:
      "bg-white hover:bg-amber-50 border border-amber-200 rounded-xl shadow-sm",
    profileClass: "bg-amber-300 text-amber-900",
    titleClass: "text-amber-900 font-serif italic",
    subtitleClass: "text-amber-800",
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    className: "bg-gradient-to-br from-rose-300 via-pink-400 to-purple-500 border-pink-400",
    textClass: "text-white",
    linkClass: "bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/40 border border-white/50 text-white",
    titleClass: "text-white font-semibold",
    subtitleClass: "text-white/90",
  },
  {
    id: "wood",
    name: "Wood",
    className: "bg-gradient-to-br from-amber-700 to-amber-900 border-amber-950",
    textClass: "text-amber-100",
    linkClass: "bg-amber-800/60 hover:bg-amber-800/80 border border-amber-600 rounded-xl shadow-inner text-amber-100",
    profileClass: "bg-amber-600 text-amber-100",
    titleClass: "text-amber-100 font-bold",
    subtitleClass: "text-amber-200",
  },
  {
    id: "ocean",
    name: "Ocean",
    className: "bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-400 border-blue-700",
    textClass: "text-white",
    linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/30 border border-white/40 text-white",
    titleClass: "text-white font-medium",
    subtitleClass: "text-white/90",
  },
  {
    id: "retro",
    name: "Retro",
    className: "bg-gradient-to-br from-orange-300 to-amber-200 border-orange-500 shadow-md",
    textClass: "text-orange-900",
    linkClass:
      "bg-white hover:bg-orange-50 border border-orange-300 rounded-xl shadow-sm",
    profileClass: "bg-orange-400 text-white",
    titleClass: "text-orange-900 font-bold",
    subtitleClass: "text-orange-800",
  },
  {
    id: "holographic",
    name: "Holographic",
    className:
      "bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 text-white shadow-xl",
    textClass: "text-white",
    linkClass: "bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/40 border border-white/50 text-white",
    titleClass: "text-white font-extrabold",
    subtitleClass: "text-white/90",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    className: "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400 text-gray-900",
    textClass: "text-gray-700",
    linkClass: "bg-white hover:bg-gray-100 border border-gray-300 rounded-xl shadow-sm",
    profileClass: "bg-gray-700 text-white",
    titleClass: "text-gray-900 font-semibold",
    subtitleClass: "text-gray-600",
  },
  {
    id: "lava",
    name: "Lava",
    className: "bg-gradient-to-br from-red-700 via-orange-600 to-amber-500 text-white",
    textClass: "text-white",
    linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/30 border border-white/40 text-white",
    titleClass: "text-white font-bold uppercase",
    subtitleClass: "text-white/90",
    backgroundImage: "/template-bg/bg-28.png",
  },
  {
    id: "matrix",
    name: "Matrix",
    className: "bg-gradient-to-br from-gray-900 to-black border border-green-500 text-green-400",
    textClass: "text-green-400",
    linkClass:
      "bg-green-400/10 hover:bg-green-400/20 border border-green-400 rounded-lg shadow-inner",
    profileClass: "bg-green-400/20 border border-green-400 text-green-400",
    titleClass: "text-green-400 font-mono uppercase",
    subtitleClass: "text-green-400/80",
  },
  {
    id: "winter",
    name: "Winter",
    className: "bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 border-blue-300",
    textClass: "text-blue-900",
    linkClass: "bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-sm",
    profileClass: "bg-blue-400 text-white",
    titleClass: "text-blue-900 font-medium",
    subtitleClass: "text-blue-800",
    backgroundImage: "/template-bg/bg-25.png"
  },
  {
    id: "golden",
    name: "Golden",
    className: "bg-gradient-to-br from-amber-400 to-yellow-600 border-amber-700 text-white shadow-lg",
    textClass: "text-white",
    linkClass:
      "bg-white/20 hover:bg-white/30 border border-amber-300 rounded-xl shadow-sm",
    profileClass: "bg-amber-600 text-white",
    titleClass: "text-white font-bold uppercase",
    subtitleClass: "text-white/90",
  },
  {
    id: "metallic",
    name: "Metallic",
    className: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 text-white shadow-md",
    textClass: "text-white",
    linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/30 border border-white/40 text-white",
    titleClass: "text-white font-semibold",
    subtitleClass: "text-white/90",
    backgroundImage: "/template-bg/bg-23.png",
  },
  {
    id: "comic",
    name: "Comic",
    className: "bg-gradient-to-br from-yellow-200 to-yellow-300 border-black shadow-lg text-black",
    textClass: "text-black",
    linkClass: "bg-white hover:bg-yellow-100 border-2 border-black rounded-xl shadow-sm",
    profileClass: "bg-yellow-300 text-black border-2 border-black",
    titleClass: "text-black font-comic",
    subtitleClass: "text-gray-700",
  },
  {
    id: "gothic",
    name: "Gothic",
    className: "bg-gradient-to-b from-black via-red-700 to-black text-red-400 border-red-700",
    textClass: "text-red-400",
    linkClass:
      "bg-red-500/10 hover:bg-red-500/20 border border-red-500 rounded-lg shadow-inner",
    profileClass: "bg-red-500/20 border border-red-500 text-red-400",
    titleClass: "text-red-400 font-blackletter",
    subtitleClass: "text-red-500/80",
    backgroundImage: "/template-bg/bg-07.png",
  },
  {
    id: "sunset",
    name: "Sunset",
    className: "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400",
    textClass: "text-white",
    linkClass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg shadow-sm",
    profileClass: "bg-white/30 border border-white/40 text-white",
    titleClass: "text-white font-semibold",
    subtitleClass: "text-white/90",
    backgroundImage: "/template-bg/bg-19.png"
  },
  {
    id: "forest",
    name: "Forest",
    className: "bg-gradient-to-b from-green-900 via-emerald-500 to-green-900 border-green-700 text-white",
    textClass: "text-white",
    linkClass:
      "bg-white/20 hover:bg-white/30 border border-green-300 rounded-lg shadow-sm",
    profileClass: "bg-emerald-600/60 border border-emerald-300 text-white",
    titleClass: "text-white font-semibold uppercase",
    subtitleClass: "text-white/90",
    backgroundImage: "/template-bg/bg-18.png",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    className: "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 text-pink-100",
    textClass: "text-pink-100",
    linkClass:
      "bg-white/20 hover:bg-white/30 border border-pink-200 rounded-lg shadow-sm",
    profileClass: "bg-pink-200/30 border border-pink-200 text-pink-100",
    titleClass: "text-pink-100 font-mono uppercase tracking-widest",
    subtitleClass: "text-pink-200/90",
    backgroundImage: "/template-bg/bg-15.png",
  },
  {
    id: "royal",
    name: "Royal",
    className: "bg-gradient-to-br from-purple-900 to-indigo-800 border-amber-400 text-amber-300 shadow-xl",
    textClass: "text-amber-300",
    linkClass:
      "bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400 rounded-lg shadow-sm",
    profileClass: "bg-amber-400/20 border border-amber-400 text-amber-300",
    titleClass: "text-amber-300 font-serif font-bold uppercase",
    subtitleClass: "text-amber-300/80",
    backgroundImage: "/template-bg/bg-27.png",
  },
];