import { useState, useEffect } from 'react';
import type { LanguageRegistryEntry, CharacterData } from '../types';

export function useLanguageData(langId: string) {
  const [registryEntry, setRegistryEntry] = useState<LanguageRegistryEntry | null>(null);
  const [registry, setRegistry] = useState<LanguageRegistryEntry[]>([]);
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
        
        const registryRes = await fetch(`${baseUrl}/data/registry.json`);
        if (!registryRes.ok) throw new Error('Failed to load registry');
        const registryData: LanguageRegistryEntry[] = await registryRes.json();
        setRegistry(registryData);
        
        const entry = registryData.find(r => r.id === langId);
        if (!entry) throw new Error('Language not found');
        setRegistryEntry(entry);

        const dataPath = entry.dataFile.startsWith('/') ? entry.dataFile : `/${entry.dataFile}`;
        const dataRes = await fetch(`${baseUrl}${dataPath}`);
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

  return { registryEntry, registry, characters, loading, error };
}
