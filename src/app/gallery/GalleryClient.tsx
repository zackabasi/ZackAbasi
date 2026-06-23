"use client";

import { motion } from "framer-motion";

export default function GalleryClient({ images }: { images: string[] }) {
  return (
    <div className="container" style={{ paddingTop: '60px' }}>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Gallery
      </motion.h1>
      
      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {images.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)' }}>
            No images found. Please add images to the public/gallery folder.
          </div>
        ) : (
          images.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                aspectRatio: '1',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <img src={src} alt={`Gallery image ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
