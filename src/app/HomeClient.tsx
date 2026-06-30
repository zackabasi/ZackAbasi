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

      <section className={styles.testimonialSection} style={{ borderBottom: 'none' }}>
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

      <section className={styles.testimonialSection} style={{ borderBottom: 'none', paddingTop: 0 }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>A Viral Celebration of Citizenship ☘️</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className={styles.subtitle} style={{ margin: '0 auto 2.5rem auto', color: 'var(--text-primary)', lineHeight: '1.8' }}>
              When I received my Irish citizenship, I knew there was only one way to celebrate: an electric cover of Thin Lizzy's iconic "Whiskey in the Jar". The performance quickly went viral on my custom ZA guitar, earning praise from the Department of Justice and making national headlines! Click the article below to read the full story.
            </p>
            <a 
              href="https://lnkd.in/gW9JeZJJ" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.articleLink}
            >
              <img 
                src="/Irish-article.webp" 
                alt="Irish Citizenship Article" 
                className={styles.articleImage}
              />
              <div className={styles.readMoreOverlay}>
                <span>Read Full Article</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {testimonial && (
        <section className={styles.testimonialSection}>
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
