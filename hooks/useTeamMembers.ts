'use client';
import { useEffect, useState } from 'react';

export function useTeamMembers() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    fetch('/api/team-members').then((r) => r.json()).then(setMembers);
  }, []);
  return members;
}
