export interface LetterCombination {
  id: string;
  combination: string;
  parts: string;
  phonetic: string;
  type: 'consonant' | 'vowel';
  examples: {
    native: string;
    translation: string;
    transliteration: string;
  }[];
}

export const GREEK_COMBINATIONS: LetterCombination[] = [
  {
    id: 'mp',
    combination: 'μπ',
    parts: 'μ + π',
    phonetic: 'b',
    type: 'consonant',
    examples: [
      { native: 'μπύρα', translation: 'beer', transliteration: 'bíra' },
      { native: 'μπαμπάς', translation: 'dad', transliteration: 'babás' }
    ]
  },
  {
    id: 'nt',
    combination: 'ντ',
    parts: 'ν + τ',
    phonetic: 'd',
    type: 'consonant',
    examples: [
      { native: 'ντομάτα', translation: 'tomato', transliteration: 'domáta' },
      { native: 'ποντίκι', translation: 'mouse', transliteration: 'podíki' }
    ]
  },
  {
    id: 'gk',
    combination: 'γκ',
    parts: 'γ + κ',
    phonetic: 'g',
    type: 'consonant',
    examples: [
      { native: 'γκολ', translation: 'goal', transliteration: 'gól' }
    ]
  },
  {
    id: 'gg',
    combination: 'γγ',
    parts: 'γ + γ',
    phonetic: 'ng',
    type: 'consonant',
    examples: [
      { native: 'άγγελος', translation: 'angel', transliteration: 'ángelos' }
    ]
  },
  {
    id: 'ts',
    combination: 'τσ',
    parts: 'τ + σ',
    phonetic: 'ts',
    type: 'consonant',
    examples: [
      { native: 'κορίτσι', translation: 'girl', transliteration: 'korítsi' },
      { native: 'τσάντα', translation: 'bag', transliteration: 'tsáda' }
    ]
  },
  {
    id: 'tz',
    combination: 'τζ',
    parts: 'τ + ζ',
    phonetic: 'dz',
    type: 'consonant',
    examples: [
      { native: 'τζατζίκι', translation: 'tzatziki', transliteration: 'tzatzíki' }
    ]
  },
  {
    id: 'ai',
    combination: 'αι',
    parts: 'α + ι',
    phonetic: 'e',
    type: 'vowel',
    examples: [
      { native: 'καί', translation: 'and', transliteration: 'ke' }
    ]
  },
  {
    id: 'ei',
    combination: 'ει',
    parts: 'ε + ι',
    phonetic: 'i',
    type: 'vowel',
    examples: [
      { native: 'είμαι', translation: 'I am', transliteration: 'eímai' }
    ]
  },
  {
    id: 'oi',
    combination: 'οι',
    parts: 'ο + ι',
    phonetic: 'i',
    type: 'vowel',
    examples: [
      { native: 'οικογένεια', translation: 'family', transliteration: 'oikogéneia' }
    ]
  },
  {
    id: 'ou',
    combination: 'ου',
    parts: 'ο + υ',
    phonetic: 'u / oo',
    type: 'vowel',
    examples: [
      { native: 'βούτυρο', translation: 'butter', transliteration: 'voútiro' }
    ]
  },
  {
    id: 'au',
    combination: 'αυ',
    parts: 'α + υ',
    phonetic: 'av / af',
    type: 'vowel',
    examples: [
      { native: 'αυγή', translation: 'dawn', transliteration: 'avgí' },
      { native: 'αυτοκίνητο', translation: 'car', transliteration: 'aftokínito' }
    ]
  },
  {
    id: 'eu',
    combination: 'ευ',
    parts: 'ε + υ',
    phonetic: 'ev / ef',
    type: 'vowel',
    examples: [
      { native: 'ευχαριστώ', translation: 'thank you', transliteration: 'efcharistó' },
      { native: 'Ευρώπη', translation: 'Europe', transliteration: 'Evrópi' }
    ]
  }
];
