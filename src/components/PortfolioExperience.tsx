'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail,
  MapPin, Menu, X, Code2, ExternalLink,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { profile, skillGroups, projects, interests } from '@/data/profile';
import styles from './PortfolioExperience.module.scss';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });
gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
  ['Experience', '#experience'], ['Education', '#education'], ['Contact', '#contact'],
];

export default function PortfolioExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.1 });
    lenis.on('scroll', ScrollTrigger.update);
    let raf = 0;
    const tick = (time: number) => { lenis.raf(time * 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    return () => { cancelAnimationFrame(raf); ScrollTrigger.removeEventListener('refresh', onRefresh); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro.from('.hero-kicker', { y: 18, opacity: 0, duration: 0.7 })
      .from('.hero-name-line', { yPercent: 110, opacity: 0, stagger: 0.12, duration: 1.05 }, '-=0.35')
      .from('.hero-meta, .hero-copy, .hero-actions', { y: 22, opacity: 0, stagger: 0.13, duration: 0.7 }, '-=0.45')
      .from('.hero-portrait', { opacity: 0, scale: 1.04, duration: 1.2 }, '-=1.1');

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.fromTo(element, { y: 36, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>('.project-row').forEach((element) => {
      gsap.from(element, { y: 35, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
    });
    ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({ trigger: section, start: 'top 40%', end: 'bottom 40%', onToggle: (self) => { if (self.isActive) setActive(id); } });
    });
  }, { scope: root });

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={root} className={styles.site}>
      <div className={styles.noise} aria-hidden="true" />
      <header className={styles.header}>
        <Link href="#home" className={styles.wordmark} aria-label="Monish Gowda S R — home">M<span>.</span></Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} className={active === href.slice(1) ? styles.navActive : ''}>{label}</a>)}
        </nav>
        <a className={styles.resumeButton} href={profile.resume} download aria-label="Download resume PDF">
          <span>RESUME</span><Download size={15} />
        </a>
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <div className={styles.mobileMenu}>
        <nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={17} /></a>)}
          <a href={profile.resume} download onClick={closeMenu}>Download resume <Download size={17} /></a>
        </nav><span>MONISH GOWDA S R · BENGALURU</span>
      </div>}

      <main>
        <section id="home" className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <HeroScene />
          <div className={styles.heroContent}>
            <p className={`${styles.kicker} hero-kicker`}><span>//</span> PORTFOLIO <i>2026</i></p>
            <div className={styles.nameWrap}>
              <h1><span className="hero-name-line">MONISH GOWDA <em>S R</em></span></h1>
              <span className={styles.nameGhost} aria-hidden="true">MG</span>
            </div>
            <p className={`${styles.role} hero-meta`}>FULL STACK DEVELOPER <b>·</b> MERN STACK</p>
            <p className={`${styles.location} hero-meta`}><MapPin size={17} strokeWidth={1.7} /> BENGALURU, INDIA</p>
            <p className={`${styles.tagline} hero-meta`}>Turning ideas into <i>engineered experiences.</i></p>
            <p className={`${styles.heroDescription} hero-copy`}>An Information Science & Engineering graduate pursuing a career in full-stack development. I bring hands-on project experience with React, Node.js, Express and MongoDB, and I'm eager to build meaningful applications, strengthen my engineering skills and create practical solutions.</p>
            <div className={`${styles.heroActions} hero-actions`}>
              <a className={styles.primaryLink} href="#projects">EXPLORE PROJECTS <ArrowDownRight size={17} /></a>
              <a className={styles.secondaryLink} href={profile.resume} target="_blank" rel="noreferrer">VIEW RESUME <ArrowUpRight size={16} /></a>
            </div>
            <div className={styles.heroSocials}>
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GITHUB <ArrowUpRight size={13} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LINKEDIN <ArrowUpRight size={13} /></a>
              <a href={`mailto:${profile.email}`}><Mail size={15} /> EMAIL <ArrowUpRight size={13} /></a>
            </div>
          </div>
          <div className={`${styles.portraitFrame} hero-portrait`}>
            <div className={styles.portraitAura} />
            <Image src="/images/monish-portrait.webp" alt="Monish Gowda S R — Full Stack Developer" fill priority sizes="(max-width: 760px) 82vw, 48vw" className={styles.portrait} />
            <span className={styles.portraitIndex}>FIG. 01 — MONISH GOWDA S R</span>
          </div>
          <div className={styles.heroSideNote}><span>01 / 08</span><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div>
        </section>

        <section id="about" className={`${styles.section} ${styles.about}`}>
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>01 / ABOUT</span><span className={styles.sectionRule} /></div>
          <div className={styles.aboutGrid}>
            <div data-reveal><p className={styles.eyebrow}>THE PERSON BEHIND THE CODE</p><h2 className={styles.displayHeading}>The person <i>behind the code.</i></h2></div>
            <div className={styles.aboutBody} data-reveal>
              <p className={styles.lead}>I’m Monish, an early-career full-stack developer from Bengaluru. I completed my B.E. in Information Science and Engineering at MVJ College of Engineering, affiliated with Visvesvaraya Technological University (VTU), graduating with an overall CGPA of 8.7/10 in 2026.</p>
              <p>My focus is the MERN stack, and I learn best by building: frontends, REST APIs, databases, authentication and third-party integrations. I enjoy turning requirements into working applications and understanding how each part of a product fits together.</p>
              <p>I’m looking to join a development team, contribute to real applications and learn from experienced engineers while continuing to strengthen my software development practice.</p>
              <div className={styles.aboutFacts}>
                <div><span>DEGREE</span><strong>B.E. · ISE</strong></div>
                <div><span>COLLEGE</span><strong>MVJ College</strong></div>
                <div><span>UNIVERSITY</span><strong>VTU</strong></div>
                <div><span>PERIOD</span><strong>2022–2026</strong></div>
                <div><span>CGPA</span><strong>8.7 / 10</strong></div>
                <div><span>BASED IN</span><strong>Bengaluru, India</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className={`${styles.section} ${styles.skills}`}>
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>02 / SKILLS</span><span className={styles.sectionRule} /></div>
          <div className={styles.skillsTop} data-reveal>
            <div><p className={styles.eyebrow}>TOOLS OF THE TRADE</p><h2 className={styles.displayHeading}>Technical <i>toolkit.</i></h2></div>
            <p className={styles.skillsAside}>A practical toolkit shaped by coursework, self-directed learning and hands-on application development. These are the technologies and tools I have worked with.</p>
          </div>
          <div className={styles.skillGrid}>{skillGroups.map((group) => <article className={styles.skillCard} key={group.index} data-reveal>
            <div className={styles.skillCardHead}><span>{group.index}</span><Code2 size={17} /></div>
            <h3>{group.title}</h3>
            <div className={styles.skillTags}>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </article>)}</div>
        </section>

        <section id="projects" className={`${styles.section} ${styles.projects}`}>
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>03 / SELECTED WORK</span><span className={styles.sectionRule} /></div>
          <div className={styles.projectsIntro} data-reveal><div><p className={styles.eyebrow}>FROM CONCEPT TO IMPLEMENTATION</p><h2 className={styles.displayHeading}>Things I’ve <i>built.</i></h2></div><p>Explore selected applications, the problems they address, and the workflows and technologies behind them.</p></div>
          <div className={styles.projectCards}>{projects.map((project) => <article className={styles.projectCard} key={project.number} data-reveal>
            <Link href={`/projects/${project.slug}`} className={styles.projectCardVisual} aria-label={`Explore ${project.title}`}>
              <Image src={project.cover} alt={`${project.title} project cover`} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 22vw" />
              <span className={styles.projectCardArrow}><ArrowUpRight size={20} /></span>
            </Link>
            <div className={styles.projectCardBody}>
              <span className={styles.projectCardCategory}>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
              <div className={styles.projectCardStack}>{project.stack.slice(0,5).map((tech) => <span key={tech}>{tech}</span>)}</div>
              <Link className={styles.projectLink} href={`/projects/${project.slug}`}>EXPLORE PROJECT <ArrowUpRight size={16} /></Link>
              <a className={styles.projectGithubLink} href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> VIEW GITHUB REPOSITORY <ArrowUpRight size={14} /></a>
            </div>
          </article>)}</div>
        </section>

        <section id="experience" className={`${styles.section} ${styles.experience}`}>
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>04 / EXPERIENCE</span><span className={styles.sectionRule} /></div>
          <div className={styles.experienceIntro} data-reveal><p className={styles.eyebrow}>INDUSTRY EXPOSURE</p><h2 className={styles.displayHeading}>Learning through <i>experience.</i></h2></div>
          <article className={styles.experienceCard} data-reveal>
            <div className={styles.institutionLogoWrap}><Image src={profile.internship.logo} alt="Rooman Technologies logo" width={488} height={140} className={styles.institutionLogo} /></div>
            <div className={styles.experienceMain}>
              <div className={styles.experienceMeta}><span>{profile.internship.period}</span><span>{profile.internship.duration}</span></div>
              <h3>{profile.internship.organization}</h3><p className={styles.experienceRole}>{profile.internship.role}</p>
              <p className={styles.experienceDescription}>{profile.internship.description}</p>
              <ul className={styles.contributionList}>{profile.internship.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className={styles.experienceFooter}><span>{profile.internship.mode}</span><span>INTERNSHIP EVALUATION <b>{profile.internship.evaluation}</b></span></div>
            </div>
          </article>
        </section>

        <section id="education" className={`${styles.section} ${styles.education}`}>
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>05 / ACADEMIC BACKGROUND</span><span className={styles.sectionRule} /></div>
          <div className={styles.educationIntro} data-reveal><p className={styles.eyebrow}>ACADEMIC FOUNDATION</p><h2 className={styles.displayHeading}>Built on a <i>strong foundation.</i></h2></div>
          <article className={styles.educationCard} data-reveal>
            <div className={styles.educationInstitutions}>
              <div className={styles.institutionLogoWrap}><Image src={profile.education.collegeLogo} alt="MVJ College of Engineering logo" width={332} height={146} className={styles.institutionLogo} /></div>
              <div className={`${styles.institutionLogoWrap} ${styles.vtuLogoWrap}`}><Image src={profile.education.universityLogo} alt="Visvesvaraya Technological University emblem" width={641} height={900} className={styles.vtuLogo} /></div>
            </div>
            <div className={styles.educationMain}>
              <div className={styles.experienceMeta}><span>{profile.education.period}</span><span>BENGALURU, KARNATAKA</span></div>
              <h3>{profile.education.degree}</h3><p className={styles.educationSpecialization}>{profile.education.specialization}</p>
              <p className={styles.educationInstitution}>{profile.education.institution}</p><p className={styles.educationUniversity}>{profile.education.university}</p>
              <div className={styles.educationResult}><span>OVERALL CGPA</span><strong>{profile.education.cgpa}</strong></div>
              <div className={styles.certifications}><span className={styles.certificationsLabel}>CERTIFICATIONS</span>{profile.education.certifications.map((certificate) => <div className={styles.certificate} key={certificate.title}><strong>{certificate.title}</strong><span>{certificate.issuer}</span><small>{certificate.period}</small></div>)}</div>
            </div>
          </article>
        </section>

        <section className={`${styles.section} ${styles.beyond}`}>
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>06 / OUTSIDE THE EDITOR</span><span className={styles.sectionRule} /></div>
          <div className={styles.beyondGrid} data-reveal><div><p className={styles.eyebrow}>A LITTLE MORE ABOUT ME</p><h2 className={styles.displayHeading}>More than<br /><i>the code.</i></h2></div><div className={styles.beyondText}><p>Technology is a big part of my day, but it isn’t the only thing that keeps me curious.</p><div className={styles.interestList}>{interests.map((interest, index) => <span key={interest}>{String(index + 1).padStart(2, '0')} / {interest.toUpperCase()}</span>)}</div></div></div>
        </section>

        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <div className={styles.contactOrb} aria-hidden="true" />
          <div className={styles.sectionHead} data-reveal><span className={styles.sectionIndex}>07 / THE NEXT CHAPTER</span><span className={styles.sectionRule} /></div>
          <div className={styles.contactContent} data-reveal><p className={styles.eyebrow}><span className={styles.statusDot} /> OPEN TO PROFESSIONAL OPPORTUNITIES</p><h2>Let’s build<br /><i>what’s next.</i></h2><p className={styles.contactCopy}>I’m looking for an entry-level opportunity in software development where I can contribute, collaborate and keep growing. If you’re hiring or would like to connect, I’d be glad to hear from you.</p>
            <div className={styles.contactActions}><a className={styles.primaryLink} href={`mailto:${profile.email}`}>EMAIL ME <Mail size={17} /></a><a className={styles.secondaryLink} href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={16} /></a><a className={styles.secondaryLink} href={profile.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={16} /></a></div>
            <a className={styles.emailAddress} href={`mailto:${profile.email}`}>{profile.email}<ExternalLink size={14} /></a>
          </div>
          <div className={styles.contactBottom}><span><MapPin size={15} /> BENGALURU, INDIA</span><span>AVAILABLE FOR SOFTWARE DEVELOPMENT OPPORTUNITIES</span></div>
        </section>
      </main>
      <footer className={styles.footer}><Link href="#home" className={styles.footerName}>MONISH GOWDA S R<span>®</span></Link><span>DESIGNED WITH INTENT. BUILT THROUGH CODE.</span><span>© {new Date().getFullYear()} MONISH GOWDA S R</span></footer>
    </div>
  );
}
