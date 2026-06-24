"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    // Add your Web3Forms Access Key here (User will provide this)
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

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

        {status === "success" ? (
          <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Message Sent!</h3>
            <p>Thank you for reaching out. We will get back to you shortly.</p>
            <button 
              onClick={() => setStatus("idle")}
              style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer' }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
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
                name="email"
                required
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
                name="message"
                required
                rows={5}
                placeholder="How can we help you?"
                style={{
                  width: '100%', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
                  fontFamily: 'inherit', resize: 'vertical'
                }}
              />
            </div>

            {status === "error" && (
              <p style={{ color: '#ff6b6b', fontSize: '0.875rem' }}>There was an error sending your message. Please try again.</p>
            )}

            <button 
              type="submit"
              disabled={status === "submitting"}
              style={{
                padding: '1rem', borderRadius: '4px', background: 'var(--accent-primary)',
                color: 'var(--bg-primary)', fontWeight: 600, fontSize: '1rem', marginTop: '1rem',
                transition: 'background 0.2s ease, transform 0.2s ease', cursor: status === "submitting" ? 'not-allowed' : 'pointer', border: 'none',
                opacity: status === "submitting" ? 0.7 : 1
              }}
              onMouseOver={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseOut={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--accent-primary)')}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
