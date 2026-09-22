import { useState, useEffect } from 'react';
import type { StoryChapter } from '../types';
import { fetchChapters } from '../services/stories';

export function useChapters() {
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchChapters();
        if (!cancelled) {
          setChapters(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch chapters');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { chapters, loading, error };
}
