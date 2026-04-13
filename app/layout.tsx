import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'FitCore — Workout & Diet',
  description: 'Personalised lean muscle plan',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
