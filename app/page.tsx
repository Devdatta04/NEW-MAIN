"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Send,
  Sparkles,
  Terminal,
  X,
  GraduationCap,
  BriefcaseBusiness,
  Trophy,
  Award,
  CalendarDays,
  MapPin,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* =========================================================
   DATA
========================================================= */

const projects = [
  {
    number: "01",
    title: "FRIDAY AI",
    year: "2026",
    description:
      "A personal AI assistant built to understand natural commands, automate everyday tasks and create a more efficient desktop experience.",
    tags: ["Python", "AI", "Automation"],
    image: "/projects/friday-ai.png",
    accent: "from-cyan-400 via-blue-500 to-indigo-600",
  },
  {
    number: "02",
    title: "MediMate",
    year: "2026",
    description:
      "A modern health companion concept focused on making useful information easier to understand through a clean and approachable digital experience.",
    tags: ["React", "Tailwind CSS", "AI"],
    image: "/projects/medimate.png",
    accent: "from-violet-400 via-fuchsia-500 to-pink-600",
  },
  {
    number: "03",
    title: "Developer Portfolio",
    year: "2026",
    description:
      "A responsive personal portfolio designed around visual storytelling, interaction and a simple way to explore projects, skills and experience.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    image: "/projects/developer-portfolio.png",
    accent: "from-blue-400 via-indigo-500 to-violet-600",
  },
];

const skills = [
  {
    name: "React",
    logo: "/logos/react.svg",
  },
  {
    name: "Next.js",
    logo: "/logos/nextjs.svg",
  },
  {
    name: "TypeScript",
    logo: "/logos/typescript.svg",
  },
  {
    name: "JavaScript",
    logo: "/logos/javascript.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "/logos/tailwind.svg",
  },
  {
    name: "Python",
    logo: "/logos/python.svg",
  },
  {
    name: "Node.js",
    logo: "/logos/nodejs.svg",
  },
  {
    name: "Git",
    logo: "/logos/git.svg",
  },
  {
    name: "GitHub",
    logo: "/logos/github.svg",
  },
  {
    name: "Figma",
    logo: "/logos/figma.svg",
  },
  {
    name: "UI / UX",
    logo: "/logos/figma.svg",
  },
  {
    name: "WhatsApp API",
    logo: "/logos/whatsapp.svg",
  },
];

const certifications = [
  {
    number: "01",
    title: "Web Development",
    subtitle: "Web Development Certification",
    description:
      "Certification focused on web development concepts, modern development practices and building functional digital experiences.",
    image: "/certifications/web-development.png",
    type: "WEB / DEVELOPMENT",
  },
  {
    number: "02",
    title: "UI / UX Design",
    subtitle: "UI / UX Design Certification",
    description:
      "Certification representing practical learning around interface design, user experience and creating clear, usable digital products.",
    image: "/certifications/ui-ux.png",
    type: "DESIGN / EXPERIENCE",
  },
  {
    number: "03",
    title: "Programming",
    subtitle: "Programming / Technology Certification",
    description:
      "Certification highlighting programming and technology learning with a focus on problem solving and practical implementation.",
    image: "/certifications/programming.png",
    type: "PROGRAMMING / TECH",
  },
];

const experience = [
  {
    period: "Apr 2026",
    duration: "1 month",
    role: "Trainee",
    company: "AICTE",
    location: "India",
    description:
      "Participated in the Innovation, Design and Entrepreneurship (IDE) Bootcamp organized by AICTE in collaboration with Wadhwani Foundation and SBI Foundation at Guru Ghasidas Vishwavidyalaya.",
    logo: "/logos/aicte.svg",
  },
  {
    period: "Mar 2025 – Jun 2025",
    duration: "4 months",
    role: "Google Student Ambassador",
    company: "Inters",
    location: "India",
    description:
      "Worked as a Google Student Ambassador, contributing to student-focused technology activities and helping create awareness around digital learning and opportunities.",
    logo: "/logos/google.svg",
  },
  {
    period: "Feb 2023 – May 2023",
    duration: "4 months",
    role: "Web Designer",
    company: "Sumago Infotech Pvt. Ltd.",
    location: "Nashik · On-site",
    description:
      "Worked on web design and development tasks with a focus on creating practical, responsive and user-friendly digital experiences.",
    logo: "/logos/sumago.svg",
  },
];

