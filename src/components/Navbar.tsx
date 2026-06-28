"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Music', path: '/music' },
  { name: 'My Story', path: '/my-story' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  if (pathname.startsWith('/studio')) return null;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" aria-label="Home" className={styles.logoLink} onClick={() => setMobileMenuOpen(false)}>
        <img 
          src="/logo.png" 
          alt="Zack Abasi Logo" 
          className={styles.logoImg}
          onError={(e) => {
            // Fallback to text if the image is missing
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextElementSibling) {
              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
            }
          }}
        />
        <div style={{ display: 'none', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Zack<span style={{ color: 'var(--accent-primary)' }}>Abasi</span>
        </div>
      </Link>
      
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path} 
            className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <button 
        className={styles.mobileMenuButton} 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`${styles.mobileLink} ${pathname === item.path ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
