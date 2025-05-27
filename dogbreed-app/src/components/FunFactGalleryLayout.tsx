import React from 'react';
import { FactCard } from './FactCard'; // Import FactCard
import type { FunFact } from '../utils/breedData'; // Import FunFact type

// Mock Fact interface (can be moved to a types file later)
interface Fact {
  id: string;
  text: string;
  imageUrl?: string;
}

// Mock data for 5 fun facts
const mockFacts: Fact[] = [
  { id: 'fact1', text: 'Dogs have amazing noses!', imageUrl: 'https://placehold.co/130x100/A8E6CF/333333?text=Nose' },
  { id: 'fact2', text: 'They wag their tails to talk.', imageUrl: 'https://placehold.co/130x100/FFD3B6/333333?text=Tail' },
  { id: 'fact3', text: 'Puppies sleep a lot.', imageUrl: 'https://placehold.co/130x100/FFAAA5/333333?text=Sleepy' },
  { id: 'fact4', text: 'Dogs love to play fetch!', imageUrl: 'https://placehold.co/130x100/FF8C94/333333?text=Play' },
  { id: 'fact5', text: 'They are very loyal friends.', imageUrl: 'https://placehold.co/130x100/A2D0C1/333333?text=Friend' },
];

interface FunFactGalleryLayoutProps {
  facts: FunFact[];
  userAge: { years: number; months: number } | null;
}

const SIMPLIFIED_TEXT_AGE_THRESHOLD_YEARS = 3;

export function FunFactGalleryLayout({ facts, userAge }: FunFactGalleryLayoutProps): React.ReactElement {
  
  const getFactText = (fact: FunFact): string => {
    if (userAge && userAge.years <= SIMPLIFIED_TEXT_AGE_THRESHOLD_YEARS) {
      return fact.simpleText || fact.text; // Use simple text if available and age is low, else fallback to normal text
    }
    return fact.text; // Default to normal text
  };

  if (!facts || facts.length === 0) {
    return (
      <div style={galleryContainerStyle}>
        <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>Select a breed to see fun facts!</p>
      </div>
    );
  }

  return (
    <div style={galleryContainerStyle}>
      {facts.map((fact) => (
        <FactCard
          key={fact.id}
          fact={{
            ...fact,
            text: getFactText(fact), // Use the potentially simplified text
          }}
          // We could add an onClick here later if facts become interactive
        />
      ))}
    </div>
  );
}

const galleryContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  padding: '20px',
  marginTop: '20px',
  border: '2px dashed var(--secondary-color-light)',
  borderRadius: '15px',
  backgroundColor: 'var(--background-color-extra-light)',
  minHeight: '250px', // Ensure it has some height even when empty
}; 