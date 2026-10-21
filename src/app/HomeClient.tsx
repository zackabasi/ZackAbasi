"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAudio, type Track } from "@/context/AudioContext";
import { Play } from "lucide-react";

// Accepts watch, youtu.be, shorts and embed links; returns the privacy-enhanced embed URL.
const youtubeEmbed = (url: string) => {
  const id = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
};

export default function HomeClient({
  featuredLogos = [],
  projectCategories = [],
  testimonialVideo,
  latestTracks = []
}: {
  featuredLogos?: { src: string; link: string; name: string }[],
  projectCategories?: { categoryTitle: string, projects: { title: string, image: string, link: string }[] }[],
  testimonialVideo?: string,
  latestTracks?: Track[]
}) {
  const { playTrack } = useAudio();

  const handlePlayLatest = () => {
    if (latestTracks.length > 0) {
      playTrack(latestTracks[0], latestTracks);
    }
  };

  const testimonialEmbed = testimonialVideo ? youtubeEmbed(testimonialVideo) : null;

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} ${styles.enter}`}>
            ZACK ABASI
          </h1>

          <div className={`${styles.quote} ${styles.enter}`} style={{ animationDelay: '0.1s' }}>
            &ldquo;Music is the only place where earth meets sky, and mind and matter move in ecstatic harmony.&rdquo;
          </div>

          <p className={`${styles.subtitle} ${styles.enter}`} style={{ animationDelay: '0.2s' }}>
            Explore the latest sounds, projects, and exclusive releases.
          </p>

          <div className={styles.enter} style={{ animationDelay: '0.3s' }}>
            <button onClick={handlePlayLatest} className={styles.cta}>
              <Play size={20} fill="currentColor" style={{ marginRight: '8px' }} aria-hidden="true" />
              Play Latest Release
            </button>
            <div className={styles.socialIcons}>
              <a href="https://www.youtube.com/@ZackAbasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://www.tiktok.com/@zackabasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
              <a href="https://www.instagram.com/zackabasi/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://x.com/zackabasi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
              </a>
              <a href="https://www.facebook.com/ZackAbasi/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.heroImageContainer} ${styles.enterSide}`} style={{ animationDelay: '0.3s' }}>
          <Image
            src="/hero-photo.webp"
            alt="Zack Abasi with his Fender Stratocaster"
            width={861}
            height={1197}
            sizes="(max-width: 992px) 290px, 432px"
            loading="eager"
            fetchPriority="high"
            className={styles.heroImage}
          />
        </div>
      </section>

      {featuredLogos.length > 0 && (
        <section className={styles.featuredSection} aria-labelledby="featured-title">
          <h2 id="featured-title" className={styles.featuredTitle}>Music featured on</h2>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {/* The second set only exists for the seamless loop, so it's hidden from screen readers and the keyboard */}
              {[...featuredLogos, ...featuredLogos].map((logo, idx) => {
                const duplicate = idx >= featuredLogos.length;
                return (
                  <a
                    key={idx}
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.logoCard}
                    aria-hidden={duplicate || undefined}
                    tabIndex={duplicate ? -1 : undefined}
                  >
                    <img src={logo.src} alt={duplicate ? "" : logo.name} className={styles.carouselLogo} />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={styles.testimonialSection} style={{ borderBottom: 'none', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '2rem' }}>Introducing Sunrosa: My Debut Instrumental EP</h2>

          <div className={styles.videoWrapper} style={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginBottom: '2rem' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/nCvD1I76VAw"
              width="100%"
              height="100%"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Sunrosa EP by Zack Abasi (full stream)"
            ></iframe>
          </div>

          <p className={styles.testimonialText} style={{ fontSize: '1rem', fontStyle: 'normal', maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--text-primary)' }}>
            This project was supported by Meath County Council Arts Office and Creative Ireland through the Professional Artist Development Fund.
          </p>

          <div className={styles.funderStrip}>
            <img src="/Creative Ireland Logo_Gold.webp" alt="Creative Ireland" width={400} height={99} loading="lazy" />
            <img src="/Meath Arts Office Logo.webp" alt="Meath County Council Arts Office" width={400} height={217} loading="lazy" />
            <img src="/Meath County Council Logo.webp" alt="Meath County Council" width={400} height={50} loading="lazy" />
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
                src="https://www.youtube-nocookie.com/embed/xwCgSW-oqKE"
                width="100%"
                height="100%"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="RTÉ Radio 1 plays Zack Abasi's Christmas tune on Christmas Eve"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection} style={{ borderBottom: 'none', paddingTop: 0, paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ marginBottom: '3rem' }}>A Viral Celebration of Citizenship ☘️</h2>

          <a
            href="https://www.irishpost.com/video/watch-syrian-musician-celebrates-irish-citizenship-with-fantastic-cover-of-thin-lizzys-whiskey-in-the-jar-218424"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.articleCardHorizontal}
          >
            <div className={styles.articleCardImageContainer}>
              <img
                src="/Irish-article.webp"
                alt="Zack Abasi playing Whiskey in the Jar on electric guitar, from the Irish Post video"
                width={400}
                height={214}
                loading="lazy"
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

      <section className={styles.testimonialSection} style={{ paddingTop: '3rem' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Testimonial</h2>
          <div className={styles.testimonialGrid}>
            <figure className={styles.testimonialContent}>
              <div className={styles.quoteIcon} aria-hidden="true">&ldquo;</div>
              <blockquote className={styles.flickQuote}>
                <p>He is one of the greatest guitarists I&rsquo;ve met in <span className={styles.quoteEmphasis}>YEARS</span>.</p>
              </blockquote>
              <figcaption className={styles.quoteAttribution}>
                <cite>Larry Flick</cite>
                <span>Former Billboard critic &amp; SiriusXM host</span>
              </figcaption>
            </figure>
            {testimonialEmbed && (
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="100%"
                  src={testimonialEmbed}
                  loading="lazy"
                  title="Larry Flick on Zack Abasi's Alma Señor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      {projectCategories && projectCategories.map((category, catIdx) => (
        <section className={styles.section} key={catIdx}>
          <h2 className={styles.sectionTitle}>{category.categoryTitle}</h2>
          <div className={styles.projectGrid}>
            {category.projects && category.projects.map((item, idx) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className={styles.projectCard}
              >
                <img src={item.image} alt={`${item.title} album cover`} width={800} height={800} loading="lazy" className={styles.projectCover} />
                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>{item.title}</h3>
                  <p className={styles.projectLink}>View Project &rarr;</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
