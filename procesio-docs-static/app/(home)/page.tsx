'use client';
import { useEffect } from 'react';

// Open directly inside the Overview section (like the old Archbee landing),
// so visitors immediately get the top section bar + the section's left menu.
export default function HomePage() {
  useEffect(() => { window.location.replace('/docs/overview/announcements'); }, []);
  return null;
}
