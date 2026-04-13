'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialSeconds: number, onComplete?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback((freq = 880, dur = 0.15, vol = 0.4) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur);
    } catch {}
  }, []);

  const playDone = useCallback(() => {
    [660, 880, 1100].forEach((f, i) => {
      setTimeout(() => playBeep(f, 0.2, 0.5), i * 120);
    });
  }, [playBeep]);

  const playTick = useCallback(() => playBeep(440, 0.06, 0.15), [playBeep]);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 4 && s > 1) playTick();
          if (s === 1) {
            setIsRunning(false);
            setIsDone(true);
            playDone();
            onComplete?.();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, seconds, playTick, playDone, onComplete]);

  const start = useCallback(() => { setIsDone(false); setIsRunning(true); }, []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback((s?: number) => {
    setIsRunning(false);
    setIsDone(false);
    setSeconds(s ?? initialSeconds);
  }, [initialSeconds]);
  const toggle = useCallback(() => setIsRunning(r => !r), []);

  return { seconds, isRunning, isDone, start, pause, reset, toggle, playBeep };
}

export function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
