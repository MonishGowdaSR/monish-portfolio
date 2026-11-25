import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.scss';
import { profile } from '@/data/profile';

const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://monishgowdasr.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Monish Gowda S R | Full Stack Developer',
  description: 'Portfolio of Monish Gowda S R, a Full Stack Developer based in Bengaluru, India, focused on MERN stack application development.',
  applicationName: 'Monish Gowda S R — Portfolio',
  openGraph: { title: 'Monish Gowda S R | Full Stack Developer', description: 'Building practical solutions through code.', type: 'website', locale: 'en_IN', siteName: 'Monish Gowda S R' },
  twitter: { card: 'summary_large_image', title: 'Monish Gowda S R | Full Stack Developer', description: 'Building practical solutions through code.' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#050505', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org', '@type': 'Person', name: profile.name,
    jobTitle: profile.role, description: profile.summary, address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.education.institution },
    email: profile.email, sameAs: [profile.linkedin, profile.github], url: siteUrl,
  };
  return <html lang="en" className={`${space.variable} ${instrument.variable} ${mono.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></body></html>;
}
