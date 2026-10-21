"use client";

export default function GalleryClient({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <h1 className="animate-fade-in">
        Gallery
      </h1>
      
      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        gap: '1.5rem'
      }}>
        {images.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)' }}>
            Photos are coming soon.
          </div>
        ) : (
          images.map((image, idx) => (
            <div 
              key={idx}
              className="animate-fade-in"
              style={{
                animationDelay: `${idx * 0.1}s`,
                aspectRatio: '1',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <img src={image.src} alt={image.alt} width={900} height={900} loading={idx < 3 ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
