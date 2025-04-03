import { Instagram, Twitter, Facebook, Youtube, Linkedin, Github, Globe } from "lucide-react"

// Custom Snapchat icon
export function Snapchat({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2c-2.8 0-5 2.2-5 5v3c0 .3-.3.7-.6.8s-.7.3-1 .4c-.5.2-.9.8-.9 1.3 0 1 1.1 1.5 2 1.7 0 .1-.1.2-.1.3-.2.5-.7 1-1.4 1s-.9-.5-.9-.5c-.3-.1-.5-.1-.7-.1-.4 0-.7.2-.7.5 0 .7 1.2 1.4 2.6 1.4.2 0 .4 0 .6-.1.5-.1 1 .1 1.3.5.1.1.2.2.3.3.2.2.6.5 1.2.5.7 0 1.3-.3 1.9-.6h.2c.6.3 1.2.6 1.9.6.6 0 1-.3 1.2-.5.1-.1.2-.2.3-.3.3-.4.8-.6 1.3-.5.2 0 .4.1.6.1 1.4 0 2.6-.7 2.6-1.4 0-.3-.3-.5-.7-.5-.2 0-.5 0-.7.1 0 0-.2.5-.9.5s-1.2-.5-1.4-1c0-.1-.1-.2-.1-.3.9-.2 2-.7 2-1.7 0-.5-.4-1.1-.9-1.3-.3-.1-.7-.2-1-.4-.3-.2-.6-.5-.6-.8V7c0-2.8-2.2-5-5-5Z" />
    </svg>
  )
}

// Custom TikTok icon
export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

export { Instagram, Twitter, Facebook, Youtube, Linkedin, Github, Globe }

