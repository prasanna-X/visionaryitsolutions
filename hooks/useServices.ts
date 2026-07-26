'use client';
import { useEffect, useState } from 'react';

export function useServices() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch('/api/services').then((r) => r.json()).then(setServices);
  }, []);
  return services;
}
