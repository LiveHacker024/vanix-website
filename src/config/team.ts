export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  altText: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  responsibilities: string[];
  education: string[];
  certifications?: string[];
  experienceHighlights: string[];
  projectHighlights: string[];
  technicalTools: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "aarti-gurjar",
    name: "Aarti Gurjar",
    role: "Frontend Developer",
    badge: "Core Engineering",
    image: "/images/team/aarti-gurjar.jpeg",
    altText: "Aarti Gurjar — Frontend Developer at VANIX",
    shortBio:
      "Frontend developer with a strong foundation in computer applications (MCA & BCA), specializing in responsive user interfaces, structured web applications, and database management.",
    fullBio:
      "Aarti is a software and frontend developer dedicated to building responsive, accessible, and high-performance digital web applications. Combining her formal computer application background with hands-on development experience, she focuses on intuitive UI design, clean workflows, and database-backed functionality.",
    expertise: [
      "Frontend Development",
      "Database Management",
      "Web Applications",
      "UI Implementation",
    ],
    responsibilities: [
      "Frontend web development and responsive user interface implementation.",
      "Developing interactive client-facing web components and digital features.",
      "Database structure management and workflow integration.",
      "Ensuring cross-device responsiveness, usability, and clean functionality across VANIX platforms.",
    ],
    education: [
      "Master of Computer Applications (MCA — 4th Semester / Pursuing)",
      "Bachelor of Computer Applications (BCA, 2021 – 2023)",
    ],
    certifications: [
      "Web Development Certification",
      "Cyber Security and Ethical Hacking",
      "Resume Building",
    ],
    experienceHighlights: [
      "Internship at Cyber Natix (June 2025 – July 2025): Worked on front-end development, assisted in database management, and built real-world project modules.",
    ],
    projectHighlights: [
      "HR Portal: Developed a web-based human resources management system managing employee data, workflow processes, and usability.",
      "Vulnerability Report Form: Designed and built structured forms for security vulnerability reporting, data collection, and issue resolution tracking.",
    ],
    technicalTools: [
      "Front-End Development",
      "Database Management",
      "VS Code",
      "RSCIT",
      "Canva",
      "PowerPoint",
    ],
  },
  {
    id: "nitin-meel",
    name: "Nitin Meel",
    role: "Cybersecurity Analyst",
    badge: "Security & Systems",
    image: "/images/team/nitin-meel.jpeg",
    altText: "Nitin Meel — Cybersecurity Analyst at VANIX",
    shortBio:
      "Cybersecurity Analyst and Computer Science engineer with expertise in Web VAPT (OWASP Top 10), API security testing, network auditing, and Android application security.",
    fullBio:
      "Nitin is a certified Cybersecurity Analyst and B.Tech CSE engineer with extensive hands-on experience in vulnerability assessment and penetration testing (VAPT). He specializes in auditing web applications, REST/SOAP APIs, network perimeters, and mobile architectures to ensure bulletproof digital reliability.",
    expertise: [
      "Web Security (VAPT)",
      "OWASP Top 10 Assessment",
      "API Security Testing",
      "Android Security Auditing",
    ],
    responsibilities: [
      "Web application security testing and vulnerability assessments (VAPT).",
      "Auditing digital platforms for OWASP Top 10 flaws, authentication misconfigurations, and business logic flaws.",
      "REST and SOAP API security testing, rate limiting checks, and access control verification.",
      "Supporting secure digital architecture and technical system reliability across VANIX solutions.",
    ],
    education: [
      "B.Tech. in Computer Science and Engineering (2022 – 2025)",
      "Bachelor of Science (2019 – 2022)",
    ],
    certifications: [
      "CEH (EC-Council) Certified Ethical Hacker (March 2025)",
    ],
    experienceHighlights: [
      "Cyber Security Analyst at Secnic Consultancy Services Pvt. Ltd. (October 2025 – Present): Performing application and infrastructure security audits.",
      "Cyber Security Analyst at ASD Cybersecurity and Consultant (March 2025 – August 2025): Focused on vulnerability assessments, penetration testing, and security reports.",
    ],
    projectHighlights: [
      "Web Testing (VAPT): Identified OWASP Top 10 vulnerabilities, authentication flaws, and server misconfigurations using Burp Suite, OWASP ZAP, and Nikto.",
      "API Security Testing: Audited REST/SOAP APIs for authentication vulnerabilities, rate limiting constraints, and access control policies.",
      "Android Security Testing: Conducted static & dynamic analysis, reverse engineering, and insecure API assessment using MobSF, Jadx, APKTool, Frida, and ADB.",
    ],
    technicalTools: [
      "Burp Suite",
      "OWASP ZAP",
      "Wireshark",
      "Nmap",
      "Nessus",
      "Postman",
      "MobSF",
      "Frida",
      "Python",
    ],
  },
];
