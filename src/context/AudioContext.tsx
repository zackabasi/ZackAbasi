"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export type Track = {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
};

type AudioContextType = {
  currentTrack: Track | null;
  currentPlaylist: Track[];
  isPlaying: boolean;
  playTrack: (track: Track, playlist?: Track[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayPause: () => void;
  audioElement: HTMLAudioElement | null;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const stateRef = useRef({ currentTrack, currentPlaylist });
  useEffect(() => {
    stateRef.current = { currentTrack, currentPlaylist };
  }, [currentTrack, currentPlaylist]);

  const playTrack = (track: Track, playlist?: Track[]) => {
    if (!audioRef.current) return;
    
    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }

    if (playlist) setCurrentPlaylist(playlist);
    
    setCurrentTrack(track);
    audioRef.current.src = track.url;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const playNext = () => {
    const { currentTrack: track, currentPlaylist: playlist } = stateRef.current;
    if (track && playlist.length > 0) {
      const idx = playlist.findIndex(t => t.id === track.id);
      if (idx !== -1 && idx < playlist.length - 1) {
        playTrack(playlist[idx + 1], playlist);
      }
    }
  };

  const playPrevious = () => {
    const { currentTrack: track, currentPlaylist: playlist } = stateRef.current;
    if (track && playlist.length > 0) {
      const idx = playlist.findIndex(t => t.id === track.id);
      if (idx > 0) {
        playTrack(playlist[idx - 1], playlist);
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;
      setAudioElement(audio);
    }
    const audio = audioRef.current;

    const handleEnded = () => {
      const { currentTrack: track, currentPlaylist: playlist } = stateRef.current;
      if (track && playlist.length > 0) {
        const idx = playlist.findIndex(t => t.id === track.id);
        if (idx !== -1 && idx < playlist.length - 1) {
          playTrack(playlist[idx + 1], playlist);
          return;
        }
      }
      setIsPlaying(false);
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, currentPlaylist, isPlaying, playTrack, playNext, playPrevious, togglePlayPause, audioElement }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
