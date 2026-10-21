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

  // play() is rejected when the browser blocks playback or the file can't load;
  // the 'pause'/'error' listeners below then keep the button state honest.
  const startPlayback = (audio: HTMLAudioElement) => {
    audio.play().catch(() => setIsPlaying(false));
  };

  const playTrack = (track: Track, playlist?: Track[]) => {
    if (!audioRef.current) return;

    if (stateRef.current.currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }

    if (playlist) setCurrentPlaylist(playlist);

    setCurrentTrack(track);
    stateRef.current = { currentTrack: track, currentPlaylist: playlist || stateRef.current.currentPlaylist };
    audioRef.current.src = track.url;
    startPlayback(audioRef.current);
  };

  const step = (offset: number) => {
    const { currentTrack: track, currentPlaylist: playlist } = stateRef.current;
    if (!track || playlist.length === 0) return;
    const idx = playlist.findIndex(t => t.id === track.id);
    const next = playlist[idx + offset];
    if (idx !== -1 && next) playTrack(next, playlist);
  };

  const playNext = () => step(1);
  const playPrevious = () => step(-1);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !stateRef.current.currentTrack) return;
    if (audio.paused) {
      startPlayback(audio);
    } else {
      audio.pause();
    }
  };

  // Keep the latest handlers reachable from listeners registered once below.
  const handlersRef = useRef({ playNext, playPrevious, togglePlayPause });
  useEffect(() => {
    handlersRef.current = { playNext, playPrevious, togglePlayPause };
  });

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audioRef.current = audio;
      setAudioElement(audio);
    }
    const audio = audioRef.current;

    // The element is the source of truth, so media keys, headphones and errors stay in sync.
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      const { currentTrack: track, currentPlaylist: playlist } = stateRef.current;
      const idx = track ? playlist.findIndex(t => t.id === track.id) : -1;
      if (idx !== -1 && idx < playlist.length - 1) {
        handlersRef.current.playNext();
      } else {
        setIsPlaying(false);
      }
    };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onPause);
    audio.addEventListener('ended', onEnded);

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => handlersRef.current.togglePlayPause());
      navigator.mediaSession.setActionHandler('pause', () => handlersRef.current.togglePlayPause());
      navigator.mediaSession.setActionHandler('nexttrack', () => handlersRef.current.playNext());
      navigator.mediaSession.setActionHandler('previoustrack', () => handlersRef.current.playPrevious());
    }

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Track title and artwork on the phone's lock screen and in the browser's media controls.
  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    const artwork = currentTrack.coverUrl ? [{ src: new URL(currentTrack.coverUrl, window.location.href).href }] : [];
    navigator.mediaSession.metadata = new MediaMetadata({ title: currentTrack.title, artist: currentTrack.artist, artwork });
  }, [currentTrack]);

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
