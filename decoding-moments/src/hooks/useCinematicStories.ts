import { useState, useEffect } from 'react';
import { fetchCinematicStories } from '../services/cinematicStories';
import type { CinematicStory } from '../types';

export function useCinematicStories() {
  const [stories, setStories] = useState<CinematicStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchCinematicStories();
        if (!cancelled) {
          setStories(data);
        }
      } catch {
        // API unavailable — stories stay empty
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { stories, loading };
}
