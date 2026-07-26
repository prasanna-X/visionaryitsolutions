'use client';
import { useEffect, useState } from 'react';

export function useAdmins() {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetch('/api/admins').then((r) => r.json()).then(setAdmins);
  }, []);
  return admins;
}
