"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '60px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Contact</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          For bookings, press inquiries, or collaborations, please fill out the form below.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Name</label>
            <input 
              type="text" 
              id="name"
              placeholder="Your name"
              style={{
                width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Your email address"
              style={{
                width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Message</label>
            <textarea 
              id="message"
              rows={5}
              placeholder="How can we help you?"
              style={{
                width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
                fontFamily: 'inherit', resize: 'vertical'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              padding: '1rem', borderRadius: '4px', background: 'var(--accent-primary)',
              color: 'var(--bg-primary)', fontWeight: 600, fontSize: '1rem', marginTop: '1rem',
              transition: 'background 0.2s ease, transform 0.2s ease', cursor: 'pointer', border: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent-primary)'}
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
