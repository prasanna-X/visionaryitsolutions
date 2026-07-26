'use client';
export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Dashboard error</h2>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
