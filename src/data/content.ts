export type Lang = 'th' | 'en'

export interface MediaSlot {
  // path to a file in /public — e.g. '/projects/hayday-1.jpg' or
  // '/projects/hayday-1.mp4'. Used by both the Projects cards and the
  // Marquee (same 3 files, reused in both places).
  src: string
  // shown instead if the file at `src` doesn't exist yet / fails to load
  fallbackColor: string
}

export interface Project {
  id: string
  order: string
  type: { th: string; en: string }
  title: { th: string; en: string }
  description: { th: string; en: string }
  role: { th: string; en: string }
  technologies: string[]
  challenge: { th: string; en: string }
  result: { th: string; en: string }
  liveUrl: string
  githubUrl: string
  // 4 media slots, arranged as a 2x2 grid — each can be a photo OR a video,
  // just point `src` at whichever file you actually have (.jpg/.png/.webp
  // for photos, .mp4/.webm/.mov for video). Until a real file exists at
  // that path, fallbackColor is shown instead — nothing breaks.
  media: [MediaSlot, MediaSlot, MediaSlot, MediaSlot]
}

export interface ExperienceItem {
  role: { th: string; en: string }
  org: { th: string; en: string }
  period: { th: string; en: string }
  summary: { th: string; en: string }
  outcome: { th: string; en: string }
}

export interface EducationItem {
  school: { th: string; en: string }
  field: { th: string; en: string }
  period: { th: string; en: string }
}

// ---- shared / bilingual data ---------------------------------------------

