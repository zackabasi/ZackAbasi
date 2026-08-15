"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";
import { useAudio } from "@/context/AudioContext";
import { Play } from "lucide-react";

export default function HomeClient({ 
  featuredLogos = [],
  projectCategories = [],
  testimonial = null,
  latestTrack = null
}: { 
  featuredLogos?: { src: string; link: string }[],
  projectCategories?: { categoryTitle: string, projects: { title: string, image: string, link: string }[] }[],
  testimonial?: { quote: string, videoUrl: string } | null,
  latestTrack?: any
}) {
  const { playTrack } = useAudio();

  const handlePlayLatest = () => {
    if (latestTrack) {
      playTrack(latestTrack, [latestTrack]);
    }
  };

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ZACK ABASI
          </motion.h1>
          
          <motion.div
            className={styles.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            &ldquo;Music is the only place where earth meets sky, and mind and matter move in ecstatic harmony.&rdquo;
          </motion.div>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore the latest sounds, projects, and exclusive releases.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button onClick={handlePlayLatest} className={styles.cta}>
              <Play size={20} fill="currentColor" style={{ marginRight: '8px' }} />
              Play Latest Release
            </button>
            <div className={styles.socialIcons}>
              <a href="http://youtube.com/zackabasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="http://tiktok.com/@zackabasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
              <a href="http://instagram.com/zackabasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/zackabasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="https://www.facebook.com/ZackAbasi/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.heroImageContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Note: Save your attached image as 'hero-photo.png' inside the public/ directory! */}
          <img 
            src="/hero-photo.png" 
            alt="Zack Abasi with Guitar" 
            className={styles.heroImage}
            onError={(e) => {
              // Fallback to a placeholder if the image hasn't been added to public/ yet
              e.currentTarget.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800&h=1000";
            }}
          />
        </motion.div>
      </section>

      {featuredLogos.length > 0 && (
        <section className={styles.featuredSection}>
          <h3 className={styles.featuredTitle}>Music featured on</h3>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {/* Duplicate logos for infinite scroll effect */}
              {[...featuredLogos, ...featuredLogos].map((logo, idx) => (
                <a 
                  key={idx} 
                  href={logo.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.logoCard}
                >
                  <img src={logo.src} alt="Featured on" className={styles.carouselLogo} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.testimonialSection} style={{ borderBottom: 'none', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '2rem' }}>Introducing Sunrosa: My Debut Instrumental EP</h2>
          
          <div className={styles.videoWrapper} style={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginBottom: '2rem' }}>
            <iframe 
              src="https://www.youtube.com/embed/nCvD1I76VAw" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Sunrosa EP"
            ></iframe>
          </div>

          <p className={styles.testimonialText} style={{ fontSize: '1rem', fontStyle: 'normal', maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--text-primary)' }}>
            This project was supported by Meath County Council Arts Office and Creative Ireland through the Professional Artist Development Fund.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(10, 10, 10, 0.8)', padding: '0.75rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.5)', maxWidth: 'max-content' }}>
            <img src="/Creative Ireland Logo_Gold.webp" alt="Creative Ireland" style={{ height: '45px', objectFit: 'contain' }} />
            <img src="/Meath Arts Office Logo.webp" alt="Meath Arts Office" style={{ height: '45px', objectFit: 'contain' }} />
            <img src="/Meath County Council Logo.webp" alt="Meath County Council" style={{ height: '45px', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection} style={{ borderBottom: 'none', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Spreading Love &amp; Joy ❤️</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText} style={{ fontSize: '1.25rem', fontStyle: 'normal' }}>
                I composed this Christmas tune for my local school winter performance, and it magically made its way to national radio in Ireland! Here is a special snippet from RTÉ Radio 1 when they broadcast it across the country on Christmas Eve.
              </p>
            </div>
            <div className={styles.videoWrapper}>
              <iframe 
                src="https://www.youtube.com/embed/xwCgSW-oqKE" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title="Spreading Love & Joy Video"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection} style={{ borderBottom: 'none', paddingTop: 0, paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ marginBottom: '3rem' }}>A Viral Celebration of Citizenship ☘️</h2>
          
          <a 
            href="https://lnkd.in/gW9JeZJJ" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.articleCardHorizontal}
          >
            <div className={styles.articleCardImageContainer}>
              <img 
                src="/Irish-article.webp" 
                alt="Irish Citizenship Article" 
                className={styles.articleImageHorizontal}
              />
            </div>
            <div className={styles.articleCardContent}>
              <p className={styles.articleCardText}>
                When I received my Irish citizenship, I knew there was only one way to celebrate: an electric cover of Thin Lizzy's iconic "Whiskey in the Jar". The performance quickly went viral on my custom ZA guitar, earning praise from the Department of Justice and making national headlines!
              </p>
              <span className={styles.readArticleBtn}>Read Full Article &rarr;</span>
            </div>
          </a>
          
        </div>
      </section>

      {testimonial && (
        <section className={styles.testimonialSection} style={{ paddingTop: '3rem' }}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Testimonial</h2>
            <div className={styles.testimonialGrid}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteIcon}>&ldquo;</div>
                <p className={styles.testimonialText}>
                  {testimonial.quote}
                </p>
              </div>
              <div className={styles.videoWrapper}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={testimonial.videoUrl.replace('watch?v=', 'embed/')} 
                  title="Testimonial Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}

      {projectCategories && projectCategories.map((category, catIdx) => (
        <section className={styles.section} key={catIdx}>
          <h2 className={styles.sectionTitle}>{category.categoryTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {category.projects && category.projects.map((item, idx) => (
              <motion.a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className={styles.projectCard}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <img src={item.image} alt={item.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>View Project &rarr;</p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
