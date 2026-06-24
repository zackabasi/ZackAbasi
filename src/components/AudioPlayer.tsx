"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAudio } from '@/context/AudioContext';
import styles from './AudioPlayer.module.css';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export default function AudioPlayer() {
  const { currentTrack, currentPlaylist, isPlaying, togglePlayPause, playNext, playPrevious, audioElement } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!audioElement) return;

    const updateTime = () => setCurrentTime(audioElement.currentTime);
    const updateDuration = () => setDuration(audioElement.duration);

    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('loadedmetadata', updateDuration);

    // Initial values
    setCurrentTime(audioElement.currentTime);
    setDuration(audioElement.duration || 0);

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioElement]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioElement) {
      const newTime = Number(e.target.value);
      audioElement.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack || pathname.startsWith('/studio')) return null;

  const hasNext = currentPlaylist.length > 0 && currentPlaylist.findIndex(t => t.id === currentTrack.id) < currentPlaylist.length - 1;
  const hasPrev = currentPlaylist.length > 0 && currentPlaylist.findIndex(t => t.id === currentTrack.id) > 0;

  return (
    <div className={`${styles.playerContainer} ${currentTrack ? styles.playerVisible : ''}`}>
      <div className={styles.trackInfo}>
        <img src={currentTrack.coverUrl} alt={currentTrack.title} className={styles.cover} />
        <div>
          <div className={styles.title}>{currentTrack.title}</div>
          <div className={styles.artist}>{currentTrack.artist}</div>
        </div>
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.controls}>
          <button className={styles.secondaryBtn} onClick={playPrevious} disabled={!hasPrev} style={{ opacity: hasPrev ? 1 : 0.5, cursor: hasPrev ? 'pointer' : 'default' }}>
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button className={styles.playPauseBtn} onClick={togglePlayPause}>
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
          <button className={styles.secondaryBtn} onClick={playNext} disabled={!hasNext} style={{ opacity: hasNext ? 1 : 0.5, cursor: hasNext ? 'pointer' : 'default' }}>
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
        
        <div className={styles.progressContainer}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className={styles.progressBar}
            style={{ '--progress': `${(currentTime / (duration || 1)) * 100}%` } as React.CSSProperties}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.placeholder}>
        {/* Space for future volume controls */}
      </div>
    </div>
  );
}
