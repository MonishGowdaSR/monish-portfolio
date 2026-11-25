import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { projects, profile } from '@/data/profile';
import { projectDetails } from '@/data/projectDetails';
import styles from './page.module.scss';

type Slug = keyof typeof projectDetails;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const detail = projectDetails[slug as Slug];
  if (!project || !detail) notFound();

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link href="/" className={styles.brand}>M<span>.</span></Link>
      <Link href="/#projects" className={styles.back}><ArrowLeft size={15}/> BACK TO PROJECTS</Link>
      <a href={profile.resume} className={styles.resume} target="_blank" rel="noreferrer">RESUME <ArrowUpRight size={14}/></a>
    </header>
    <section className={styles.hero}>
      <p className={styles.eyebrow}>PROJECT / {project.number} <span>—</span> {project.category}</p>
      <h1>{project.title}</h1>
      <p className={styles.subtitle}>{project.subtitle}</p>
    </section>
    <section className={styles.content}>
      <div className={styles.mainColumn}>
        <div className={styles.section}>
          <p className={styles.label}>01 / OVERVIEW</p><h2>What the project <i>does.</i></h2><p>{detail.overview}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.label}>02 / THE PROBLEM</p><h2>Context & <i>purpose.</i></h2><p>{detail.problem}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.label}>03 / IMPLEMENTATION</p><h2>How it was <i>built.</i></h2>
          <ul>{detail.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className={styles.section}>
          <p className={styles.label}>04 / APPLICATION GALLERY</p><h2>Inside the <i>application.</i></h2>
          <div className={styles.gallery}>{detail.gallery.map(([src,label]) => <figure key={src}><a href={src} target="_blank" rel="noreferrer"><Image src={src} alt={label} width={1500} height={950} sizes="(max-width: 760px) 90vw, 60vw" /></a><figcaption>{label}</figcaption></figure>)}</div>
          <p className={styles.note}>{detail.note}</p>
        </div>
      </div>
      <aside className={styles.sidebar}>
        <div className={styles.sideBlock}><p className={styles.label}>TECHNOLOGY STACK</p><div className={styles.tags}>{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
        <div className={styles.sideBlock}><p className={styles.label}>KEY FEATURES</p><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
        <a className={styles.github} href={project.github} target="_blank" rel="noreferrer"><Github size={17}/> VIEW SOURCE CODE <ArrowUpRight size={15}/></a>
      </aside>
    </section>
    <footer className={styles.footer}><Link href="/#projects"><ArrowLeft size={15}/> ALL PROJECTS</Link><span>MONISH GOWDA S R · {profile.location.toUpperCase()}</span><Link href="/#contact">GET IN TOUCH <ArrowUpRight size={15}/></Link></footer>
  </main>;
}
