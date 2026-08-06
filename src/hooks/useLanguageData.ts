import { useState, useEffect } from 'react';
import type { LanguageRegistryEntry, CharacterData } from '../types';

export function useLanguageData(langId: string) {
  const [registryEntry, setRegistryEntry] = useState<LanguageRegistryEntry | null>(null);
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const registryRes = await fetch('/data/registry.json');
        if (!registryRes.ok) throw new Error('Failed to load registry');
        const registry: LanguageRegistryEntry[] = await registryRes.json();
        
        const entry = registry.find(r => r.id === langId);
        if (!entry) throw new Error('Language not found');
        setRegistryEntry(entry);

        const dataRes = await fetch(entry.dataFile);
        if (!dataRes.ok) throw new Error('Failed to load language data');
        const data: CharacterData[] = await dataRes.json();
        
        setCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (langId) {
      loadData();
    }
  }, [langId]);

  return { registryEntry, characters, loading, error };
}
