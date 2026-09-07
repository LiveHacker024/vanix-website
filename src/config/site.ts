export interface NavItem {
  label: string;
  href: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanix360.com";

export const siteConfig = {
  name: "VANIX",
  tagline: "Digital Growth Partner",
  legalName: "VANIX Digital Growth Solutions",
  description:
    "VANIX turns traditional and offline businesses into powerful digital growth engines through custom websites, e-commerce, multi-marketplace dominance, local SEO, targeted advertising, WhatsApp commerce, and conversion systems.",
  url: siteUrl,
  ogImage: "/images/vanix-09.png",
  location: "Shamli, Uttar Pradesh - 247776, India",
  founder: {
    name: "Kunal Rajput",
    title: "Founder & Lead Technologist",
    role: "Junior Penetration Tester, Cybersecurity Professional & Creator",
    bio: "Kunal Rajput is a Junior Penetration Tester and B.Tech CSE student specializing in Web, API, and Android security. He has experience in VAPT and security testing and is also the founder of the HackWithKunal YouTube channel, where he simplifies complex ethical hacking concepts.",
    skills: [
      "Web & API Security Testing",
      "Vulnerability Assessment (VAPT)",
      "Android Reverse Engineering",
      "Ethical Hacking & Network Pentesting",
      "YouTube Content Creation & SEO",
      "Digital Branding & Media Production",
    ],
  },
  navItems: [
    { label: "Home", href: "/#hero" },
    { label: "Transformation", href: "/#transformation" },
    { label: "Journey", href: "/#journey" },
    { label: "Services", href: "/services" },
    { label: "Growth Engine", href: "/#growth-system" },
    { label: "How It Works", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Why VANIX", href: "/#why-vanix" },
    { label: "Contact", href: "/#contact" },
  ] as NavItem[],
  links: {
    whatsapp: "https://wa.me/919457727770?text=Hi%20VANIX%2C%20I%20would%20like%20to%20scale%20my%20business%20digitally.",
    email: "livehacker024@gmail.com",
    phone: "+91 9457727770",
    phoneRaw: "+919457727770",
    phoneDigits: "919457727770",
    linkedin: "https://linkedin.com/in/kunal-rajput-64b4002b4",
    youtube: "https://www.youtube.com/@HackWithKunal",
    youtubeHandle: "@HackWithKunal",
  },
};
