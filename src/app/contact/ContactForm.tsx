"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const TOPICS = [
  { value: "Booking & performances", short: "booking", button: "Send booking enquiry", hint: "Tell me about the event: date, venue or city, and the kind of performance you have in mind." },
  { value: "Collaborations & commissions", short: "collaboration", button: "Send enquiry", hint: "Tell me about the project, your timeline, and what you'd like me to compose or play." },
  { value: "Press", short: "press", button: "Send press enquiry", hint: "Tell me about your publication or programme and what you need." },
  { value: "General", short: "general", button: "Send message", hint: "Write your message here." },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [topic, setTopic] = useState(TOPICS[0].value);
  const current = TOPICS.find(t => t.value === topic) || TOPICS[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE");
    formData.append("subject", `New ${current.short} enquiry from zackabasi.com`);
    formData.append("from_name", "zackabasi.com");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        setTopic(TOPICS[0].value);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h2 className={styles.successTitle}>Message sent</h2>
        <p>Thank you for reaching out. I&rsquo;ll get back to you as soon as I can.</p>
        <button type="button" className={styles.again} onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.topics}>
        <legend className={styles.legend}>What is it about?</legend>
        <div className={styles.topicGrid}>
          {TOPICS.map((t, idx) => (
            <label key={t.value} className={styles.topic}>
              <input
                type="radio"
                id={`topic-${idx}`}
                name="enquiry_type"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
              />
              <span className={styles.marker} aria-hidden="true" />
              <span className={styles.topicLabel}>{t.value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" id="name" name="name" required autoComplete="name" placeholder="Your name" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" name="email" required autoComplete="email" placeholder="you@example.com" className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="organisation" className={styles.label}>Organisation <span className={styles.optional}>(optional)</span></label>
        <input type="text" id="organisation" name="organisation" autoComplete="organization" placeholder="Festival, venue, label, publication…" className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea id="message" name="message" required rows={6} placeholder={current.hint} className={styles.input} />
      </div>

      <input type="checkbox" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div aria-live="polite">
        {status === "error" && (
          <p className={styles.error} role="alert">Your message didn&rsquo;t send. Please check your connection and try again.</p>
        )}
      </div>

      <button type="submit" className={styles.submit} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : current.button}
      </button>
    </form>
  );
}
