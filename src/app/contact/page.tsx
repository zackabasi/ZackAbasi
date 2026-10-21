import { pageMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Zack Abasi for bookings and performances, collaborations and commissions, or press.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className={`container ${styles.page}`}>
      <div className={`${styles.inner} animate-fade-in`}>
        <h1 style={{ marginBottom: '1rem' }}>Contact</h1>
        <p className={styles.intro}>
          For bookings, commissions, collaborations or press, choose a topic and send me a message.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
