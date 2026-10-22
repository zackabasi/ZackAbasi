import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container animate-fade-in" style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        This page doesn&rsquo;t exist or has moved.
      </p>
      <Link href="/" className="button-primary">
        Back to home
      </Link>
    </div>
  );
}
