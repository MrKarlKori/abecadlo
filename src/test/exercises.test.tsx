import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ReadingTrainer } from '../components/exercises/ReadingTrainer';
import { TypingTrainer } from '../components/exercises/TypingTrainer';
import { BuildingTrainer } from '../components/exercises/BuildingTrainer';
import { PoetryTrainer } from '../components/exercises/PoetryTrainer';

describe('ReadingTrainer Component', () => {
  it('renders level tabs and reveal answer button', () => {
    render(<ReadingTrainer />);
    
    expect(screen.getByText(/Easy \(Short\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium \(Words\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Hard \(Complex\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reveal/i })).toBeInTheDocument();
  });

  it('reveals pronunciation and Wiktionary link when Reveal button is clicked', () => {
    render(<ReadingTrainer />);
    
    const revealBtn = screen.getByRole('button', { name: /Reveal/i });
    fireEvent.click(revealBtn);

    expect(screen.getByText(/View on Wiktionary/i)).toBeInTheDocument();
  });
});

describe('TypingTrainer Component', () => {
  it('renders level selector and input box', () => {
    render(<TypingTrainer />);

    expect(screen.getByText(/Type the English translation or sound/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type English translation or sound.../i)).toBeInTheDocument();
  });

  it('allows skipping to next word', () => {
    render(<TypingTrainer />);

    const skipBtn = screen.getByText(/Skip/i);
    fireEvent.click(skipBtn);
    expect(screen.getByPlaceholderText(/Type English translation or sound.../i)).toBeInTheDocument();
  });
});

describe('BuildingTrainer Component', () => {
  it('renders level tabs and 3 prompt mode setting buttons', () => {
    render(<BuildingTrainer />);

    expect(screen.getByText(/Mirror Letters/i)).toBeInTheDocument();
    expect(screen.getByText(/English Trans\./i)).toBeInTheDocument();
    expect(screen.getByText(/Russian Trans\./i)).toBeInTheDocument();
  });

  it('switches to Russian Trans. mode and updates prompt label', () => {
    render(<BuildingTrainer />);

    const ruTransBtn = screen.getByText(/Russian Trans\./i);
    fireEvent.click(ruTransBtn);

    expect(screen.getByText(/Build English translation for Russian prompt/i)).toBeInTheDocument();
  });
});

describe('PoetryTrainer Component', () => {
  it('renders nursery rhymes & simple sentences practice component', () => {
    render(
      <MemoryRouter initialEntries={['/ru/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<PoetryTrainer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Read the sentence or poem out loud/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Reveal/i).length).toBeGreaterThan(0);
  });
});
