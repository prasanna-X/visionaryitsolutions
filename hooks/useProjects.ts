'use client';
import { useEffect, useState } from 'react';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects').then((r) => r.json()).then(setProjects);
  }, []);
  return projects;
}