export const projects: Project[] = [
  // liveUrl / githubUrl are left as '#' on purpose — fill in your real
  // deployed link and repo link for each project once you have them.
  {
    id: 'hayday',
    order: '01',
    type: { th: 'ส่วนตัว', en: 'Personal' },
    title: { th: 'ระบบสั่งซื้อไอเทม Hay Day', en: 'Hay Day Item Ordering System' },
    description: {
      th: 'เว็บแอปสำหรับสั่งซื้อไอเทมในเกม Hay Day มีระบบแอดมินจัดการออเดอร์และสต๊อก พร้อมระบบชำระเงิน ทำขึ้นเพื่อแก้ปัญหาการจดออเดอร์ผ่านแชทที่จัดการยากและตกหล่นบ่อย',
      en: 'A web app for ordering in-game Hay Day items, with an admin panel for order/stock management and a payment flow — built to replace error-prone chat-based ordering.',
    },
    role: { th: 'ออกแบบและพัฒนาเว็บทั้งฝั่งหน้าบ้านและระบบแอดมิน', en: 'Designed and built both the customer-facing site and the admin system' },
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    challenge: {
      th: 'ต้องออกแบบ flow การสั่งซื้อและสถานะออเดอร์ให้ผู้ดูแลติดตามได้ง่าย ในขณะที่ลูกค้าใช้งานสะดวกบนมือถือ',
      en: 'Needed an order/status flow simple enough for an admin to track, while staying mobile-friendly for customers.',
    },
    result: {
      th: 'ช่วยรวมการจัดการออเดอร์และสต๊อกไว้ในระบบเดียว ลดความเสี่ยงออเดอร์ตกหล่น',
      en: 'Brought order and stock management into one system, cutting the risk of missed orders.',
    },
    liveUrl: 'https://hay-day-shop.vercel.app/',
    githubUrl: 'https://github.com/NEBRO00/Hay-Day-Shop',
    media: [
      { src: '/projects/hayday-1.jpg', fallbackColor: '#8B7CF6' },
      { src: '/projects/hayday-2.jpg', fallbackColor: '#5B8DEF' },
      { src: '/projects/hayday-3.jpg', fallbackColor: '#F2748C' },
      { src: '/projects/hayday-4.jpg', fallbackColor: '#F2A25C' },
    ],
  },
  {
    id: 'portfolio',
    order: '02',
    type: { th: 'ส่วนตัว', en: 'Personal' },
    title: { th: 'Portfolio เวอร์ชันแรก', en: 'First Portfolio Site' },
    description: {
      th: 'เว็บพอร์ตโฟลิโอเวอร์ชันแรกที่สร้างด้วยมือ ใช้ scroll-snap แบ่งเป็นหลาย section มีเมนูแบบ fixed, ปุ่มติดต่อแบบลอย และระบบ modal',
      en: 'An earlier hand-coded portfolio: a scroll-snap multi-section layout with fixed navigation, a floating contact button, and a modal system.',
    },
    role: { th: 'ออกแบบและเขียนโค้ดคนเดียวทั้งหมด', en: 'Designed and coded solo, end to end' },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    challenge: {
      th: 'เรียนรู้ scroll-snap, position: fixed และการทำ modal ที่ copy ลิงก์ได้ ไปพร้อมกับการสร้างจริง',
      en: 'Learned scroll-snap layouts, fixed positioning, and a copy-to-clipboard modal system while building for real.',
    },
    result: {
      th: 'ได้พื้นฐาน CSS ที่แน่นขึ้นมาก และกลายเป็นจุดเริ่มต้นของเว็บเวอร์ชันนี้',
      en: 'Built a much stronger CSS foundation — and became the starting point for this current site.',
    },
    liveUrl: '#',
    githubUrl: '#',
    media: [
      { src: '/projects/portfolio-1.jpg', fallbackColor: '#F2748C' },
      { src: '/projects/portfolio-2.jpg', fallbackColor: '#F2A25C' },
      { src: '/projects/portfolio-3.jpg', fallbackColor: '#8B7CF6' },
      { src: '/projects/portfolio-4.jpg', fallbackColor: '#5B8DEF' },
    ],
  },
  {
    id: 'uiux-freelance',
    order: '03',
    type: { th: 'ฟรีแลนซ์', en: 'Freelance' },
    title: { th: 'งานออกแบบ UI/UX ฟรีแลนซ์', en: 'Freelance UI/UX Design Work' },
    description: {
      th: 'รับออกแบบ UI/UX ให้ลูกค้าผ่านแพลตฟอร์ม Fastwork โดยออกแบบใน Figma ตั้งแต่ wireframe จนถึง high-fidelity mockup',
      en: 'Freelance UI/UX design work for clients via the Fastwork platform — Figma work from wireframes through to high-fidelity mockups.',
    },
    role: { th: 'นักออกแบบ UI/UX (ออกแบบอย่างเดียว ไม่รวมพัฒนา)', en: 'UI/UX designer (design-only scope, no development)' },
    technologies: ['Figma'],
    challenge: {
      th: 'ตีความความต้องการของลูกค้าที่หลากหลายให้ออกมาเป็นดีไซน์ที่ใช้งานได้จริงภายในเวลาจำกัด',
      en: 'Translating varied client briefs into usable designs within tight turnarounds.',
    },
    result: {
      th: 'ส่งมอบงานออกแบบให้ลูกค้าหลายรายบนแพลตฟอร์ม',
      en: 'Delivered design work to multiple clients on the platform.',
    },
    liveUrl: '#',
    githubUrl: '#',
    media: [
      { src: '/projects/uiux-freelance-1.jpg', fallbackColor: '#5B8DEF' },
      { src: '/projects/uiux-freelance-2.jpg', fallbackColor: '#8B7CF6' },
      { src: '/projects/uiux-freelance-3.jpg', fallbackColor: '#F2A25C' },
      { src: '/projects/uiux-freelance-4.jpg', fallbackColor: '#F2748C' },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    role: { th: 'ผู้ช่วยวิศวกรฝ่ายผลิต (ฝึกงาน)', en: 'Production Engineer Assistant (Internship)' },
    org: { th: 'SEWT-E, นครราชสีมา', en: 'SEWT-E, Nakhon Ratchasima' },
    period: { th: '4 เดือน', en: '4 months' },
    summary: {
      th: 'ร่วมพัฒนาโครงการปรับปรุงคุณภาพเครื่อง Airleak โดยใช้ PLC พร้อมดูแล ซ่อมบำรุง และสร้างเครื่องจักรในโรงงาน',
      en: 'Worked on an Airleak-machine quality-improvement project using PLC, plus maintaining, repairing, and building factory machinery.',
    },
    outcome: {
      th: 'ได้ประสบการณ์ตรงด้านระบบอัตโนมัติในโรงงานและการแก้ปัญหาหน้างานจริง',
      en: 'Gained hands-on experience with factory automation systems and real on-the-floor problem solving.',
    },
  },
]

export const education: EducationItem[] = [
  {
    school: { th: 'มหาวิทยาลัยเทคโนโลยีสุรนารี', en: 'Suranaree University of Technology' },
    field: { th: 'วิศวกรรมอิเล็กทรอนิกส์', en: 'Electronics Engineering' },
    period: { th: '', en: '' },
  },
]

export const skillGroups = [
  {
    number: '01',
    title: { th: 'Frontend Development', en: 'Frontend Development' },
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    number: '02',
    title: { th: 'UI Styling', en: 'UI Styling' },
    items: ['Tailwind CSS', 'CSS Animation', 'Responsive Design', 'Framer Motion'],
  },
  {
    number: '03',
    title: { th: 'Tools & Design', en: 'Tools & Design' },
    items: ['Figma', 'Git', 'GitHub'],
  },
]

// ---- contact / links -------------------------------------------------------
// edit these directly — they're used across the header, hero and footer.
export const links = {
  email: 'ne0002545@gmail.com',
  phone: '062-234-5413',
  line: 'nezama111',
  github: 'https://github.com/NEBRO00/Resume-Web',
  // Drop your resume PDF into /public as "resume.pdf" and the Download
  // Resume button will pick it up automatically — no code change needed.
  resumeUrl: '/resume.pdf',
}

// ---- hero portrait photos ---------------------------------------------------
// Drop your two photos straight into /public with these exact filenames and
// they'll show up automatically — no other code changes needed.
// - base: the photo shown normally (rendered with a pixel-mosaic overlay)
// - reveal: the photo that appears inside the cursor/touch circle
export const portrait = {
  base: '/portrait-1.jpg',
  reveal: '/portrait-2.jpg',
}

// ---- page copy, per language ----------------------------------------------

export interface PageCopy {
  nav: {
    about: string
    skills: string
    projects: string
    experience: string
    contact: string
  }
  hero: {
    greeting: string
    name: string
    role: string
    tagline: string
    status: string
    workPreference: string
    viewProjects: string
    downloadResume: string
    contactMe: string
  }
  about: {
    heading: string
    body: string
    workStatusLabel: string
    locationLabel: string
    workPrefLabel: string
    thaiLabel: string
    englishLabel: string
    location: string
    thaiLevel: string
    englishLevel: string
  }
  skills: {
    heading: string
  }
  experience: {
    heading: string
    educationHeading: string
    noExperienceNote: string
  }
  projects: {
    heading: string
    liveProject: string
    viewCode: string
  }
  contact: {
    heading: string
    subheading: string
    formName: string
    formEmail: string
    formMessage: string
    formSubmit: string
    formNotConnected: string
  }
  footer: {
    rights: string
  }
  langToggleLabel: string
}

export const content: Record<Lang, PageCopy> = {
  th: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "HI, I'M",
      name: 'KANPASUT',
      role: 'Frontend Developer',
      tagline: 'สร้างเว็บที่ทั้งใช้งานง่ายและรู้สึกมีชีวิต ด้วยรายละเอียดเล็ก ๆ ที่ตั้งใจ',
      status: 'Open to Work',
      workPreference: 'Hybrid',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
      contactMe: 'Contact Me',
    },
    about: {
      heading: 'About Me',
      body: 'ผมเน หรือ กัญจน์ภาสัตย์ นักพัฒนาเว็บฝั่ง Frontend ที่มีพื้นฐานวิศวกรรมอิเล็กทรอนิกส์ เริ่มต้นจากงานออกแบบ UI/UX ในฐานะฟรีแลนซ์ ก่อนจะลงลึกด้านการเขียนโค้ดอย่างจริงจัง ผมชอบงานที่ต้องคิดทั้งภาพรวมและรายละเอียดเล็ก ๆ ไปพร้อมกัน และเรียนรู้จากการลงมือทำโปรเจกต์จริงเสมอ',
      workStatusLabel: 'สถานะการทำงาน',
      locationLabel: 'Location',
      workPrefLabel: 'Work Preference',
      thaiLabel: 'ไทย',
      englishLabel: 'อังกฤษ',
      location: 'นครราชสีมา, ประเทศไทย',
      thaiLevel: 'เจ้าของภาษา',
      englishLevel: 'อ่านและเขียนได้ / กำลังพัฒนาการสนทนา',
    },
    skills: {
      heading: 'Skills',
    },
    experience: {
      heading: 'Experience',
      educationHeading: 'Education',
      noExperienceNote: 'ยังไม่มีประสบการณ์ทำงานสายตรง — ด้านล่างคือการฝึกงานและงานฟรีแลนซ์',
    },
    projects: {
      heading: 'Projects',
      liveProject: 'Live Project',
      viewCode: 'GitHub',
    },
    contact: {
      heading: 'Contact',
      subheading: 'มีโปรเจกต์ในใจ หรืออยากคุยเรื่องงาน ทักมาได้เลยครับ',
      formName: 'ชื่อ',
      formEmail: 'อีเมล',
      formMessage: 'ข้อความ',
      formSubmit: 'ส่งข้อความ',
      formNotConnected: 'ฟอร์มนี้ยังไม่ได้เชื่อมต่อระบบส่งข้อความ — เพิ่ม Formspree หรือ EmailJS ได้ใน src/components/Contact.tsx',
    },
    footer: {
      rights: 'สงวนลิขสิทธิ์',
    },
    langToggleLabel: 'เปลี่ยนภาษา',
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "HI, I'M",
      name: 'KANPASUT',
      role: 'Frontend Developer',
      tagline: 'Building interfaces that work cleanly and feel alive — one deliberate detail at a time.',
      status: 'Open to Work',
      workPreference: 'Hybrid',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
      contactMe: 'Contact Me',
    },
    about: {
      heading: 'About Me',
      body: "I'm Ne (Kanpasut) — a frontend developer with an electronics engineering background. I started out doing freelance UI/UX design before moving deeper into building things myself. I like work that asks for both the big picture and the small details, and I learn best by shipping real projects.",
      workStatusLabel: 'Work Status',
      locationLabel: 'Location',
      workPrefLabel: 'Work Preference',
      thaiLabel: 'Thai',
      englishLabel: 'English',
      location: 'Nakhon Ratchasima, Thailand',
      thaiLevel: 'Native',
      englishLevel: "Reading & writing okay, speaking is still a work in progress",
    },
    skills: {
      heading: 'Skills',
    },
    experience: {
      heading: 'Experience',
      educationHeading: 'Education',
      noExperienceNote: "No full-time frontend role yet — here's the internship and freelance work instead.",
    },
    projects: {
      heading: 'Projects',
      liveProject: 'Live Project',
      viewCode: 'GitHub',
    },
    contact: {
      heading: 'Contact',
      subheading: "Got a project in mind, or just want to talk shop? Reach out.",
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formSubmit: 'Send Message',
      formNotConnected: 'This form is not wired up to a backend yet — add Formspree or EmailJS in src/components/Contact.tsx',
    },
    footer: {
      rights: 'All rights reserved',
    },
    langToggleLabel: 'Switch language',
  },
}