const education = [
  {
    year: "Aug 2024 – Aug 2028",
    degree: "Bachelor of Technology",
    field: "Computer Software Engineering",
    institute:
      "Dr. Babasaheb Ambedkar Technological University (DBATU)",
    description:
      "Currently pursuing B.Tech in Computer Software Engineering with a focus on software development, programming and modern technology.",
    logo: "/logos/dbatu.svg",
  },
  {
    year: "Aug 2023 – May 2024",
    degree: "HSC",
    field: "Maharashtra State Board",
    institute:
      "Maharashtra State Board of Secondary and Higher Secondary Education",
    description: "Completed Higher Secondary Certificate with a grade of 69.00%.",
    logo: "/logos/msbshse.svg",
  },
];

const hackathons = [
  {
    number: "01",
    title: "Innovation, Design & Entrepreneurship Bootcamp",
    organization: "AICTE",
    year: "2026",
    description:
      "Participated in the IDE Bootcamp focused on innovation, design thinking, entrepreneurship and turning ideas into practical solutions.",
  },
  {
    number: "02",
    title: "Smart India Hackathon",
    organization: "Team / Hackathon",
    year: "2026",
    description:
      "Exploring problem-driven product development through technology, teamwork and practical software solutions.",
  },
];

const navItems = [
  "About",
  "Work",
  "Skills",
  "Certifications",
  "Experience",
  "Education",
  "Contact",
];

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const emptyForm: FormValues = {
  name: "",
  email: "",
  message: "",
};

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -70,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 70,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   MAIN
========================================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const [form, setForm] = useState<FormValues>(emptyForm);

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -120]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0]
  );

  /* =======================================================
     MOUSE
  ======================================================= */

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  /* =======================================================
     PROJECT SLIDER
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProject(
        (current) => (current + 1) % projects.length
      );
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  /* =======================================================
     ACTIVE SECTION
  ======================================================= */

  useEffect(() => {
    const ids = [
      "home",
      "about",
      "work",
      "skills",
      "certifications",
      "experience",
      "education",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          )[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  /* =======================================================
     EMAIL
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatus("sending");

    try {
      await emailjs.send(
        "service_05rn4pt",
        "template_1bozo3f",
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
          name: form.name,
          email: form.email,
          user_name: form.name,
          user_email: form.email,
        },
        {
          publicKey: "b0LiJdhoulVR95C8J",
        }
      );

      setForm(emptyForm);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white selection:bg-violet-400 selection:text-black">

      {/* =================================================
          CURSOR LIGHT
      ================================================= */}

      <motion.div
        className="pointer-events-none fixed z-[5] hidden h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[110px] lg:block"
        animate={{
          x: mouse.x,
          y: mouse.y,
        }}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 20,
        }}
      />

      {/* =================================================
          SCROLL PROGRESS
      ================================================= */}

      <motion.div
        style={{
          scaleX: progress,
        }}
        className="fixed left-0 top-0 z-[300] h-[3px] w-full origin-left bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400"
      />

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10">

        <div className="absolute inset-0 bg-[#050507]" />

        <motion.div
          animate={{
            x: [0, 100, -70, 0],
            y: [0, -70, 60, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-200px] top-[-180px] h-[650px] w-[650px] rounded-full bg-violet-600/[0.10] blur-[160px]"
        />

        <motion.div
          animate={{
            x: [0, -90, 80, 0],
            y: [0, 70, -60, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-300px] right-[-200px] h-[700px] w-[700px] rounded-full bg-blue-600/[0.09] blur-[170px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 40, -50, 0],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[40%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-400/[0.035] blur-[140px]"
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_5%,#050507_88%)]" />
      </div>

      {/* =================================================
          SIDE SOCIAL BAR
      ================================================= */}

      <div className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col gap-3 lg:flex">

        <SideSocial
          href="https://www.instagram.com/"
          label="Instagram"
          image="/logos/instagram.svg"
        />

        <SideSocial
          href="https://wa.me/"
          label="WhatsApp"
          image="/logos/whatsapp.svg"
        />

        <SideSocial
          href="https://github.com/"
          label="GitHub"
          image="/logos/github.svg"
        />

        <SideSocial
          href="https://www.linkedin.com/"
          label="LinkedIn"
          image="/logos/linkedin.svg"
        />
      </div>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 sm:px-6">

        <motion.nav
          initial={{
            opacity: 0,
            y: -25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/[0.09] bg-[#09090d]/75 px-5 py-3 shadow-2xl backdrop-blur-2xl"
        >

          <button
            onClick={() => scrollTo("home")}
            className="text-xl font-black tracking-[-0.08em]"
          >
            DEV
            <span className="text-violet-400">.</span>
          </button>

          <div className="hidden items-center gap-6 xl:gap-8 md:flex">

            {navItems.map((item) => {
              const id = item.toLowerCase();

              return (
                <button
                  key={item}
                  onClick={() => scrollTo(id)}
                  className={`relative text-xs transition ${
                    activeSection === id
                      ? "text-white"
                      : "text-white/35 hover:text-white"
                  }`}
                >
                  {item}

                  {activeSection === id && (
                    <motion.span
                      layoutId="navLine"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-violet-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">

            <a
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-violet-400/40 hover:text-white"
            >
              <FileText size={14} />
              Resume
            </a>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => scrollTo("contact")}
              className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black"
            >
              Let&apos;s Talk
            </motion.button>

          </div>

          <button
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            className="rounded-full border border-white/10 p-2 md:hidden"
          >
            {menuOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>

        </motion.nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[#09090d]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
            >

              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollTo(item.toLowerCase())
                  }
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/50 transition hover:bg-white/5 hover:text-violet-300"
                >
                  {item}
                </button>
              ))}

              <a
                href="/resume.pdf"
                target="_blank"
                className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-white/60"
              >
                <Download size={16} />
                Download Resume
              </a>

            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <motion.section
        id="home"
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
        className="relative flex min-h-screen items-center px-6 pb-20 pt-32"
      >

        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          {/* HERO CONTENT */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >

            <motion.div
              variants={fadeUp}
              className="mb-7 flex items-center gap-3"
            >

              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-violet-400/50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-violet-400" />
              </span>

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-violet-300">
                Available for opportunities
              </span>

            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs uppercase tracking-[0.45em] text-white/25"
            >
              Developer · Designer · Creator
            </motion.p>

            <div className="overflow-hidden">

              <motion.h1
                variants={fadeUp}
                className="text-[19vw] font-black leading-[0.76] tracking-[-0.1em] sm:text-8xl md:text-[125px] lg:text-[145px]"
              >
                DEV
                <span className="text-violet-400">.</span>
              </motion.h1>

            </div>

            <motion.h2
              variants={fadeUp}
              className="mt-9 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-white/85 sm:text-5xl md:text-6xl"
            >
              I build{" "}
              <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                digital experiences.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-base leading-8 text-white/40 md:text-lg"
            >
              Developer, designer and creative problem solver
              focused on modern websites, applications, AI
              projects and interactive digital products.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-4"
            >

              <MagneticButton
                onClick={() => scrollTo("work")}
              >
                Explore my work
                <ArrowUpRight size={18} />
              </MagneticButton>

              <a
                href="/resume.pdf"
                target="_blank"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-7 py-3.5 text-sm text-white/60 transition hover:border-violet-400/40 hover:text-white"
              >
                <Download size={17} />
                Resume
              </a>

            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-7"
            >

              <MiniStat
                value="03+"
                label="Projects"
              />

              <MiniStat
                value="10+"
                label="Technologies"
              />

              <MiniStat
                value="03+"
                label="Certifications"
              />

            </motion.div>

          </motion.div>

          {/* HERO PHOTO */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: 6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mx-auto hidden w-full max-w-[420px] lg:block"
          >

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-12 rounded-full border border-dashed border-violet-400/15"
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-20 rounded-full border border-dashed border-blue-400/10"
            />

            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-violet-500/20 blur-[100px]"
            />

            <motion.div
              whileHover={{
                rotateY: -5,
                rotateX: 5,
                y: -10,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 18,
              }}
              className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-3 shadow-[0_40px_120px_rgba(0,0,0,.6)] backdrop-blur-xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              <div className="relative overflow-hidden rounded-[2rem]">

                <img
                  src="/profile.png"
                  alt="Dev - Developer"
                  className="h-[540px] w-full object-cover object-center transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />

                <motion.div
                  animate={{
                    top: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 right-0 h-px bg-violet-400 shadow-[0_0_25px_rgba(167,139,250,.9)]"
                />

                <div className="absolute bottom-6 left-6">

                  <p className="text-xs uppercase tracking-[0.3em] text-violet-300">
                    DEV / 2026
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    Developer
                  </p>

                </div>

              </div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -right-7 top-20 rounded-2xl border border-white/10 bg-[#0b0b10]/90 px-4 py-3 shadow-xl backdrop-blur-xl"
              >

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs text-white/70">
                    ONLINE
                  </span>
                </div>

              </motion.div>

              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                }}
                className="absolute -bottom-5 -left-7 rounded-2xl border border-white/10 bg-[#0b0b10]/90 p-4 shadow-xl backdrop-blur-xl"
              >
                <Code2
                  size={24}
                  className="text-violet-400"
                />
              </motion.div>

            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.6,
          }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >

          <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">
            Scroll to explore
          </span>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ArrowDown
              size={16}
              className="text-violet-400"
            />
          </motion.div>

        </motion.div>

      </motion.section>

      {/* =================================================
          MARQUEE
      ================================================= */}

      <section className="overflow-hidden border-y border-white/[0.07] bg-white/[0.012] py-6">

        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max gap-12 whitespace-nowrap"
        >

          {[...skills, ...skills, ...skills, ...skills].map(
            (skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex items-center gap-12 text-xs uppercase tracking-[0.35em] text-white/20"
              >
                {skill.name}

                <span className="text-violet-400">
                  ✦
                </span>
              </div>
            )
          )}

        </motion.div>
      </section>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section
        id="about"
        className="relative px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              variants={fadeUp}
              className="mb-16 flex items-end justify-between"
            >

              <div>

                <p className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
                  01 / About
                </p>

                <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                  More than
                  <br />
                  <span className="text-white/20">
                    just code.
                  </span>
                </h2>

              </div>

              <Layers3
                size={45}
                className="hidden text-white/10 md:block"
              />

            </motion.div>

            <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">

              <motion.div
                variants={fadeLeft}
              >

                <div className="sticky top-32">

                  <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">

                    <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                      Developer
                    </p>

                    <div className="my-7 h-px bg-white/10" />

                    <p className="text-2xl font-semibold leading-relaxed">
                      Technology
                      <span className="text-violet-400">.</span>
                      <br />
                      Creativity
                      <span className="text-violet-400">.</span>
                      <br />
                      Design
                      <span className="text-violet-400">.</span>
                    </p>

                    <p className="mt-7 text-sm leading-7 text-white/35">
                      I enjoy combining development, design
                      and creative thinking to build digital
                      experiences that feel useful and
                      enjoyable to use.
                    </p>

                  </div>
                </div>

              </motion.div>

              <motion.div
                variants={fadeRight}
              >

                <h3 className="text-3xl font-medium leading-tight text-white/90 md:text-5xl">
                  Turning ideas into{" "}
                  <span className="text-white/25">
                    meaningful digital products.
                  </span>
                </h3>

                <p className="mt-9 max-w-3xl text-lg leading-9 text-white/40">
                  I like understanding how technology can
                  solve real problems. From building websites
                  and applications to experimenting with AI
                  and interface design, I am always learning
                  and trying to make the next project better
                  than the last one.
                </p>

                <div className="mt-14 grid gap-4 sm:grid-cols-3">

                  <FeatureCard
                    icon={Code2}
                    number="01"
                    label="Development"
                    title="Modern Web"
                  />

                  <FeatureCard
                    icon={Palette}
                    number="02"
                    label="Design"
                    title="UI / UX"
                  />

                  <FeatureCard
                    icon={Sparkles}
                    number="03"
                    label="Creative"
                    title="Experiences"
                  />

                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          WORK
      ================================================= */}

      <section
        id="work"
        className="relative px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={stagger}
          >

            <motion.div
              variants={fadeUp}
              className="mb-16"
            >

              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
                02 / Selected Work
              </p>

              <div className="flex items-end justify-between">

                <h2 className="max-w-3xl text-5xl font-black tracking-[-0.06em] md:text-7xl">
                  Things I&apos;ve
                  <br />
                  <span className="text-white/20">
                    built.
                  </span>
                </h2>

                <Terminal
                  size={50}
                  className="hidden text-white/10 md:block"
                />

              </div>

            </motion.div>

            {/* FEATURED PROJECT */}

            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
            >

              <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/[0.07] blur-[110px]" />

              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

                <div className="relative z-10 flex min-h-[540px] flex-col justify-between border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">

                  <div>

                    <div className="flex items-center justify-between">

                      <span className="text-xs uppercase tracking-[0.3em] text-violet-400">
                        Featured Project
                      </span>

                      <span className="text-sm text-white/20">
                        {projects[activeProject].number}
                      </span>

                    </div>

                    <AnimatePresence mode="wait">

                      <motion.div
                        key={activeProject}
                        initial={{
                          opacity: 0,
                          x: 35,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -35,
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                        className="mt-20"
                      >

                        <p className="text-xs text-white/20">
                          {projects[activeProject].year}
                        </p>

                        <h3 className="mt-4 text-5xl font-black tracking-[-0.05em] md:text-6xl">
                          {projects[activeProject].title}
                        </h3>

                        <p className="mt-7 max-w-lg text-base leading-8 text-white/40">
                          {projects[activeProject].description}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-2">

                          {projects[activeProject].tags.map(
                            (tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40"
                              >
                                {tag}
                              </span>
                            )
                          )}

                        </div>

                      </motion.div>

                    </AnimatePresence>

                  </div>

                  <div className="flex gap-2">

                    {projects.map(
                      (project, index) => (
                        <button
                          key={project.number}
                          onClick={() =>
                            setActiveProject(index)
                          }
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                        >

                          <motion.span
                            animate={{
                              width:
                                index === activeProject
                                  ? "100%"
                                  : "0%",
                            }}
                            transition={{
                              duration: 0.4,
                            }}
                            className="block h-full rounded-full bg-violet-400"
                          />

                        </button>
                      )
                    )}

                  </div>

                </div>

                {/* PROJECT IMAGE */}

                <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden bg-[#08080d] p-8 md:p-16">

                  <motion.div
                    animate={{
                      rotate: [0, 2, -2, 0],
                      y: [0, -7, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`relative aspect-[4/3] w-full max-w-xl rounded-3xl bg-gradient-to-br ${projects[activeProject].accent} p-[1px]`}
                  >

                    <div className="relative h-full overflow-hidden rounded-3xl bg-[#09090d]">

                      <img
                        src={projects[activeProject].image}
                        alt={projects[activeProject].title}
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="absolute bottom-5 right-5 rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl"
                      >

                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                          Project
                        </p>

                        <p className="mt-1 text-xl font-black text-violet-300">
                          {projects[activeProject].number}
                        </p>

                      </motion.div>

                    </div>

                  </motion.div>

                </div>

              </div>
            </motion.div>

            {/* PROJECT LIST */}

            <div className="mt-16 divide-y divide-white/10 border-y border-white/10">

              {projects.map(
                (project, index) => (
                  <motion.article
                    key={project.number}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      x: 8,
                    }}
                    onClick={() =>
                      setActiveProject(index)
                    }
                    className="group cursor-pointer py-10"
                  >

                    <div className="grid gap-6 md:grid-cols-[70px_1fr_1fr_auto] md:items-center">

                      <span className="text-sm text-white/20">
                        {project.number}
                      </span>

                      <h3 className="text-2xl font-bold transition group-hover:text-violet-400 md:text-3xl">
                        {project.title}
                      </h3>

                      <p className="max-w-lg text-sm leading-7 text-white/35">
                        {project.description}
                      </p>

                      <ArrowUpRight
                        size={24}
                        className="text-white/20 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-400"
                      />

                    </div>

                    <div className="mt-5 flex flex-wrap gap-2 md:ml-[70px]">

                      {project.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/25"
                          >
                            {tag}
                          </span>
                        )
                      )}

                    </div>

                  </motion.article>
                )
              )}

            </div>

          </motion.div>
        </div>
      </section>

      {/* =================================================
          SKILLS
      ================================================= */}

      <section
        id="skills"
        className="relative border-y border-white/[0.07] bg-white/[0.012] px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={stagger}
          >

            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400"
            >
              03 / Toolbox
            </motion.p>

            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">

              <motion.div variants={fadeLeft}>

                <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                  Skills that
                  <br />
                  <span className="text-white/20">
                    make things happen.
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-lg leading-8 text-white/35">
                  A growing collection of technologies,
                  tools and creative skills I use to turn
                  ideas into working digital experiences.
                </p>

              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              >

                {skills.map(
                  (skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={fadeUp}
                      whileHover={{
                        y: -8,
                        scale: 1.03,
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                    >

                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/[0.08] to-cyan-400/[0.04] opacity-0 transition duration-500 group-hover:opacity-100" />

                      <div className="relative">

                        <div className="flex items-center justify-between">

                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="h-7 w-7 object-contain opacity-60 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
                          />

                          <span className="text-[9px] text-white/15">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                        </div>

                        <p className="mt-7 text-sm font-medium text-white/60 transition group-hover:text-violet-300">
                          {skill.name}
                        </p>

                        <div className="mt-6 flex justify-end">
                          <ArrowUpRight
                            size={16}
                            className="text-white/10 transition group-hover:text-violet-400"
                          />
                        </div>

                      </div>

                    </motion.div>
                  )
                )}

              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          CERTIFICATIONS
      ================================================= */}

      <section
        id="certifications"
        className="relative px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={stagger}
          >

            <motion.div variants={fadeUp}>

              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
                04 / Certifications
              </p>

              <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                Learning,
                <br />
                <span className="text-white/20">
                  documented.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/35">
                A collection of certifications and learning
                milestones that represent the technologies,
                design skills and concepts I have explored.
              </p>

            </motion.div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">

              {certifications.map(
                (certificate, index) => (
                  <motion.article
                    key={certificate.number}
                    variants={fadeUp}
                    whileHover={{
                      y: -12,
                    }}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
                  >

                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0f]">

                      <img
                        src={certificate.image}
                        alt={certificate.subtitle}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-70" />

                      <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-xl">
                        {certificate.type}
                      </span>

                    </div>

                    <div className="p-7">

                      <div className="flex items-center justify-between">

                        <span className="text-xs text-white/20">
                          {certificate.number}
                        </span>

                        <Award
                          size={18}
                          className="text-violet-400"
                        />

                      </div>

                      <h3 className="mt-6 text-2xl font-bold">
                        {certificate.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/35">
                        {certificate.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

                        <span className="text-xs text-white/30">
                          Certification
                        </span>

                        <ExternalLink
                          size={16}
                          className="text-white/20 transition group-hover:text-violet-400"
                        />

                      </div>

                    </div>

                  </motion.article>
                )
              )}

            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          HACKATHON + BOOTCAMP
      ================================================= */}

      <section className="relative border-y border-white/[0.07] bg-white/[0.012] px-6 py-32 md:py-40">

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={stagger}
          >

            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
            >

              <div>

                <p className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
                  05 / Hackathon & Bootcamp
                </p>

                <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                  Build.
                  <br />
                  <span className="text-white/20">
                    Learn. Repeat.
                  </span>
                </h2>

              </div>

              <Trophy
                size={48}
                className="text-white/10"
              />

            </motion.div>

            <div className="mt-16 grid gap-5 md:grid-cols-2">

              {hackathons.map(
                (item) => (
                  <motion.article
                    key={item.number}
                    variants={fadeUp}
                    whileHover={{
                      y: -8,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-8"
                  >

                    <div className="absolute right-[-70px] top-[-70px] h-48 w-48 rounded-full bg-violet-500/[0.08] blur-[70px] transition duration-500 group-hover:bg-violet-500/[0.15]" />

                    <div className="relative">

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-white/20">
                          {item.number}
                        </span>

                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                          {item.year}
                        </span>

                      </div>

                      <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] text-violet-400">
                        <Trophy size={22} />
                      </div>

                      <p className="mt-7 text-xs uppercase tracking-[0.25em] text-violet-400">
                        {item.organization}
                      </p>

                      <h3 className="mt-3 text-2xl font-bold leading-tight">
                        {item.title}
                      </h3>

                      <p className="mt-5 text-sm leading-7 text-white/35">
                        {item.description}
                      </p>

                    </div>

                  </motion.article>
                )
              )}

            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          EXPERIENCE
      ================================================= */}

      <section
        id="experience"
        className="relative px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={stagger}
          >

            <motion.div variants={fadeUp}>

              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
                06 / Experience
              </p>

              <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                Where I&apos;ve
                <br />
                <span className="text-white/20">
                  been learning.
                </span>
              </h2>

            </motion.div>

            <div className="mt-16 border-y border-white/10">

              {experience.map(
                (item, index) => (
                  <motion.article
                    key={item.company}
                    variants={fadeUp}
                    className="group grid gap-8 border-b border-white/10 py-10 last:border-b-0 lg:grid-cols-[180px_70px_1fr_auto] lg:items-start"
                  >

                    <div>

                      <p className="text-sm font-medium text-white/70">
                        {item.period}
                      </p>

                      <p className="mt-1 text-xs text-white/25">
                        {item.duration}
                      </p>

                    </div>

                    <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] lg:flex">

                      <img
                        src={item.logo}
                        alt={item.company}
                        className="h-7 w-7 object-contain opacity-60"
                      />

                    </div>

                    <div>

                      <h3 className="text-2xl font-bold transition group-hover:text-violet-300 md:text-3xl">
                        {item.role}
                      </h3>

                      <p className="mt-2 text-sm font-medium text-white/50">
                        {item.company}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-white/25">

                        <MapPin size={13} />

                        {item.location}

                      </div>

                      <p className="mt-6 max-w-3xl text-sm leading-8 text-white/35">
                        {item.description}
                      </p>

                    </div>

                    <span className="text-xs text-white/15">
                      0{index + 1}
                    </span>

                  </motion.article>
                )
              )}

            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          EDUCATION
      ================================================= */}

      <section
        id="education"
        className="relative border-y border-white/[0.07] bg-white/[0.012] px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={stagger}
          >

            <motion.div variants={fadeUp}>

              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-violet-400">
                07 / Education
              </p>

              <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                Foundation
                <br />
                <span className="text-white/20">
                  matters.
                </span>
              </h2>

            </motion.div>

            <div className="mt-16 space-y-5">

              {education.map(
                (item, index) => (
                  <motion.article
                    key={item.institute}
                    variants={fadeUp}
                    whileHover={{
                      x: 8,
                    }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-9"
                  >

                    <div className="grid gap-7 md:grid-cols-[160px_70px_1fr_auto] md:items-start">

                      <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                          {item.year}
                        </p>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025]">

                        <img
                          src={item.logo}
                          alt={item.institute}
                          className="h-7 w-7 object-contain opacity-70"
                        />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold leading-tight md:text-2xl">
                          {item.institute}
                        </h3>

                        <p className="mt-2 text-sm text-white/50">
                          {item.degree} · {item.field}
                        </p>

                        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/35">
                          {item.description}
                        </p>

                      </div>

                      <GraduationCap
                        size={25}
                        className="text-white/15 transition group-hover:text-violet-400"
                      />

                    </div>

                  </motion.article>
                )
              )}

            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          CONTACT
      ================================================= */}

      <section
        id="contact"
        className="relative px-6 py-32 md:py-44"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={stagger}
            className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]"
          >

            <motion.div variants={fadeLeft}>

              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-violet-400">
                08 / Contact
              </p>

              <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
                Let&apos;s make
                <br />
                something
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  memorable.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-white/35">
                Have a project idea, collaboration opportunity,
                internship opportunity, or simply want to talk?
                Drop me a message.
              </p>

              <motion.a
                whileHover={{
                  x: 8,
                }}
                href="mailto:devdattabadgujar123@gmail.com"
                className="mt-10 flex w-fit items-center gap-3 text-white/60 transition hover:text-violet-400"
              >
                <Mail size={18} />
                devdattabadgujar123@gmail.com
              </motion.a>

              <div className="mt-8 flex gap-3">

                <SocialButton
                  href="mailto:devdattabadgujar123@gmail.com"
                  label="Email"
                >
                  <Mail size={18} />
                </SocialButton>

                <SocialButton
                  href="https://github.com/"
                  label="GitHub"
                >
                  <img
                    src="/logos/github.svg"
                    alt="GitHub"
                    className="h-5 w-5 object-contain"
                  />
                </SocialButton>

                <SocialButton
                  href="https://www.instagram.com/"
                  label="Instagram"
                >
                  <img
                    src="/logos/instagram.svg"
                    alt="Instagram"
                    className="h-5 w-5 object-contain"
                  />
                </SocialButton>

                <SocialButton
                  href="https://wa.me/"
                  label="WhatsApp"
                >
                  <img
                    src="/logos/whatsapp.svg"
                    alt="WhatsApp"
                    className="h-5 w-5 object-contain"
                  />
                </SocialButton>

                <SocialButton
                  href="https://www.linkedin.com/"
                  label="LinkedIn"
                >
                  <img
                    src="/logos/linkedin.svg"
                    alt="LinkedIn"
                    className="h-5 w-5 object-contain"
                  />
                </SocialButton>

              </div>

            </motion.div>

            {/* FORM */}

            <motion.form
              variants={fadeRight}
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl md:p-9"
            >

              <div className="absolute right-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-violet-500/[0.08] blur-[100px]" />

              <div className="relative space-y-6">

                <Field
                  label="Your Name"
                  value={form.name}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      name: value,
                    })
                  }
                  placeholder="Enter your name"
                />

                <Field
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      email: value,
                    })
                  }
                  placeholder="you@example.com"
                />

                <label className="block text-sm text-white/40">

                  Message

                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        message: event.target.value,
                      })
                    }
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition placeholder:text-white/15 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/5"
                  />

                </label>

                <motion.button
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:bg-violet-300 disabled:opacity-60"
                >

                  {status === "sending" ? (
                    <>
                      <motion.span
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-black border-t-transparent"
                      />

                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check size={18} />
                      Message Sent
                    </>
                  ) : (
                    <>
                      Send Message

                      <Send
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}

                </motion.button>

                <AnimatePresence mode="wait">

                  {status === "error" && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="text-center text-sm text-rose-400"
                    >
                      Couldn&apos;t send your message.
                      Please try again or email me directly.
                    </motion.p>
                  )}

                  {status === "success" && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="text-center text-sm text-emerald-400"
                    >
                      Thanks! I&apos;ll get back to you soon.
                    </motion.p>
                  )}

                </AnimatePresence>

              </div>
            </motion.form>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="px-6 pb-28">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#171124] via-[#0b0b12] to-[#07121a]"
        >

          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[130px]" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-violet-400/10"
          />

          <div className="relative px-6 py-20 text-center md:px-12 md:py-28">

            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/5 text-violet-400"
            >
              <Globe2 size={28} />
            </motion.div>

            <p className="text-xs uppercase tracking-[0.4em] text-violet-400">
              Open for ideas
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Have something
              <br />
              worth building?
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-8 text-white/35">
              Let&apos;s turn your idea into a digital
              experience people actually remember.
            </p>

            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="mt-9"
            >
              Start a conversation
              <ArrowRight size={18} />
            </MagneticButton>

          </div>
        </motion.div>
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-white/10 px-6 py-9">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-white/25 md:flex-row md:items-center">

          <div>

            <span className="font-black text-white">
              DEV
              <span className="text-violet-400">.</span>
            </span>

            <span className="ml-3">
              Building digital experiences.
            </span>

          </div>

          <div className="flex items-center gap-6">

            <button
              onClick={() => scrollTo("home")}
              className="transition hover:text-violet-400"
            >
              Back to top
            </button>

            <span>
              © {new Date().getFullYear()} Dev
            </span>

          </div>

        </div>
      </footer>

    </main>
  );
}

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.04,
        y: -3,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-bold text-black shadow-[0_15px_40px_rgba(255,255,255,.08)] transition hover:bg-violet-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/25">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon: Icon,
  number,
  label,
  title,
}: {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  number: string;
  label: string;
  title: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6"
    >

      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative">

        <div className="flex items-center justify-between">

          <Icon
            size={25}
            className="text-violet-400 transition group-hover:scale-110"
          />

          <span className="text-[10px] text-white/15">
            {number}
          </span>

        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/25">
          {label}
        </p>

        <p className="mt-2 font-semibold text-white/80">
          {title}
        </p>

      </div>
    </motion.div>
  );
}

/* =========================================================
   SOCIAL BUTTON
========================================================= */

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      whileHover={{
        y: -5,
        scale: 1.06,
      }}
      href={href}
      target={
        href.startsWith("mailto:")
          ? undefined
          : "_blank"
      }
      rel="noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/40 transition hover:border-violet-400 hover:text-violet-400"
    >
      {children}
    </motion.a>
  );
}

/* =========================================================
   SIDE SOCIAL
========================================================= */

function SideSocial({
  href,
  label,
  image,
}: {
  href: string;
  label: string;
  image: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{
        scale: 1.12,
        x: -4,
      }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0b0b10]/80 p-3 backdrop-blur-xl transition hover:border-violet-400/40"
    >
      <img
        src={image}
        alt={label}
        className="h-full w-full object-contain opacity-50 transition hover:opacity-100"
      />
    </motion.a>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block text-sm text-white/40">

      {label}

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition placeholder:text-white/15 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/5"
      />

    </label>
  );
}