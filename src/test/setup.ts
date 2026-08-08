import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

const mockRegistry = [
  {
    id: 'be',
    name: 'Belarusian',
    theme: 'soviet-vintage',
    dataFile: '/data/belarusian.json'
  },
  {
    id: 'ru',
    name: 'Russian',
    theme: 'soviet-vintage',
    dataFile: '/data/russian.json'
  },
  {
    id: 'el',
    name: 'Greek',
    theme: 'soviet-vintage',
    dataFile: '/data/greek.json'
  }
];

const mockCharacters = [
  {
    id: 'A',
    character: 'А',
    characterLower: 'а',
    phonetic: 'A',
    soundsLike: 'a as in father',
    example: { native: 'Аптека', translation: 'Pharmacy', transliteration: 'Apteka' }
  },
  {
    id: 'B',
    character: 'Б',
    characterLower: 'б',
    phonetic: 'B',
    soundsLike: 'b as in boy',
    example: { native: 'Бабушка', translation: 'Grandmother', transliteration: 'Babushka' }
  },
  {
    id: 'V',
    character: 'В',
    characterLower: 'в',
    phonetic: 'V',
    soundsLike: 'v as in van',
    example: { native: 'Вода', translation: 'Water', transliteration: 'Voda' }
  },
  {
    id: 'G',
    character: 'Г',
    characterLower: 'г',
    phonetic: 'G',
    soundsLike: 'g as in go',
    example: { native: 'Город', translation: 'City', transliteration: 'Gorod' }
  },
  {
    id: 'D',
    character: 'Д',
    characterLower: 'д',
    phonetic: 'D',
    soundsLike: 'd as in door',
    example: { native: 'Дом', translation: 'House', transliteration: 'Dom' }
  }
];

const mockGreekCharacters = [
  {
    id: 'Alpha',
    character: 'Α',
    characterLower: 'α',
    phonetic: 'A',
    soundsLike: 'a as in father',
    example: { native: 'Αγάπη', translation: 'Love', transliteration: 'Agapi' }
  },
  {
    id: 'Beta',
    character: 'Β',
    characterLower: 'β',
    phonetic: 'V',
    soundsLike: 'v as in van',
    example: { native: 'Βιβλίο', translation: 'Book', transliteration: 'Vivlio' }
  },
  {
    id: 'Gamma',
    character: 'Γ',
    characterLower: 'γ',
    phonetic: 'G/Y',
    soundsLike: 'y as in yes before e/i, soft g otherwise',
    example: { native: 'Γάτα', translation: 'Cat', transliteration: 'Gata' }
  },
  {
    id: 'Delta',
    character: 'Δ',
    characterLower: 'δ',
    phonetic: 'D/TH',
    soundsLike: 'th as in that',
    example: { native: 'Δέντρο', translation: 'Tree', transliteration: 'Dentro' }
  }
];

globalThis.fetch = vi.fn((url: string | URL | Request) => {
  const urlString = url.toString();
  if (urlString.includes('registry.json')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockRegistry),
    } as Response);
  }
  if (urlString.includes('greek.json')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockGreekCharacters),
    } as Response);
  }
  if (urlString.includes('russian.json') || urlString.includes('belarusian.json') || urlString.includes('data/')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockCharacters),
    } as Response);
  }
  return Promise.reject(new Error(`Unhandled fetch url: ${urlString}`));
});

afterEach(() => {
  cleanup();
});
