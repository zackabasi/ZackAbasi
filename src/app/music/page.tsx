"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, ChevronDown, ChevronUp } from "lucide-react";

const RELEASES = [
  {
    id: "ep-sunrosa",
    title: "Sunrosa EP",
    type: "EP",
    coverUrl: "/Music/Sunrosa EP artwork.webp",
    tracks: [
      {
        id: "sunrosa-1",
        title: "Mediterranea",
        artist: "Zack Abasi",
        url: "/Music/Mediterranea - Zack Abasi.mp3",
        coverUrl: "/Music/Sunrosa EP artwork.webp"
      },
      {
        id: "sunrosa-2",
        title: "Harisa Harisa",
        artist: "Zack Abasi",
        url: "/Music/Harisa Harisa - Zack Abasi.mp3",
        coverUrl: "/Music/Sunrosa EP artwork.webp"
      },
      {
        id: "sunrosa-3",
        title: "Azura Mira",
        artist: "Zack Abasi",
        url: "/Music/Azura Mira - Zack Abasi.mp3",
        coverUrl: "/Music/Sunrosa EP artwork.webp"
      }
    ]
  }
];

export default function MusicPage() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();
  const [openRelease, setOpenRelease] = useState<string | null>("ep-sunrosa");

  const toggleRelease = (id: string) => {
    setOpenRelease(openRelease === id ? null : id);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Music Catalog
      </motion.h1>
      
      <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {RELEASES.map((release, idx) => {
          const isOpen = openRelease === release.id;
          
          return (
            <motion.div 
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
              }}
            >
              {/* Release Header (Accordion Toggle) */}
              <div 
                onClick={() => toggleRelease(release.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem', cursor: 'pointer', background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transition: 'background 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <img src={release.coverUrl} alt={release.title} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.25rem' }}>{release.title}</div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{release.type}</div>
                  </div>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>

              {/* Tracks List */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0 0 1rem 0' }} />
                      
                      {release.tracks.map((track, trackIdx) => {
                        const isThisPlaying = currentTrack?.id === track.id && isPlaying;
                        
                        return (
                          <div 
                            key={track.id}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '1rem', borderRadius: '8px',
                              background: isThisPlaying ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                              transition: 'background 0.2s ease',
                              border: isThisPlaying ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent'
                            }}
                            onMouseOver={(e) => { if (!isThisPlaying) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                            onMouseOut={(e) => { if (!isThisPlaying) e.currentTarget.style.background = 'transparent' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ color: 'var(--text-secondary)', width: '20px', textAlign: 'center', fontSize: '0.875rem' }}>
                                {isThisPlaying ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}><Play fill="var(--accent-primary)" size={14} /></motion.div> : trackIdx + 1}
                              </div>
                              <div style={{ fontWeight: isThisPlaying ? 600 : 500, color: isThisPlaying ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                                {track.title}
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => currentTrack?.id === track.id ? togglePlayPause() : playTrack(track, release.tracks)}
                              style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: isThisPlaying ? 'var(--text-primary)' : 'var(--bg-tertiary)', 
                                color: isThisPlaying ? 'var(--bg-primary)' : 'var(--text-primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.2s ease, transform 0.2s ease',
                                border: isThisPlaying ? 'none' : '1px solid var(--border-color)',
                                cursor: 'pointer'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                              {isThisPlaying ? <Pause fill="currentColor" size={16} /> : <Play fill="currentColor" size={16} style={{ marginLeft: '2px' }} />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
