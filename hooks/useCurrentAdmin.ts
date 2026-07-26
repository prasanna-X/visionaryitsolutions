'use client';
import { useEffect, useState } from 'react';

export function useCurrentAdmin() {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    fetch('/api/auth/session').then((r) => r.json()).then(setAdmin);
  }, []);
  return admin;
}
