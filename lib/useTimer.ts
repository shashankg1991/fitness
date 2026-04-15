'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

function createBeep(freq: number, dur: number, vol: number, type: OscillatorType = 'sine') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur + 0.05);
    osc.onended = () => { try { ctx.close(); } catch {} };
  } catch {}
}

export function playTickSound() { createBeep(880, 0.08, 0.35, 'sine'); }
export function playLastThreeSound() { createBeep(1100, 0.12, 0.55, 'sine'); }
export function playDoneSound() {
  createBeep(660, 0.18, 0.5, 'sine');
  setTimeout(() => createBeep(880, 0.18, 0.5, 'sine'), 170);
  setTimeout(() => createBeep(1100, 0.25, 0.6, 'sine'), 340);
}
export function playRestEndSound() {
  createBeep(440, 0.1, 0.4, 'square');
  setTimeout(() => createBeep(880, 0.2, 0.5, 'square'), 120);
}

export function useTimer(initialSeconds: number, onComplete?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const clear = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };

  useEffect(() => {
    if (!isRunning) { clear(); return; }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        const next = s - 1;
        if (next <= 3 && next > 0) playLastThreeSound();
        else if (next > 3) playTickSound();
        if (next <= 0) {
          clear();
          setIsRunning(false);
          setIsDone(true);
          playDoneSound();
          setTimeout(() => onCompleteRef.current?.(), 50);
          return 0;
        }
        return next;
      });
    }, 1000);
    return clear;
  }, [isRunning]);

  const start  = useCallback(() => { setIsDone(false); setIsRunning(true); }, []);
  const pause  = useCallback(() => setIsRunning(false), []);
  const toggle = useCallback(() => setIsRunning(r => !r), []);
  const reset  = useCallback((s?: number) => {
    clear();
    setIsRunning(false);
    setIsDone(false);
    setSeconds(s ?? initialSeconds);
  }, [initialSeconds]);

  return { seconds, isRunning, isDone, start, pause, toggle, reset };
}

export function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
